import { useEffect, useState } from "react";
import { getCurrentUser, logout, subscribeAuth } from "@admin/auth/auth.js";
import { useNavigate } from "react-router-dom";

/**
 * Hook untuk mengamati status autentikasi admin secara reaktif.
 */
export function useAdminAuth() {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const unsubscribe = subscribeAuth((sessionUser) => {
      setUser(sessionUser);
    });
    return unsubscribe;
  }, []);

  return user;
}

/**
 * Komponen wrapper: jika belum login redirect ke /admin/login,
 * dan simpan halaman tujuan di state untuk redirect kembali setelah login.
 * Jika sudah login lalu membuka /admin/login, redirect ke /admin.
 */
export function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const user = useAdminAuth();

  useEffect(() => {
    if (!checked) {
      // Tunggu 1 tick agar session di-resolve (bila async di masa depan)
      const id = setTimeout(() => setChecked(true), 50);
      return () => clearTimeout(id);
    }
    if (user === null) {
      navigate("/admin/login", { replace: true, state: { from: window.location.pathname + window.location.search } });
    }
  }, [checked, user, navigate]);

  if (!checked || user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return children;
}

/**
 * Hook untuk handle sesi kedaluwarsa: redirect ke login dengan pesan.
 */
export function useHandleExpiredSession() {
  const navigate = useNavigate();
  return async function handleExpiredSession() {
    await logout();
    navigate("/admin/login", { replace: true, state: { message: "Sesi telah berakhir, silakan masuk kembali." } });
  };
}
