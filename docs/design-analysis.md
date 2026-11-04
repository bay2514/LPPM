# Analisis Desain — LPPM Universitas Tiga Serangkai

Sumber: `lppm-tsu-assets.zip` (satu-satunya zip di repo), diekstrak ke
`docs/design-src/lppm-tsu-assets/` (di-ignore lewat `.git/info/exclude`).

19 file PNG, **15 unik** (4 duplikat byte-identik):

| Duplikat | Kembar |
|---|---|
| `image-5.png` | `attachment-2.png` |
| `image-6.png` | `dropdown.png` |
| `kegiatan-4.png` | `kegiatan-3.png` |

---

## 1. Daftar gambar per halaman

| File | Ukuran | Jenis | Isi |
|---|---|---|---|
| `image-7.png` | 298×552 | Halaman penuh (landing) | **Beranda** — hero + Quick Access, 6 stat, 6 kartu layanan, berita, agenda, kolaborasi |
| `image.png` | 429×541 | Halaman penuh (landing) | **Beranda varian** (mock "Universitas Tanjungpura") — struktur hampir sama |
| `attachment-2.png` | 582×619 | Halaman penuh | **Dashboard Capaian** — hero, 6 KPI card, 4 kartu luaran terbaru, footer |
| `image-4.png` | 588×681 | Halaman penuh | **Pusat Unduhan** — navbar, hero, search + filter, grid 4 kartu dokumen, footer |
| `image-9.png` | 1339×631 | Section (dark) | Hero analitik **"PULSE LPPM"** — split text + kartu chart batang |
| `image-1.png` | 258×202 | Komponen | Navbar + dropdown `LAYANAN ⌄` → Penelitian / Pengabdian / Kerjasama |
| `dropdown.png` | 256×200 | Komponen | Sama dengan di atas (crop lebih rapat) |
| `attachment-1.png` | 1372×45 | Komponen | Top utility bar navy: lokasi · email · `Login Admin` |
| `image-2.png` | 662×169 | Komponen | Footer navy 3 kolom + copyright |
| `image-3.png` | 256×65 | Komponen | Footer varian lain (mock "UPN / Perpustakaan") — **tidak dipakai** |
| `image-8.png` | 1440×720 | Aset | Logo LPPM TSU (navy + emas + teal) |
| `kegiatan-1.png` | 363×832 | Referensi | Screenshot Google Form pendaftaran → acuan jenis field form |
| `kegiatan-2.png` | 1918×792 | Referensi | Screenshot Google Drive (arsip sertifikat) |
| `kegiatan-5.png` | 1917×880 | Referensi | Screenshot Google Drive |
| `kegiatan-6.png` | 1918×774 | Referensi | Screenshot Google Drive |
| `kegiatan-3.png` | 1914×880 | Referensi | Screenshot Google Drive |

> **Catatan penting:** `kegiatan-2/3/5/6` dan `kegiatan-1` **bukan desain web** —
> itu screenshot Google Drive & Google Forms. Fungsinya hanya referensi
> struktural (pola listing dokumen, jenis field form), bukan acuan visual.

---

## 2. Halaman yang diimplementasikan

Mock di zip **tidak konsisten** (ada 3 varian beranda dan 2 varian footer, dan
sebagian menyebut "Universitas Tanjungpura"/"UPN"). Yang dipakai adalah set
paling konsisten dengan nama repo + logo `image-8.png` → **LPPM TSU**.

| Rute | Halaman | Acuan gambar |
|---|---|---|
| `/` | Beranda | `image-7.png` (struktur), `image.png` (detail kartu) |
| `/dokumen` | Pusat Unduhan | `image-4.png` |
| `/dokumen/:slug` | Detail Dokumen | `image-4.png` (kartu) + pola Drive `kegiatan-2` |
| `/capaian` | Dashboard Capaian | `attachment-2.png`, `image-9.png` (section analitik) |
| `/pengajuan` | Form Pengajuan | `kegiatan-1.png` (jenis field) |
| `*` | 404 | — |

Halaman "Profil / Penelitian / Pengabdian / Luaran / Kegiatan" hanya jadi item
navigasi (belum ada desainnya) → diarahkan ke Beranda dengan penanda, dan
dicatat di bagian Pertanyaan.

---

## 3. Struktur section per halaman

