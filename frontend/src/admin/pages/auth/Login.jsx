import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login, isMockConfigured } from "@admin/auth/auth.js";
import { Shield, Eye, EyeOff, Lock, Mail, AlertTriangle, ArrowLeft } from "@shared/components/ui/Icons.jsx";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hasEnvConfig = isMockConfigured();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Silakan masukkan email dan kata sandi.");
      return;
    }

    if (!hasEnvConfig && import.meta.env.DEV) {
      setErrorMessage("Akun demo belum dikonfigurasi. Salin .env.example menjadi .env, isi VITE_MOCK_ADMIN_EMAIL dan VITE_MOCK_ADMIN_PASSWORD, lalu restart dev server.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      const from = location.state?.from || "/admin";
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || "Email atau kata sandi salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-card border border-border">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-navy-900 mb-6">
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
          <div className="mx-auto h-12 w-12 rounded-full bg-navy-900/10 flex items-center justify-center text-navy-900 mb-3">
            <Shield size={24} />
          </div>
          <h2 className="text-2xl font-bold text-navy-900">Login Administrator</h2>
          <p className="mt-1 text-sm text-muted">LPPM Universitas</p>
        </div>

        {/* Pesan khusus mode dev jika env belum diatur */}
        {import.meta.env.DEV && !hasEnvConfig && (
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm flex gap-3 items-start">
            <AlertTriangle size={20} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Mode Pengembangan</p>
              <p className="mt-1">
                Akun demo belum dikonfigurasi. Salin .env.example menjadi .env, isi VITE_MOCK_ADMIN_EMAIL dan VITE_MOCK_ADMIN_PASSWORD, lalu restart dev server.
              </p>
            </div>
          </div>
        )}

        {/* Pesan Error */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Form Login */}
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-900 mb-1.5">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                <Mail size={18} />
              </span>
              <input
                ref={emailRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@lppm-tsu.ac.id"
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-border bg-white text-ink-900 text-sm focus:outline-none focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-900 mb-1.5">
              Kata Sandi
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-white text-ink-900 text-sm focus:outline-none focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-navy-900"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg bg-navy-900 text-white font-medium hover:bg-navy-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm shadow-sm"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Memproses...
              </>
            ) : (
              "Masuk ke Dashboard"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
