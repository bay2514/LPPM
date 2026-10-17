/**
 * Content Store Persisten (localStorage)
 * Satu sumber kebenaran untuk Admin dan Publik.
 * Mendukung persistensi, ID unik, dan sinkronisasi antar tab/komponen.
 */

import {
  stats as initialStats,
  services as initialServices,
  news as initialNews,
  events as initialEvents,
  collaborators as initialCollaborators,
  documents as initialDocuments,
  capaianKPI as initialKPI,
  analytics as initialAnalytics,
  latestOutputs as initialOutputs,
} from "./mock.js";

const STORAGE_KEY = "lppm_content_store_v1";

const initialBanner = {
  title: "Lembaga Penelitian dan Pengabdian kepada Masyarakat",
  subtitle: "Mendorong Ekosistem Riset Terapan, Inovasi Berdampak, dan Pengabdian Berkelanjutan",
  announcementText: "Penerimaan Proposal Penelitian & Pengabdian Periode 2025/2026 telah dibuka",
  announcementLink: "/pengajuan",
  actionText: "Panduan Pengajuan",
  actionLink: "/dokumen",
};

const initialProfile = {
  name: "LPPM Universitas Tiga Serangkai",
  address: "Jl. Dr. Supomo No. 23, Solo, Jawa Tengah 57141",
  email: "lppm@tsu.ac.id",
  phone: "+62 271 714342",
  operatingHours: "Senin - Jumat: 08.00 - 16.00 WIB",
  vision: "Menjadi lembaga riset dan pengabdian yang unggul, adaptif, dan berdaya saing global berbasis nilai kejuangan pada tahun 2030.",
  mission: "1. Memfasilitasi riset inovatif dan solutif bagi kemaslahatan masyarakat.\n2. Mendorong hilirisasi produk riset dan perolehan HKI berkelas dunia.\n3. Memperluas jejaring kemitraan strategis dengan dunia usaha dan industri.",
};

const INITIAL_DATA = (() => {
  const data = JSON.parse(JSON.stringify({
    stats: initialStats,
    services: initialServices,
    news: initialNews,
    events: initialEvents,
    collaborators: initialCollaborators,
    documents: initialDocuments,
    capaianKPI: initialKPI,
    analytics: initialAnalytics,
    latestOutputs: initialOutputs,
    banner: initialBanner,
    profile: initialProfile,
  }));
  // Normalisasi status agar item awal tetap tampil di publik
  data.news.forEach((it) => { if (!it.status) it.status = "published"; });
  data.events.forEach((it) => { if (!it.status) it.status = "published"; });
  data.documents.forEach((it) => { if (!it.status) it.status = "published"; if (!it.slug) it.slug = it.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""); });
  data.collaborators.forEach((it) => { if (!it.status) it.status = "active"; });
  return data;
})();

class ContentStore {
  constructor() {
    this.data = this._load();
    this.listeners = new Set();
    
    // Sinkronisasi antar tab
    if (typeof window !== "undefined") {
      window.addEventListener("storage", (e) => {
        if (e.key === STORAGE_KEY) {
          this.data = this._load();
          this.notify();
        }
      });
    }
  }

  _load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Gagal memuat contentStore:", e);
    }
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Gagal menyimpan contentStore:", e);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((l) => l());
  }

  getSnapshot() {
    return this.data;
  }

  // Operasi CRUD
  getAll(collection) {
    return this.data[collection] || [];
  }

  getById(collection, id) {
    return this.getAll(collection).find((it) => String(it.id) === String(id)) || null;
  }

  getSingle(key) {
    return this.data[key] || null;
  }

  setSingle(key, value) {
    this.data[key] = { ...this.data[key], ...value };
    this._save();
    this.notify();
    return this.data[key];
  }

  create(collection, item) {
    if (!this.data[collection]) this.data[collection] = [];
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
      status: item.status || "draft",
      createdAt: new Date().toISOString(),
    };
    this.data[collection].unshift(newItem);
    this._save();
    this.notify();
    return newItem;
  }

  update(collection, id, updates) {
    const items = this.getAll(collection);
    const idx = items.findIndex((it) => String(it.id) === String(id));
    if (idx === -1) return null;
    
    this.data[collection][idx] = {
      ...this.data[collection][idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this._save();
    this.notify();
    return this.data[collection][idx];
  }

  delete(collection, id) {
    const items = this.getAll(collection);
    const filtered = items.filter((it) => String(it.id) !== String(id));
    if (filtered.length === items.length) return false;
    
    this.data[collection] = filtered;
    this._save();
    this.notify();
    return true;
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
    this._save();
    this.notify();
  }
}

export const contentStore = new ContentStore();
