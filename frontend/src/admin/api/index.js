/**
 * Admin CRUD API client menggunakan contentStore (localStorage persisten).
 */

import { contentStore } from "@shared/lib/contentStore.js";

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export async function adminList(collection, { search = "", page = 1, limit = 10, status = "all" } = {}) {
  await delay(100);
  let items = contentStore.getAll(collection);

  if (search) {
    const q = search.toLowerCase();
    items = items.filter((it) => {
      return (
        (it.title && it.title.toLowerCase().includes(q)) ||
        (it.name && it.name.toLowerCase().includes(q)) ||
        (it.label && it.label.toLowerCase().includes(q)) ||
        (it.description && it.description.toLowerCase().includes(q))
      );
    });
  }

  if (status && status !== "all") {
    items = items.filter((it) => it.status === status);
  }

  const total = items.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const offset = (page - 1) * limit;
  const paginated = items.slice(offset, offset + limit);

  return {
    data: paginated,
    meta: {
      currentPage: page,
      lastPage: totalPages,
      perPage: limit,
      total,
    },
  };
}

export async function adminGet(collection, id) {
  await delay(100);
  const item = contentStore.getById(collection, id);
  if (!item) {
    const error = new Error("Data tidak ditemukan");
    error.status = 404;
    throw error;
  }
  return { data: item };
}

export async function adminCreate(collection, data) {
  await delay(200);
  if (!data || Object.keys(data).length === 0) {
    const error = new Error("Data tidak boleh kosong");
    error.status = 422;
    error.errors = { title: ["Field wajib diisi"] };
    throw error;
  }
  const created = contentStore.create(collection, data);
  return { data: created, message: "Data berhasil ditambahkan" };
}

export async function adminUpdate(collection, id, data) {
  await delay(200);
  const updated = contentStore.update(collection, id, data);
  if (!updated) {
    const error = new Error("Gagal memperbarui: Data tidak ditemukan");
    error.status = 404;
    throw error;
  }
  return { data: updated, message: "Data berhasil diperbarui" };
}

export async function adminDelete(collection, id) {
  await delay(150);
  const success = contentStore.delete(collection, id);
  if (!success) {
    const error = new Error("Gagal menghapus: Data tidak ditemukan");
    error.status = 404;
    throw error;
  }
  return { success: true, message: "Data berhasil dihapus" };
}

export async function adminGetSingle(key) {
  await delay(100);
  return { data: contentStore.getSingle(key) };
}

export async function adminUpdateSingle(key, data) {
  await delay(200);
  const updated = contentStore.setSingle(key, data);
  return { data: updated, message: "Pengaturan berhasil disimpan" };
}

export async function adminUpload(file) {
  await delay(300);
  if (!file) {
    throw new Error("File tidak ditemukan");
  }
  const mockUrl = URL.createObjectURL(file);
  return {
    data: {
      url: mockUrl,
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(1)} KB`,
      mimeType: file.type,
    },
    message: "File berhasil diunggah",
  };
}

export async function adminResetStore() {
  contentStore.reset();
  return { success: true, message: "Data berhasil diatur ulang ke contoh awal" };
}
