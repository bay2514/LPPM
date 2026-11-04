import { useSyncExternalStore } from "react";
import { contentStore } from "@shared/lib/contentStore.js";

/**
 * Hook yang menyediakan data publik secara reaktif menggunakan useSyncExternalStore.
 * Otomatis subscribe/unsubscribe saat komponen mount/unmount.
 * Hanya menampilkan item berstatus terbit dan jadwal yang sudah lewat (waktu sekarang >= publishAt).
 * 
 * @param {string} collection - Nama collection (news, events, documents, collaborators, services, stats, dll)
 */
export function useContent(collection) {
  const snapshot = useSyncExternalStore(
    (onStoreChange) => contentStore.subscribe(onStoreChange),
    () => contentStore.getSnapshot(),
    () => contentStore.getSnapshot()
  );

  const all = snapshot[collection] || [];
  const now = new Date();

  return all.filter((item) => {
    // Cek jika status draf maka jangan tampilkan di publik
    if (item.status === "draf" || item.status === "draft" || item.status === "inactive") {
      return false;
    }

    // Jika item dijadwalkan, periksa apakah waktu publishAt sudah lewat
    if (item.status === "dijadwalkan" || item.status === "scheduled") {
      if (!item.publishAt) return false;
      return new Date(item.publishAt) <= now;
    }

    // Jika status terbit / published / active
    const isPublished = item.status === "terbit" || item.status === "published" || item.status === "active";
    if (!isPublished) return false;

    // Jika ada tanggal publikasi di masa depan, jangan tampilkan dulu
    if (item.publishAt && new Date(item.publishAt) > now) {
      return false;
    }

    return true;
  });
}

/**
 * Hook untuk data single (banner, profile, stats).
 */
export function useContentSingle(key) {
  const snapshot = useSyncExternalStore(
    (onStoreChange) => contentStore.subscribe(onStoreChange),
    () => contentStore.getSnapshot(),
    () => contentStore.getSnapshot()
  );

  return snapshot[key] || null;
}
