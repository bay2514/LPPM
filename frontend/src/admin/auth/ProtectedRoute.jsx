import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "@admin/auth/auth.js";

function FullscreenSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

/**
 * Membungkus rute yang hanya boleh diakses setelah login.
 * Saat status sedang diperiksa tampilkan indikator memuat.
 * Jika tidak login, arahkan ke /admin/login dengan menyimpan tujuan awal.
 */
export function ProtectedRoute({ children }) {
  const location = useLocation();
  const [user, setUser] = useState(undefined); // undefined = masih memeriksa

  useEffect(() => {
    let cancelled = false;
    getCurrentUser().then((u) => {
      if (!cancelled) setUser(u);
    });
    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  if (user === undefined) return <FullscreenSpinner />;

  if (user === null) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return children;
}

/**
 * Membungkus rute yang seharusnya tidak bisa diakses setelah login
 * (misalnya halaman login).
 * Jika sudah login, arahkan ke /admin.
 */
export function PublicOnlyRoute({ children }) {
  const location = useLocation();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    let cancelled = false;
    getCurrentUser().then((u) => {
      if (!cancelled) setUser(u);
    });
    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  if (user === undefined) return <FullscreenSpinner />;

  if (user !== null) {
    const target = location.state?.from || "/admin";
    return <Navigate to={target} replace />;
  }

  return children;
}
