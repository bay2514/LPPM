# API Contract (Mock)

Base URL: `import.meta.env.VITE_API_URL`

## 1. Documents (Pusat Unduhan)
- `GET /documents`
  - Query: `?q=keyword&category=Panduan&year=2025`
  - Response:
    ```json
    {
      "data": [
        {
          "id": "d1",
          "slug": "panduan-penelitian-2025",
          "title": "...",
          "description": "...",
          "category": "Panduan | Template | SOP | SK | LPJ",
          "fileType": "PDF",
          "year": 2025,
          "size": "2.4 MB",
          "url": "https://..."
        }
      ],
      "meta": { "total": 6 }
    }
    ```
- `GET /documents/{slug}`
- `GET /documents/{slug}/download`

## 2. Capaian (Dashboard)
- `GET /stats`
  - Response:
    ```json
    {
      "data": {
        "kpis": [
          { "id": "kpi1", "label": "Penelitian Aktif", "value": 42, "sublabel": "Tahun berjalan" }
        ],
        "outputs": [
          { "id": "lo1", "tag": "Jurnal", "year": 2025, "title": "...", "description": "..." }
        ]
      }
    }
    ```

## 3. Pengajuan
- `POST /submissions`
  - Body: `application/json`
    ```json
    { "nama": "...", "email": "...", "instansi": "...", "tipe": "penelitian|pengabdian|hki|konsultasi", "judul": "...", "deskripsi": "..." }
    ```
  - Response: `{ "data": { "id": "sub-123", "status": "received" } }`

## Error Response
```json
{ "message": "Validation failed", "errors": { "email": ["Email wajib diisi"] } }
```
