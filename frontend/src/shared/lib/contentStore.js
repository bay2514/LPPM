/**
 * Content Store Persisten dengan Versioning & Audit Log (localStorage)
 * Satu sumber kebenaran untuk Admin dan Publik.
 * Mendukung persistensi, ID unik, versioning (20 revisi), audit log, dan sinkronisasi.
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

const STORAGE_KEY = "lppm_content_v1";
const VERSION_HISTORY_KEY = "lppm_versions_v1";
const AUDIT_LOG_KEY = "lppm_audit_logs_v1";

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

export const INITIAL_DATA = (() => {
  const data = {
    stats: JSON.parse(JSON.stringify(initialStats)),
    services: JSON.parse(JSON.stringify(initialServices)),
    news: JSON.parse(JSON.stringify(initialNews)),
    events: JSON.parse(JSON.stringify(initialEvents)),
    collaborators: JSON.parse(JSON.stringify(initialCollaborators)),
    documents: JSON.parse(JSON.stringify(initialDocuments)),
    capaianKPI: JSON.parse(JSON.stringify(initialKPI)),
    analytics: JSON.parse(JSON.stringify(initialAnalytics)),
    latestOutputs: JSON.parse(JSON.stringify(initialOutputs)),
    banner: JSON.parse(JSON.stringify(initialBanner)),
    profile: JSON.parse(JSON.stringify(initialProfile)),
  };

  const now = new Date().toISOString();

  // Normalisasi data berita awal
  data.news.forEach((it, idx) => {
    if (!it.id) it.id = `news-${idx + 1}`;
    it.status = "terbit";
    it.createdAt = it.createdAt || now;
    it.updatedAt = it.updatedAt || now;
    it.publishAt = it.publishAt || (it.date ? new Date(it.date).toISOString() : now);
    it.order = idx;
  });

  // Normalisasi data mitra awal
  data.collaborators.forEach((it, idx) => {
    if (!it.id) it.id = `collab-${idx + 1}`;
    it.status = "terbit";
    it.category = it.category || it.label || "Mitra Riset";
    it.createdAt = it.createdAt || now;
    it.updatedAt = it.updatedAt || now;
    it.publishAt = it.publishAt || now;
    it.order = idx;
  });

  // Normalisasi data dokumen awal
  data.documents.forEach((it, idx) => {
    if (!it.id) it.id = `doc-${idx + 1}`;
    it.status = "terbit";
    it.createdAt = it.createdAt || now;
    it.updatedAt = it.updatedAt || now;
    it.publishAt = it.publishAt || now;
    it.order = idx;
    if (!it.slug) {
      it.slug = it.title ? it.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") : `doc-${idx}`;
    }
  });

  // Normalisasi data kegiatan awal
  data.events.forEach((it, idx) => {
    if (!it.id) it.id = `event-${idx + 1}`;
    it.status = "terbit";
    it.createdAt = it.createdAt || now;
    it.updatedAt = it.updatedAt || now;
    it.publishAt = it.publishAt || now;
    it.order = idx;
  });

  return data;
})();

class ContentStore {
  constructor() {
    this.data = this._load();
    this.versionHistory = this._loadVersions();
    this.auditLogs = this._loadLogs();
    this.listeners = new Set();

    // Sinkronisasi antar tab browser
    if (typeof window !== "undefined") {
      window.addEventListener("storage", (e) => {
        if (e.key === STORAGE_KEY || e.key === VERSION_HISTORY_KEY || e.key === AUDIT_LOG_KEY) {
          this.data = this._load();
          this.versionHistory = this._loadVersions();
          this.auditLogs = this._loadLogs();
          this.notify();
        }
      });
    }
  }

  _load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && parsed.news) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Gagal membaca contentStore dari localStorage, fallback ke seed data:", e);
    }
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Gagal menyimpan contentStore ke localStorage:", e);
    }
  }

  _loadVersions() {
    try {
      const saved = localStorage.getItem(VERSION_HISTORY_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Gagal membaca version history:", e);
    }
    return {};
  }

  _saveVersions() {
    try {
      localStorage.setItem(VERSION_HISTORY_KEY, JSON.stringify(this.versionHistory));
    } catch (e) {
      console.error("Gagal menyimpan version history:", e);
    }
  }

  _loadLogs() {
    try {
      const saved = localStorage.getItem(AUDIT_LOG_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Gagal membaca audit log:", e);
    }
    return [];
  }

  _saveLogs() {
    try {
      localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(this.auditLogs));
    } catch (e) {
      console.error("Gagal menyimpan audit log:", e);
    }
  }

  _addLog(action, collection, id, summary) {
    const entry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      user: "Administrator",
      action,
      collection,
      itemId: id,
      summary,
    };
    this.auditLogs = [entry, ...this.auditLogs.slice(0, 99)];
    this._saveLogs();
  }

  _pushVersion(collection, id, itemData) {
    if (!id) return;
    const key = `${collection}:${id}`;
    const currentList = this.versionHistory[key] || [];
    const newVersion = {
      versionId: `v-${Date.now()}`,
      timestamp: new Date().toISOString(),
      data: JSON.parse(JSON.stringify(itemData)),
    };
    this.versionHistory = {
      ...this.versionHistory,
      [key]: [newVersion, ...currentList.slice(0, 19)], // Simpan maks 20 versi terakhir
    };
    this._saveVersions();
  }

  // API Eksternal
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

  list(collection) {
    return this.data[collection] || [];
  }

  // Alias getAll untuk kompatibilitas
  getAll(collection) {
    return this.list(collection);
  }

  get(collection, id) {
    return this.list(collection).find((it) => String(it.id) === String(id)) || null;
  }

  // Alias getById untuk kompatibilitas
  getById(collection, id) {
    return this.get(collection, id);
  }

  getSingle(key) {
    return this.data[key] || null;
  }

  setSingle(key, value) {
    const prev = this.data[key] || {};
    this._pushVersion(key, "singleton", prev);
    this.data = {
      ...this.data,
      [key]: { ...prev, ...value },
    };
    this._save();
    this._addLog("UPDATE", key, "singleton", `Memperbarui pengaturan '${key}'`);
    this.notify();
    return this.data[key];
  }

  create(collection, item) {
    const currentList = this.list(collection);
    const now = new Date().toISOString();
    const id = item.id || `${collection}-${Date.now()}`;
    const status = item.status || "draf";
    const publishAt = item.publishAt || (status === "terbit" ? now : null);

    const newItem = {
      ...item,
      id,
      status,
      publishAt,
      createdAt: now,
      updatedAt: now,
      order: currentList.length,
    };

    this.data = {
      ...this.data,
      [collection]: [newItem, ...currentList],
    };

    this._pushVersion(collection, id, newItem);
    this._save();
    this._addLog("CREATE", collection, id, `Menambahkan item baru '${newItem.title || newItem.name || id}'`);
    this.notify();
    return newItem;
  }

  update(collection, id, updates) {
    const currentList = this.list(collection);
    const idx = currentList.findIndex((it) => String(it.id) === String(id));
    if (idx === -1) return null;

    const oldItem = currentList[idx];
    this._pushVersion(collection, id, oldItem);

    const now = new Date().toISOString();
    let status = updates.status !== undefined ? updates.status : oldItem.status;
    let publishAt = updates.publishAt !== undefined ? updates.publishAt : oldItem.publishAt;
    if (status === "terbit" && !publishAt) {
      publishAt = now;
    }

    const updatedItem = {
      ...oldItem,
      ...updates,
      status,
      publishAt,
      updatedAt: now,
    };

    const nextList = [...currentList];
    nextList[idx] = updatedItem;

    this.data = {
      ...this.data,
      [collection]: nextList,
    };

    this._save();
    this._addLog("UPDATE", collection, id, `Memperbarui item '${updatedItem.title || updatedItem.name || id}'`);
    this.notify();
    return updatedItem;
  }

  remove(collection, id) {
    const currentList = this.list(collection);
    const itemToDelete = currentList.find((it) => String(it.id) === String(id));
    if (!itemToDelete) return false;

    this.data = {
      ...this.data,
      [collection]: currentList.filter((it) => String(it.id) !== String(id)),
    };

    this._save();
    this._addLog("DELETE", collection, id, `Menghapus item '${itemToDelete.title || itemToDelete.name || id}'`);
    this.notify();
    return true;
  }

  // Alias delete untuk kompatibilitas
  delete(collection, id) {
    return this.remove(collection, id);
  }

  duplicate(collection, id) {
    const item = this.get(collection, id);
    if (!item) return null;

    const copyTitle = item.title ? `${item.title} (Salinan)` : undefined;
    const copyName = item.name ? `${item.name} (Salinan)` : undefined;

    const newItem = {
      ...item,
      id: `${collection}-${Date.now()}`,
      title: copyTitle,
      name: copyName,
      status: "draf", // Salinan otomatis berstatus draf
    };

    return this.create(collection, newItem);
  }

  reorder(collection, newOrderList) {
    // newOrderList bisa berupa array item utuh atau array id
    let nextList;
    if (newOrderList.length > 0 && typeof newOrderList[0] === "object") {
      nextList = newOrderList.map((item, idx) => ({ ...item, order: idx }));
    } else {
      const map = new Map(this.list(collection).map((it) => [String(it.id), it]));
      nextList = newOrderList.map((id, idx) => {
        const it = map.get(String(id));
        return { ...it, order: idx };
      });
    }

    this.data = {
      ...this.data,
      [collection]: nextList,
    };

    this._save();
    this._addLog("REORDER", collection, "all", `Mengatur ulang urutan item ${collection}`);
    this.notify();
  }

  // Riwayat Versi
  getVersions(collection, id) {
    const key = `${collection}:${id}`;
    return this.versionHistory[key] || [];
  }

  rollback(collection, id, versionIndex) {
    const versions = this.getVersions(collection, id);
    const target = versions[versionIndex];
    if (!target) return null;

    const currentList = this.list(collection);
    const idx = currentList.findIndex((it) => String(it.id) === String(id));
    if (idx === -1) return null;

    // Simpan keadaan saat ini sebelum rollback
    this._pushVersion(collection, id, currentList[idx]);

    const restored = {
      ...target.data,
      id: currentList[idx].id, // pastikan id tetap konsisten
      updatedAt: new Date().toISOString(),
    };

    const nextList = [...currentList];
    nextList[idx] = restored;

    this.data = {
      ...this.data,
      [collection]: nextList,
    };

    this._save();
    this._addLog(
      "ROLLBACK",
      collection,
      id,
      `Mengembalikan versi item '${restored.title || restored.name || id}' ke revisi ${target.timestamp}`
    );
    this.notify();
    return restored;
  }

  getAuditLogs() {
    return this.auditLogs;
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
    this.versionHistory = {};
    this.auditLogs = [];
    this._save();
    this._saveVersions();
    this._saveLogs();
    this.notify();
  }
}

export const contentStore = new ContentStore();
