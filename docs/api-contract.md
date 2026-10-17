# Kontrak API Autentikasi (Laravel Sanctum & SPA Authentication)

Dokumen ini mendefinisikan kontrak API antara frontend React (Vite) dan backend Laravel untuk sistem autentikasi admin LPPM. Sesuai arsitektur SPA dengan Laravel Sanctum, komunikasi menggunakan cookie sesi (`XSRF-TOKEN` & `laravel_session`), bukan token di `localStorage`.

---

## 1. Endpoint Autentikasi

### 1.1 Login Admin
- **URL**: `POST /api/login`
- **Content-Type**: `application/json`
- **Accept**: `application/json`
- **Body**:
  ```json
  {
    "email": "admin@lppm-tsu.ac.id",
    "password": "secret_password"
  }
  ```
- **Respons Sukses (200 OK)**:
  ```json
  {
    "message": "Login berhasil",
    "user": {
      "id": 1,
      "name": "Administrator LPPM",
      "email": "admin@lppm-tsu.ac.id",
      "role": "superadmin"
    }
  }
  ```
- **Respons Gagal - Kredensial Salah (401 Unauthorized)**:
  ```json
  {
    "message": "Email atau kata sandi salah."
  }
  ```
- **Respons Gagal - Validasi Input (422 Unprocessable Entity)**:
  ```json
  {
    "message": "The given data was invalid.",
    "errors": {
      "email": ["The email field is required."]
    }
  }
  ```

---

### 1.2 Logout Admin
- **URL**: `POST /api/logout`
- **Headers**:
  - `Cookie`: session cookie dari Sanctum
  - `X-XSRF-TOKEN`: token CSRF dari cookie
- **Respons Sukses (200 OK / 204 No Content)**:
  ```json
  {
    "message": "Logout berhasil"
  }
  ```

---

### 1.3 Ambil Data Pengguna yang Sedang Masuk (Get Current User)
- **URL**: `GET /api/user`
- **Headers**:
  - `Cookie`: session cookie dari Sanctum
- **Respons Sukses (200 OK)**:
  ```json
  {
    "id": 1,
    "name": "Administrator LPPM",
    "email": "admin@lppm-tsu.ac.id",
    "role": "superadmin"
  }
  ```
- **Respons Belum Login (401 Unauthorized)**:
  ```json
  {
    "message": "Unauthenticated."
  }
  ```

---

## 2. Catatan Integrasi Frontend-Backend
1. **CSRF Protection**: Sebelum melakukan request `POST /api/login`, frontend harus melakukan request ke `/sanctum/csrf-cookie` untuk mendapatkan cookie CSRF.
2. **State Management**: Frontend tidak menyimpan token autentikasi di `localStorage` atau `sessionStorage` (kecuali data user non-sensitif untuk UI/sessionStorage sementara). Keamanan sesi sepenuhnya ditangani oleh cookie HTTP-only yang di-set oleh Laravel Sanctum.
