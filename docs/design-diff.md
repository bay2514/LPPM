# Design Diff Analysis

## General
- **Logo**: Current app uses a text "L" logo; Design uses a graphic teal/orange logo.
- **Color Palette**: Current app colors (navy-900: `#081F38`) are slightly darker/different than design estimates.
- **Icons**: Current app uses custom SVG wrappers; Design allows Lucide-React.

## Layout & Sections

### Top Bar & Navbar
- **Top Bar**: Current has "Login Admin" on right; Design has it too. Location dot is orange in current, matches design.
- **Navbar**: 
  - Current: Beranda, Layanan (Penelitian, Pengabdian, Kerjasama), Dokumen, Capaian, Kegiatan, Berita, Pengajuan.
  - Design: Beranda, Profil, Penelitian, PKM, Publikasi, HKI, Dokumen, Agenda, Luaran, Mitra.
  - **Action**: Update navbar links to match design.

### Home Page
- **Hero**: 
  - Current: Split layout with text on left and Quick Access on right.
  - Design: Split layout with text on left and Quick Access on right. Titles match.
- **Stats**:
  - Current: 6 cards. Icons and labels need alignment with mockup (Penelitian Aktif, PKM Aktif, Publikasi Ilmiah, HKI Terdaftar, Mitra Strategis, Desa Binaan).
- **Layanan (Services)**:
  - Current: ServiceCard layout is similar. Labels/titles need adjustment.
- **News**: 
  - Current: Grid of 3 cards.
  - Design: Grid of 4 cards (3 upper, 1 lower wide). Highlighted card has orange border.
- **Events & Collaborators**:
  - Current: Events on left, Collaborators on right.
  - Design: Events on left, Partnerships/Villages on right.

### Footer
- **Layout**: 3 columns.
- **Content**: 
  - Column 1: Identity/Description.
  - Column 2: "Menu Cepat" (Quick links).
  - Column 3: "Kontak" (Map, Mail, Phone).
- **Bottom**: Copyright line + Admin login link.

### Documents Page
- **Search**: Needs "Semua Kategori" dropdown filter.
- **Cards**: Format (`PDF • 2026`) and Download button style need sync.

## Summary of Changes Needed
1. Update `tailwind.config.js` with precise colors.
2. Replace logo with `logo-lppm-tsu.png`.
3. Update `UtilityBar` and `Navbar` links.
4. Refactor `Home.jsx` sections (Stats labels, News grid, Partnerships).
5. Update `Footer.jsx` content.
6. Update `Documents.jsx` filters and card layout.
7. Implement `Dashboard` kinerja prodi analytics.
