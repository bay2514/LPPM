/**
 * Lapisan autentikasi admin (mock).
 *
 * Kontrak fungsi ini sengaja dibuat mirip Laravel Sanctum supaya mudah diganti:
 *   POST /api/login   -> login(email, password)
 *   POST /api/logout  -> logout()
 *   GET  /api/user    -> getCurrentUser()
 *
 * Lihat docs/api-contract.md untuk bentuk request/response sebenarnya.
 */

import { useState, useEffect } from "react";

const STORAGE_KEY = "lppm_admin_session";

// Kredensial demo dibaca dari environment Vite (bukan process.env).
const MOCK_EMAIL = import.meta.env.VITE_MOCK_ADMIN_EMAIL;
const MOCK_PASSWORD = import.meta.env.VITE_MOCK_ADMIN_PASSWORD;

const MOCK_USER = {
  id: 1,
  name: "Administrator LPPM",
  role: "superadmin",
};

/**
 * Hook untuk memantau status autentikasi di seluruh aplikasi.
 */
export function useAdminAuth() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser || null);
    };

    checkAuth();
    return subscribeAuth((u) => setUser(u || null));
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoading: user === undefined,
  };
}

/** Apakah kredensial demo sudah dikonfigurasi di .env */
export function isMockConfigured() {
  return Boolean(MOCK_EMAIL && MOCK_PASSWORD);
}

function readStoredUser() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Hanya terima objek user non-sensitif.
    if (!parsed || typeof parsed !== "object" || !parsed.id) return null;
    return {
      id: parsed.id,
      name: parsed.name,
      email: parsed.email,
      role: parsed.role,
    };
  } catch {
    return null;
  }
}

function writeStoredUser(user) {
  // Tidak pernah menyimpan kata sandi atau token.
  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  );
}

/** Membuat error dengan bentuk menyerupai respons Laravel. */
function laravelError(status, message, errors) {
  const error = new Error(message);
  error.status = status;
  error.errors = errors || {};
  return error;
}

/**
 * Login admin.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: object}>}
 * @throws {Error & {status:number, errors:object}} status 422/401
 */
export async function login(email, password) {
  // Simulasi jeda jaringan.
  await new Promise((resolve) => setTimeout(resolve, 400));

  const errors = {};
  if (!email) errors.email = ["Email wajib diisi."];
  if (!password) errors.password = ["Kata sandi wajib diisi."];

  if (Object.keys(errors).length > 0) {
    throw laravelError(422, "Data yang diberikan tidak valid.", errors);
  }

  if (!isMockConfigured()) {
    throw laravelError(
      422,
      "Akun demo belum dikonfigurasi di server.",
      { email: ["Kredensial demo belum diatur."] }
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = password.trim();

  if (normalizedEmail !== MOCK_EMAIL.trim().toLowerCase() || normalizedPassword !== MOCK_PASSWORD.trim()) {
    // Pesan sengaja umum: tidak membocorkan bagian mana yang salah.
    throw laravelError(401, "Email atau kata sandi salah.", {
      email: ["Email atau kata sandi salah."],
    });
  }

  const user = { ...MOCK_USER, email: MOCK_EMAIL.trim().toLowerCase() };
  writeStoredUser(user);
  return { user };
}

/** Logout: hapus sesi mock. */
export async function logout() {
  sessionStorage.removeItem(STORAGE_KEY);
  return { success: true };
}

/** Ambil user yang sedang login, atau null. */
export async function getCurrentUser() {
  return readStoredUser();
}
