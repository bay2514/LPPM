/**
 * Public Read-Only API client.
 * Membaca data terkini dari contentStore (persisten, reaktif).
 */

import { contentStore } from "@shared/lib/contentStore.js";

export async function getDocuments({ q, category, year } = {}) {
  let result = contentStore.getAll("documents");
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
  const docs = contentStore.getAll("documents");
  const doc = docs.find((d) => d.slug === slug || String(d.id) === String(slug));
  return { data: doc || null };
}

export async function getNews() {
  return { data: contentStore.getAll("news") };
}

export async function getEvents() {
  return { data: contentStore.getAll("events") };
}

export async function getServices() {
  return { data: contentStore.getAll("services") };
}

export async function getStats() {
  return {
    data: {
      stats: contentStore.getAll("stats"),
      kpis: contentStore.getAll("capaianKPI"),
      outputs: contentStore.getAll("latestOutputs"),
      analytics: contentStore.getSingle("analytics"),
    },
  };
}

export async function getCollaborators() {
  return { data: contentStore.getAll("collaborators") };
}

export async function getBanner() {
  return { data: contentStore.getSingle("banner") };
}

export async function getProfile() {
  return { data: contentStore.getSingle("profile") };
}

export async function submitProposal(body) {
  await new Promise((r) => setTimeout(r, 600));
  return { data: { id: `sub-${Date.now()}`, status: "received", body } };
}
