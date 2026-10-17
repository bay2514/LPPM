/**
 * Admin Login Page.
 * Email + password, validasi sisi klien, tombol tampil/sembunyi password,
 * state loading, dan pesan error umum (jangan bedakan mana yang salah).
 * Tampilkan error validasi Laravel (format 422: { message, errors: {...} }).
 */

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "@admin/auth/auth.js";
import { Button } from "@shared/components/ui/Button.jsx";
import { Input } from "@shared/components/forms/Input.jsx";
import { Card } from "@shared/components/ui/Card.jsx";
import { Eye, EyeOff, Lock, Mail } from "@shared/components/ui/Icons.jsx";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState({ email: "", password: "" });

  // Redirect jika sudah login: kembali ke halaman tujuan atau dashboard
  const from = location.state?.from || "/admin";
  const message = location.state?.message;

  useEffect(() => {
    // Periksa status autentikasi saat mount
    const checkAuth = async () => {
      const res = await fetch("/api/user", { credentials: "include" }).catch(() => null);
      if (res && res.ok) {
        navigate(from, { replace: true });
      }
    };
    // Mock auth check
    const stored = localStorage.getItem("lppm_admin_session");
    if (stored) {
      const session = JSON.parse(stored);
      if (session && session.email) {
        navigate(from, { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const validate = () => {
    const errors = { email: "", password: "" };
    let valid = true;
    if (!email || !email.includes("@")) {
      errors.email = "Email tidak valid";
      valid = false;
    }
    if (!password || password.length < 6) {
      errors.password = "Kata sandi minimal 6 karakter";
      valid = false;
    }
    setFormError(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await login({ email, password });
      // Mock: simpan session ke localStorage untuk persistensi (bukan best practice, tapi untuk dev)
      localStorage.setItem("lppm_admin_session", JSON.stringify({ email }));
      navigate(from, { replace: true });
    } catch (err) {
      // Handle Laravel-style 422 error
      if (err.status === 422 && err.errors) {
        if (err.errors.email) setFormError((prev) => ({ ...prev, email: err.errors.email }));
        if (err.errors.password) setFormError((prev) => ({ ...prev, password: err.errors.password }));
      }
      setError(err.message || "Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin LPPM</h1>
          <p className="text-sm text-gray-600 mt-2">
            Masuk untuk mengelola konten website LPPM Universitas Tiga Serangkai
          </p>
          {message && <p className="text-sm text-red-600 mt-2">{message}</p>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@lppm-tsu.ac.id"
              icon={<Mail className="w-4 h-4 text-gray-400" />}
              error={formError.email || error}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4 text-gray-400" />}
                error={formError.password || error}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                disabled={loading}
                tabIndex={-1}
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" fullWidth loading={loading}>
            Masuk
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Kredensial demo:</p>
          <p>Email: {import.meta.env.VITE_MOCK_ADMIN_EMAIL || "admin@lppm-tsu.ac.id"}</p>
          <p>Password: {import.meta.env.VITE_MOCK_ADMIN_PASSWORD || "admin123"}</p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <a href="/" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Kembali ke Website Publik
          </a>
        </div>
      </Card>
    </div>
  );
}
