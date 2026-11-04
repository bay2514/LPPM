/**
 * Hook untuk Admin Panel yang menyediakan data lengkap (termasuk draf & jadwal)
 * serta helper CRUD untuk manajemen konten.
 */

import { useCallback, useSyncExternalStore } from "react";
import { contentStore } from "@shared/lib/contentStore.js";

export function useAdminContent(collection) {
  const snapshot = useSyncExternalStore(
    (onStoreChange) => contentStore.subscribe(onStoreChange),
    () => contentStore.getSnapshot()
  );

  const items = snapshot[collection] || [];

  const createItem = useCallback(
    (data) => contentStore.create(collection, data),
    [collection]
  );

  const updateItem = useCallback(
    (id, data) => contentStore.update(collection, id, data),
    [collection]
  );

  const deleteItem = useCallback(
    (id) => contentStore.remove(collection, id),
    [collection]
  );

  const duplicateItem = useCallback(
    (id) => contentStore.duplicate(collection, id),
    [collection]
  );

  const reorderItems = useCallback(
    (newOrder) => contentStore.reorder(collection, newOrder),
    [collection]
  );

  const getVersions = useCallback(
    (id) => contentStore.getVersions(collection, id),
    [collection]
  );

  const rollbackVersion = useCallback(
    (id, versionIndex) => contentStore.rollback(collection, id, versionIndex),
    [collection]
  );

  return {
    items,
    createItem,
    updateItem,
    deleteItem,
    duplicateItem,
    reorderItems,
    getVersions,
    rollbackVersion,
  };
}
