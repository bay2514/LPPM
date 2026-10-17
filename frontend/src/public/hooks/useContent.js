import { useEffect, useSyncExternalStore } from "react";
import { contentStore } from "@shared/lib/contentStore.js";

/**
 * Hook yang menyediakan data publik secara reaktif menggunakan useSyncExternalStore.
 * Otomatis subscribe/unsubscribe saat komponen mount/unmount.
 * @param {string} collection - Nama collection (news, events, documents, collaborators, services, stats, dll)
 */
export function useContent(collection) {
  const snapshot = useSyncExternalStore(
    (onStoreChange) => contentStore.subscribe(onStoreChange),
    () => contentStore.getSnapshot()
  );

  // Return data yang sudah di-filter jika perlu (misal: status=published)
  if (collection === "news" || collection === "events") {
    const all = snapshot[collection] || [];
    return all.filter((item) => item.status === "published" || item.status === "terbit");
  }
  
  if (collection === "documents") {
    const all = snapshot.documents || [];
    return all.filter((item) => item.status === "published" || item.status === "terbit");
  }

  if (collection === "collaborators") {
    const all = snapshot.collaborators || [];
    return all.filter((item) => item.status === "active" || item.status === "published");
  }

  return snapshot[collection] || [];
}

/**
 * Hook untuk data single (banner, profile).
 */
export function useContentSingle(key) {
  const snapshot = useSyncExternalStore(
    (onStoreChange) => contentStore.subscribe(onStoreChange),
    () => contentStore.getSnapshot()
  );

  return snapshot[key] || null;
}
