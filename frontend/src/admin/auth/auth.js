/**
 * Layer Auth Admin.
 * Menggunakan state in-memory / session-based cookie simulation.
 * Menghindari penyimpanan kata sandi/token di localStorage secara permanen.
 * Menyiapkan transisi ke Laravel Sanctum (POST /api/login, POST /api/logout, GET /api/user).
 */

const DEFAULT_ADMIN = {
  id: 1,
  name: "Administrator LPPM",
  email: import.meta.env.VITE_MOCK_ADMIN_EMAIL || "admin@lppm-tsu.ac.id",
  role: "superadmin",
};

const DEFAULT_PASSWORD = import.meta.env.VITE_MOCK_ADMIN_PASSWORD || "admin123";

// In-memory session state (tidak disimpan di localStorage demi keamanan)
let currentSessionUser = null;
const sessionListeners = [];

function notifySession() {
  sessionListeners.forEach((fn) => fn(currentSessionUser));
}

export function subscribeAuth(listener) {
  sessionListeners.push(listener);
  return () => {
    const idx = sessionListeners.indexOf(listener);
    if (idx !== -1) sessionListeners.splice(idx, 1);
  };
}

export async function login({ email, password }) {
  // Simulasi latency jaringan
  await new Promise((r) => setTimeout(r, 450));

  // Validasi format email dasar
  if (!email || !email.includes("@")) {
    const error = new Error("Format email tidak valid");
    error.status = 422;
    error.errors = { email: ["Format email tidak valid"] };
    throw error;
  }

  if (!password || password.length < 6) {
    const error = new Error("Kata sandi minimal 6 karakter");
    error.status = 422;
    error.errors = { password: ["Kata sandi harus memiliki minimal 6 karakter"] };
    throw error;
  }

  const expectedEmail = import.meta.env.VITE_MOCK_ADMIN_EMAIL || DEFAULT_ADMIN.email;
  const expectedPassword = import.meta.env.VITE_MOCK_ADMIN_PASSWORD || DEFAULT_PASSWORD;

  if (email !== expectedEmail || password !== expectedPassword) {
    // Pesan error umum: tidak membedakan email atau password salah
    const error = new Error("Email atau kata sandi salah");
    error.status = 401;
    throw error;
  }

  // Login berhasil: simpan user di session in-memory
  currentSessionUser = {
    ...DEFAULT_ADMIN,
    email,
    loggedInAt: new Date().toISOString(),
  };

  notifySession();
  return { user: currentSessionUser };
}

export async function logout() {
  await new Promise((r) => setTimeout(r, 200));
  currentSessionUser = null;
  notifySession();
  return { success: true };
}

export async function getCurrentUser() {
  // Untuk simulasi Sanctum GET /api/user
  return currentSessionUser;
}

export function isAuthenticated() {
  return currentSessionUser !== null;
}
