# Kontrak API Autentikasi (Laravel Sanctum & SPA Authentication)
(Isi file sebelumnya...)

## 3. Dashboard Capaian API
Endpoint: `/api/admin/dashboard-settings` (Singleton), `/api/admin/programs` (Collection), `/api/admin/performance-data` (Collection)

### 3.1 Pengaturan Dashboard (GET/PUT)
- **GET**: Respons JSON dengan struktur: `title`, `intro`, `updatedLabel`, `howToRead` (Array), `widgets` (Array), `kpiMode` ("auto"|"manual"), `manualKpi` (Array), `yearStart`, `yearDefault`.
- **PUT**: Payload JSON serupa untuk update.

### 3.2 Prodi & Unit
- **GET/POST/PUT/DELETE**: Standar CRUD untuk `name`, `code`, `order`, `status`.

### 3.3 Data Kinerja
- **GET/POST/PUT/DELETE**: Standar CRUD untuk `programId`, `year`, `research_count`, `pkm_count`, `publication_count`, `hki_count`, `funding_amount`, `notes`.
- **POST /api/admin/performance-data/import**: Upload CSV (FormData). Validasi baris per baris.
