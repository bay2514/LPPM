import { useState, useEffect } from "react";
import { sharedStore } from "@shared/lib/store.js";

/**
 * Hook untuk mengambil data publik dari sharedStore secara reaktif.
 * Data akan otomatis terbarui saat admin melakukan CRUD.
 */
export function usePublicData(collection) {
  const [data, setData] = useState(() => sharedStore.getAll(collection));

  useEffect(() => {
    const listener = () => {
      setData(sharedStore.getAll(collection));
    };
    listener(); // sync awal
    const unsubscribe = sharedStore.subscribe(listener);
    return unsubscribe;
  }, [collection]);

  return data;
}

export function usePublicSingle(key) {
  const [data, setData] = useState(() => sharedStore.getSingle(key));

  useEffect(() => {
    const listener = () => {
      setData(sharedStore.getSingle(key));
    };
    listener();
    const unsubscribe = sharedStore.subscribe(listener);
    return unsubscribe;
  }, [key]);

  return data;
}
