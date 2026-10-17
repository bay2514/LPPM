/**
 * HTTP client wrapper menggunakan fetch + axios untuk error handling konsisten.
 * Saat ini mode MOCK (tidak memanggil backend) dan melempar ke mock data.
 * Untuk live, ubah import dari data/mock ke endpoint nyata.
 */

import { documents, stats, capaianKPI, latestOutputs } from "../data/mock.js";

export async function getDocuments({ q, category, year } = {}) {
  let result = [...documents];
  if (q) {
    const qq = q.toLowerCase();
    result = result.filter(
      (d) => d.title.toLowerCase().includes(qq) || d.description.toLowerCase().includes(qq)
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

export async function getStats() {
  return {
    data: { kpis: capaianKPI, outputs: latestOutputs },
  };
}

export async function submitProposal(body) {
  // Simulate latency
  await new Promise((r) => setTimeout(r, 700));
  return { data: { id: `sub-${Date.now()}`, status: "received" } };
}
