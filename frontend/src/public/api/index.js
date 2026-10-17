/**
 * Public Read-Only API client.
 * Membaca data terkini dari shared in-memory store.
 * Siap dialihkan ke endpoint Laravel publik (GET /api/...).
 */

import { sharedStore } from "@shared/lib/store.js";

export async function getDocuments({ q, category, year } = {}) {
  let result = sharedStore.getAll("documents");
  if (q) {
    const qq = q.toLowerCase();
    result = result.filter(
      (d) => d.title.toLowerCase().includes(qq) || (d.description && d.description.toLowerCase().includes(qq))
    );
  }
  if (category && category !== "Semua") {
    result = result.filter((d) => d.category === category);
  }
  if (year && year !== "Semua Tahun") {
    result = result.filter((d) => String(d.year) === year);
  }
  return { data: result, meta: { total: result.length } };
}

export async function getDocumentBySlug(slug) {
  const docs = sharedStore.getAll("documents");
  const doc = docs.find((d) => d.slug === slug);
  return { data: doc || null };
}

export async function getNews() {
  return { data: sharedStore.getAll("news") };
}

export async function getEvents() {
  return { data: sharedStore.getAll("events") };
}

export async function getServices() {
  return { data: sharedStore.getAll("services") };
}

export async function getStats() {
  return {
    data: {
      stats: sharedStore.getAll("stats"),
      kpis: sharedStore.getAll("capaianKPI"),
      outputs: sharedStore.getAll("latestOutputs"),
      analytics: sharedStore.getSingle("analytics"),
    },
  };
}

export async function getCollaborators() {
  return { data: sharedStore.getAll("collaborators") };
}

export async function getBanner() {
  return { data: sharedStore.getSingle("banner") };
}

export async function getProfile() {
  return { data: sharedStore.getSingle("profile") };
}

export async function submitProposal(body) {
  await new Promise((r) => setTimeout(r, 600));
  return { data: { id: `sub-${Date.now()}`, status: "received", body } };
}