### Beranda (`/`) — `image-7.png`
1. **Top utility bar** (navy, 1 baris): `● Surakarta, Indonesia` · `✉ lppm@tsu.ac.id` · `Login Admin`
2. **Navbar** (putih, sticky): logo + `LPPM` / `UNIVERSITAS TIGA SERANGKAI`, menu horizontal, tombol `Login Admin`
3. **Hero** (navy): eyebrow orange `LPPM`, H1 `Ekosistem Digital Penelitian, Pengabdian, Publikasi, dan Sentra HKI`, subjudul, 2 CTA (`Mulai Sekarang` solid orange, `Lihat Layanan` outline putih), kartu putih **Quick Access Portal** di kanan (4 item + chevron)
4. **Statistik** (bg terang): 6 kartu ikon + angka + label — 42 Penelitian Aktif, 28 HKI Terdaftar, 88 Jurnal Bereputasi, 19 Pengabdian Berjalan, 34 Mitra Kolaborasi, 12 Produk Inovasi
5. **Layanan Utama LPPM**: eyebrow `LAYANAN` + H2, grid 3×2 kartu (ikon, judul, deskripsi, link orange) — Hibah Penelitian Dosen/Pemula, Hibah Pengabdian Kemitraan, PPM Berbasis Reward, Klinik Publikasi Bereputasi, Pendampingan Hak Cipta dan HKI, Akses Jurnal & Repositori
6. **Berita dan Pengumuman**: eyebrow `INFORMASI` + H2, 3 kartu berita (tag orange + tanggal, judul, kutipan) + 1 kartu lebar `WORKSHOP`
7. **Dua kolom**: `Kegiatan Terdekat` (4 item: tanggal besar + judul + tanggal kecil) | `Kolaborasi dan Duta Inovasi` (4 item: avatar bulat + nama + peran + label kanan)
8. **Footer** (`image-2.png`): navy, kolom brand + `Menu Cepat` + `Kontak`, divider, copyright

### Pusat Unduhan (`/dokumen`) — `image-4.png`
1. Navbar
2. **Hero navy**: badge pill `POSTINGAN UNGGULAN`, H1 `Panduan, SOP, Template, SK, RAB, dan LPJ`, paragraf
3. **Search bar** (kartu putih menumpuk di bawah hero): input `Cari dokumen...` + select `Semua Kategori` + tombol orange `Cari`
4. **Grid kartu dokumen** (3 kolom): tag kategori (kiri atas) + meta `PDF • 2026` (kanan atas) → judul bold → deskripsi → tombol `⬇ Download`
5. Footer

### Dashboard Capaian (`/capaian`) — `attachment-2.png`
1. Navbar
2. **Hero navy**: badge `MONITORING CAPAIAN`, H1 `Capaian Penelitian, PKM, Publikasi, dan HKI`, subjudul
3. **Grid 6 KPI card**: 42 Penelitian Aktif / 28 PKM Aktif / 86 Publikasi Ilmiah / 19 HKI Terdaftar / 34 Mitra Sinergi / 12 Dosen Terlibat
4. **Luaran Terbaru** (grid 2×2): tag orange + tahun, judul, deskripsi, link `Lihat Detail Dokumen →`
5. **Section analitik gelap** (`image-9.png`): kartu chart batang Q1–Q4, legenda Penelitian/Pengabdian, 2 KPI (`Rp 1,84 M`, `70`)
6. Footer

### Form Pengajuan (`/pengajuan`) — field dari `kegiatan-1.png`
Judul Artikel · Nama & Link Jurnal · Nama Lengkap Dosen (dengan gelar) · Program Studi (select) · Link Berkas (URL) + catatan `Maksimal 10 MB` · tombol `Kirim`.

---

## 4. Komponen berulang

| Komponen | Dipakai di | Detail |
|---|---|---|
| `Navbar` | semua | sticky, putih, border bawah, item aktif pill abu + underline teal |
| `UtilityBar` | semua | navy, 1 baris, dot orange |
| `Footer` | semua | navy, 3 kolom, divider, copyright |
| `Button` | semua | varian `primary` (orange), `outline` (border putih/abu), `ghost`, `link` |
| `Card` | semua | putih, radius 12px, shadow halus, border 1px |
| `StatCard` | Beranda, Capaian | ikon kotak + angka besar + label + sublabel |
| `ServiceCard` | Beranda | ikon, judul, deskripsi, link orange |
| `DocumentCard` | Dokumen | tag + meta + judul + deskripsi + tombol download |
| `NewsCard` | Beranda | tag, tanggal, judul, kutipan |
| `EventItem` | Beranda | blok tanggal + judul + meta |
| `SectionHeading` | Beranda, Capaian, Dokumen | eyebrow orange + H2 navy + deskripsi |
| `Badge` | hero, kartu | pill; varian `solid`, `outline`, `soft` |
| `Input`, `Select`, `Textarea`, `FieldError` | Dokumen, Pengajuan | label di atas, radius 8px, ring fokus orange |
| `DropdownMenu` | Navbar | panel putih, radius 10px, item hover abu |
| `EmptyState`, `ErrorState`, `Skeleton` | halaman berdata | |
| `Container` | semua | max-width 1200px, padding responsif |

