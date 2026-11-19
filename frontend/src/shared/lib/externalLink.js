/**
 * Helper untuk validasi dan penanganan tautan eksternal (e-Jurnal OJS).
 */
import { externalLinksConfig } from "@shared/config/externalLinks.js";

/**
 * Memeriksa apakah URL valid (hanya https, tanpa spasi, tidak kosong).
 */
export function isValidExternalUrl(url) {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (trimmed.includes(" ") || !trimmed.startsWith("https://")) {
    return false;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Normalisasi URL: trim, hapus spasi, kembalikan null bila tidak valid.
 */
export function normalizeUrl(url) {
  if (!isValidExternalUrl(url)) return null;
  return url.trim();
}

/**
 * Menentukan target navigasi e-Jurnal berdasarkan mode dan konfigurasi.
 */
export function getEjurnalTarget() {
  const mode = externalLinksConfig?.ejurnal?.mode || "page";
  const mainUrl = normalizeUrl(externalLinksConfig?.ejurnal?.main);

  if (mode === "redirect" && mainUrl) {
    return { type: "external", href: mainUrl };
  }
  return { type: "internal", to: "/layanan/e-jurnal" };
}
