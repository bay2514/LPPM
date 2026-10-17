/**
 * Admin CRUD API client.
 * Menyediakan operasi list, get, create, update, delete, upload
 * yang memutasi shared store in-memory.
 */

import { sharedStore } from "@shared/lib/store.js";

// Simulasi network latency
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export async function adminList(collection, { search = "", page = 1, limit = 10, status = "all" } = {}) {
  await delay(200);
  let items = sharedStore.getAll(collection);

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
  await delay(150);
  const item = sharedStore.getById(collection, id);
  if (!item) {
    const error = new Error("Data tidak ditemukan");
    error.status = 404;
    throw error;
  }
  return { data: item };
}

export async function adminCreate(collection, data) {
  await delay(300);
  // Validasi sederhana
  if (!data || Object.keys(data).length === 0) {
    const error = new Error("Data tidak boleh kosong");
    error.status = 422;
    error.errors = { title: ["Field wajib diisi"] };
    throw error;
  }
  const created = sharedStore.create(collection, data);
  return { data: created, message: "Data berhasil ditambahkan" };
}

export async function adminUpdate(collection, id, data) {
  await delay(300);
  const updated = sharedStore.update(collection, id, data);
  if (!updated) {
    const error = new Error("Gagal memperbarui: Data tidak ditemukan");
    error.status = 404;
    throw error;
  }
  return { data: updated, message: "Data berhasil diperbarui" };
}

export async function adminDelete(collection, id) {
  await delay(250);
  const success = sharedStore.delete(collection, id);
  if (!success) {
    const error = new Error("Gagal menghapus: Data tidak ditemukan");
    error.status = 404;
    throw error;
  }
  return { success: true, message: "Data berhasil dihapus" };
}

export async function adminGetSingle(key) {
  await delay(150);
  return { data: sharedStore.getSingle(key) };
}

export async function adminUpdateSingle(key, data) {
  await delay(300);
  const updated = sharedStore.setSingle(key, data);
  return { data: updated, message: "Pengaturan berhasil disimpan" };
}

export async function adminUpload(file) {
  await delay(500);
  // Validasi tipe & ukuran file di sisi mock (Max 2MB, hanya jpg, png, pdf)
  if (!file) {
    throw new Error("File tidak ditemukan");
  }
  if (file.size > 2 * 1024 * 1024) {
    const err = new Error("Ukuran file melebihi batas 2MB");
    err.status = 422;
    err.errors = { file: ["Ukuran file tidak boleh lebih dari 2MB"] };
    throw err;
  }
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
  if (!allowedTypes.includes(file.type)) {
    const err = new Error("Format file tidak didukung");
    err.status = 422;
    err.errors = { file: ["Format file harus JPG, PNG, WEBP, atau PDF"] };
    throw err;
  }

  // Buat URL pratinjau / mock URL
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
