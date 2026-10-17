# Audit UX Admin Panel - Form dan Data Sync

## Waktu Audit
2026-10-17

## Masalah Utama
Form di admin panel tidak bisa diedit dan perubahan tidak muncul di halaman publik.

## Diagnosa Detail

### 1. Komponen UI (Input, Textarea, Select)
**Status**: ✅ Benar  
**File**: `src/shared/components/forms/Input.jsx`, `Textarea.jsx`, `Select.jsx`  
**Temuan**:
- Semua komponen menerima `value` dan `onChange` via `{...props}`
- Tidak ada atribut `disabled` atau `readOnly` permanen
- Validasi error handling tersedia

### 2. Form Admin (News, Events, Documents, Collaborators)
**Status**: ✅ Benar  
**File**: `src/admin/pages/news/NewsList.jsx`, `EventList.jsx`, `DocumentList.jsx`, `CollaboratorList.jsx`  
**Temuan**:
- State form terisi dari data lama saat `handleOpenEdit()`
- `handleInputChange()` memperbarui state dan menandai `isDirty`
- `handleSave()` memanggil `adminUpdate` atau `adminCreate` dengan `e.preventDefault()`
- Tombol Simpan memiliki `disabled={saving}`

### 3. API Layer
**Status**: ✅ Benar  
**File**: `src/admin/api/index.js`, `src/public/api/index.js`  
**Temuan**:
- `adminCreate`, `adminUpdate`, `adminDelete` memanggil `sharedStore`
- `sharedStore` memiliki metode `notify()` untuk subscriber

### 4. Store In-Memory
**Status**: ✅ Benar  
**File**: `src/shared/lib/store.js`  
**Temuan**:
- `sharedStore` mendukung CRUD dengan `notify()` listener
- Setiap operasi `create`, `update`, `delete` memanggil `this.notify()`
- Listener dapat subscribe via `sharedStore.subscribe(listener)`

### 5. Sinkronisasi Data ke Publik - BUG UTAMA
**Status**: ❌ Rusak  
**File**: `src/public/pages/Berita.jsx`, `Kegiatan.jsx`, `Documents.jsx`, `Kerjasama.jsx`  
**Temuan**:
- **Semua halaman publik mengimpor data statis dari `@shared/lib/mock.js`**  
  Contoh di `Berita.jsx`:
  ```jsx
  import { news, events } from "@shared/lib/mock.js";
  ```
- Data yang di-render adalah **data awal statis**, bukan data dari `sharedStore`
- Karena `sharedStore.notify()` dipanggil saat admin update, tapi tidak ada subscriber di publik, maka UI tidak terbarui
- **Solusi**: Ganti import statis dengan `useEffect` + `sharedStore.subscribe()` atau gunakan `src/public/api/index.js` yang mengonsumsi `sharedStore`

### 6. Rute Admin
**Status**: ✅ Benar  
**File**: `src/admin/routes/index.jsx`  
**Temuan**:
- Menggunakan nested routes dengan `Outlet`
- Rute `edit` tersedia (misal: `/admin/berita/:id/edit`)

## Root Cause
Halaman publik tidak menggunakan data dari `sharedStore` yang direaktifkan oleh admin. Mereka menggunakan import statis dari `mock.js`.

## Rekomendasi Perbaikan
1. Ubah halaman publik agar mengambil data dari `src/public/api/index.js` dan subscribe ke perubahan `sharedStore`.
