/**
 * Konfigurasi slot foto terpusat.
 * Setiap slot mendefinisikan jalur file relatif ke public/, rasio, dan dimensi ideal.
 */

export const imageSlots = {
  heroBeranda: {
    src: "/images/hero-beranda.webp",
    alt: "Hero beranda",
    ratio: "16/9",
    width: 1600,
    height: 900,
  },
  profilLembaga: {
    src: "/images/profil-lembaga.webp",
    alt: "Profil lembaga",
    ratio: "4/3",
    width: 1200,
    height: 900,
  },
  bannerHalaman: {
    src: "/images/banner-halaman.webp",
    alt: "Banner halaman",
    ratio: "4/1",
    width: 1600,
    height: 400,
    optional: true,
  },
  galeri01: { src: "/images/galeri-01.webp", alt: "Galeri 1", ratio: "4/3", width: 800, height: 600, optional: true },
  galeri02: { src: "/images/galeri-02.webp", alt: "Galeri 2", ratio: "4/3", width: 800, height: 600, optional: true },
  galeri03: { src: "/images/galeri-03.webp", alt: "Galeri 3", ratio: "4/3", width: 800, height: 600, optional: true },
  galeri04: { src: "/images/galeri-04.webp", alt: "Galeri 4", ratio: "4/3", width: 800, height: 600, optional: true },
  galeri05: { src: "/images/galeri-05.webp", alt: "Galeri 5", ratio: "4/3", width: 800, height: 600, optional: true },
  galeri06: { src: "/images/galeri-06.webp", alt: "Galeri 6", ratio: "4/3", width: 800, height: 600, optional: true },
  ogImage: {
    src: "/images/og-image.png",
    alt: "OG Image",
    ratio: "120/63",
    width: 1200,
    height: 630,
  },
};

export function getSlot(key) {
  return imageSlots[key] || null;
}
