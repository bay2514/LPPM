/**
 * In-memory store untuk data mock bersama (public dan admin).
 * Dimuat awal dari mock.js dan mendukung operasi CRUD di admin,
 * serta pembacaan reaktif di public/admin.
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

// Banner & Profil info statis default
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

// Memory store
class MockStore {
  constructor() {
    this.stats = JSON.parse(JSON.stringify(initialStats));
    this.services = JSON.parse(JSON.stringify(initialServices));
    this.news = JSON.parse(JSON.stringify(initialNews));
    this.events = JSON.parse(JSON.stringify(initialEvents));
    this.collaborators = JSON.parse(JSON.stringify(initialCollaborators));
    this.documents = JSON.parse(JSON.stringify(initialDocuments));
    this.capaianKPI = JSON.parse(JSON.stringify(initialKPI));
    this.analytics = JSON.parse(JSON.stringify(initialAnalytics));
    this.latestOutputs = JSON.parse(JSON.stringify(initialOutputs));
    this.banner = JSON.parse(JSON.stringify(initialBanner));
    this.profile = JSON.parse(JSON.stringify(initialProfile));
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }

  // Getters
  getAll(collection) {
    return this[collection] ? JSON.parse(JSON.stringify(this[collection])) : [];
  }

  getById(collection, id) {
    if (!this[collection]) return null;
    const item = this[collection].find((it) => String(it.id) === String(id));
    return item ? JSON.parse(JSON.stringify(item)) : null;
  }

  getSingle(key) {
    return this[key] ? JSON.parse(JSON.stringify(this[key])) : null;
  }

  // Setters / Mutators
  setSingle(key, data) {
    this[key] = { ...this[key], ...data };
    this.notify();
    return JSON.parse(JSON.stringify(this[key]));
  }

  create(collection, data) {
    if (!this[collection]) this[collection] = [];
    const id = data.id || `${collection.slice(0, 2)}-${Date.now()}`;
    const newItem = { ...data, id, createdAt: new Date().toISOString() };
    this[collection].unshift(newItem);
    this.notify();
    return JSON.parse(JSON.stringify(newItem));
  }

  update(collection, id, data) {
    if (!this[collection]) return null;
    const idx = this[collection].findIndex((it) => String(it.id) === String(id));
    if (idx === -1) return null;
    this[collection][idx] = { ...this[collection][idx], ...data, updatedAt: new Date().toISOString() };
    this.notify();
    return JSON.parse(JSON.stringify(this[collection][idx]));
  }

  delete(collection, id) {
    if (!this[collection]) return false;
    const initialLen = this[collection].length;
    this[collection] = this[collection].filter((it) => String(it.id) !== String(id));
    const deleted = this[collection].length < initialLen;
    if (deleted) this.notify();
    return deleted;
  }
}

export const sharedStore = new MockStore();