---

## 5. Design tokens

```css
/* Warna */
--color-navy-900: #0B2C4D;  /* topbar, hero, footer */
--color-navy-800: #103A63;  /* hover / gradient */
--color-navy-700: #1B4A78;
--color-orange-500: #F58220; /* CTA, eyebrow, tag, link */
--color-orange-600: #DD6E12; /* hover */
--color-orange-50: #FDEBDD;  /* chip background */
--color-orange-700: #D97706; /* chip text */
--color-teal-500: #2B7C8C;   /* aksen logo, underline nav */
--color-gold-400: #F2B01E;   /* aksen logo */
--color-ink-900: #111827;    /* heading */
--color-ink-700: #374151;    /* body kuat */
--color-ink-500: #6B7280;    /* muted */
--color-surface: #FFFFFF;
--color-canvas: #F5F6F8;
--color-border: #E5E7EB;
--color-success: #16A34A;
--color-danger: #DC2626;
```

**Font** — sans-serif grotesque (Inter / Poppins-like) → **Inter** (400/500/600/700/800), dimuat via Google Fonts di `index.html`, fallback `system-ui`.

**Spacing** — skala 4px: `2,4,6,8,12,16,20,24,32,40,48,56,64,80,96`.

**Radius** — `sm 6px` (tombol kecil), `md 8px` (input), `lg 12px` (kartu), `xl 16px` (hero), `pill 999px` (badge).

**Shadow** — `card: 0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.10)`; `lift: 0 8px 24px rgba(16,24,40,.10)`.

**Container** — 1200px, padding `16px` (mobile) → `24px` (tablet) → `32px` (desktop).

**Breakpoint** — `sm 390`, `md 768`, `lg 1024`, `xl 1440`.

**Ikon** — line icon 1.5px stroke (gaya Lucide/Feather), ukuran 20/24px, dibuat inline SVG (bukan aset desain).

---

## 6. Pertanyaan / hal yang belum jelas

1. **Tiga varian beranda** (`image-7`, `image.png`, `attachment-2`) berbeda teks & jumlah section. Mana yang final?
2. **Dua varian footer** (`image-2` LPPM TSU vs `image-3` "UPN/Perpustakaan"). `image-3` jelas mock lain → tidak dipakai.
3. **Nama institusi** tertukar di beberapa mock: "Universitas Tiga Serangkai" vs "Universitas Tanjungpura" vs "UPN". Dipakai **Universitas Tiga Serangkai** (sesuai logo + nama repo).
4. **Menu navbar** tidak konsisten: `image-4` → Beranda/Profil/Penelitian/Pengabdian/Luaran/Kegiatan/Kerjasama; `image-1` → LAYANAN ⌄ / PUSAT STUDI DAN UNIT / DOKUMEN. Digabung jadi: Beranda · Profil · Layanan ⌄ · Dokumen · Capaian · Kegiatan.
5. **Tidak ada desain** untuk halaman Profil, Penelitian, Pengabdian, Luaran, Kegiatan, Login Admin, dan hasil pencarian kosong.
6. **Tidak ada state mobile** di mock mana pun. Layout mobile diturunkan sendiri (grid 3→1 kolom, navbar → drawer).
7. **Angka statistik** di mock saling bertentangan (42/28/88/19/34/12 vs 42/28/86/19/34/12). Dipakai set pertama; dianggap data dummy.
8. **Footer `image-4`** masih placeholder abu bertuliskan "footer" → warna footer final diambil dari `image-2`.
9. **Aset gambar konten** (foto hero, thumbnail berita, avatar) tidak ada di zip. Dipakai blok warna/ikon sebagai placeholder, bukan menggambar ulang aset.
10. **Endpoint backend** belum ada. Kontrak di `docs/api-contract.md` masih usulan.
