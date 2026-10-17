import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth, logout as logoutAdmin } from "@admin/auth/auth.js";
import { Button } from "@shared/components/ui/Button.jsx";
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  FolderOpen,
  Building2,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "@shared/components/ui/Icons.jsx";

/**
 * Menu admin. Path HARUS sama dengan rute anak di admin/routes/index.jsx:
 * berita, kegiatan, dokumen, mitra, profil.
 */
const navItems = [
  { path: "/admin", label: "Dasbor", icon: LayoutDashboard, exact: true },
  { path: "/admin/berita", label: "Berita", icon: Newspaper },
  { path: "/admin/kegiatan", label: "Kegiatan", icon: Calendar },
  { path: "/admin/dokumen", label: "Dokumen", icon: FolderOpen },
  { path: "/admin/mitra", label: "Mitra", icon: Building2 },
  { path: "/admin/profil", label: "Profil & Kontak", icon: Settings },
];

function NavList({ onNavigate }) {
  const location = useLocation();

  const isActive = (item) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);

  return (
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Navigasi admin">
      {navItems.map((item) => {
        const active = isActive(item);
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
              active
                ? "bg-orange-500 text-white shadow-card"
                : "text-gray-300 hover:bg-navy-800 hover:text-white"
            }`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 ${active ? "text-white" : "text-gray-400"}`} />
            <span className="whitespace-nowrap">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarFooter() {
  return (
    <div className="p-4 border-t border-navy-800">
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-gray-300 hover:bg-navy-800 hover:text-white transition-colors min-h-[44px]"
      >
        <span className="flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-orange-400" />
          Lihat Website Publik
        </span>
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}

export default function AdminLayout() {
  const { user } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Tutup drawer setiap kali rute berubah.
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Tutup drawer dengan tombol Escape + cegah scroll latar saat drawer terbuka.
  useEffect(() => {
    if (!sidebarOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [sidebarOpen]);

  const handleLogout = async () => {
    await logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-canvas font-sans text-navy-900 antialiased flex">
      {/* ===== Sidebar desktop: menetap mulai 1024px ===== */}
      <aside className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:flex-col bg-navy-900 text-white shrink-0">
        <div className="p-5 border-b border-navy-800">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-white shadow-card">
              LP
            </div>
            <div>
              <span className="font-bold text-base tracking-tight block">Admin LPPM</span>
              <span className="text-xs text-gray-400 block">Panel Pengelolaan</span>
            </div>
          </Link>
        </div>

        <NavList />
        <SidebarFooter />
      </aside>

      {/* ===== Drawer mobile (< 1024px) ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-900/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="admin-sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-navy-900 text-white flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!sidebarOpen}
        aria-label="Menu admin"
      >
        <div className="p-5 border-b border-navy-800 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
            <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-white shadow-card">
              LP
            </div>
            <div>
              <span className="font-bold text-base tracking-tight block">Admin LPPM</span>
              <span className="text-xs text-gray-400 block">Panel Pengelolaan</span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="w-11 h-11 -mr-1 flex items-center justify-center rounded-lg text-gray-300 hover:text-white hover:bg-navy-800 transition-colors"
            aria-label="Tutup menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <NavList onNavigate={() => setSidebarOpen(false)} />
        <SidebarFooter />
      </aside>

      {/* ===== Area isi ===== */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-surface border-b border-line shadow-sm px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-11 h-11 shrink-0 rounded-lg border border-line flex items-center justify-center text-navy-900 hover:bg-canvas transition-colors"
              aria-label="Buka menu"
              aria-controls="admin-sidebar"
              aria-expanded={sidebarOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm sm:text-base font-bold text-navy-900 truncate">
              Portal Pengelola LPPM
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-2 text-right">
              <div className="w-8 h-8 rounded-full bg-navy-50 text-navy-700 flex items-center justify-center font-bold text-xs">
                {user?.name?.[0] || "A"}
              </div>
              <div className="text-xs leading-tight">
                <p className="font-semibold text-navy-900">{user?.name || "Administrator"}</p>
                <p className="text-gray-500">{user?.email || "admin@lppm.ac.id"}</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 min-h-[44px] px-3"
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              <span className="whitespace-nowrap">Keluar</span>
            </Button>
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <Outlet />
        </main>

        {import.meta.env.DEV && (
          <footer className="py-2 px-4 bg-navy-900/5 text-center text-[11px] text-gray-500 border-t border-line">
            Mode Pengembangan: Penyimpanan Data Mock Lokal (Aktif)
          </footer>
        )}
      </div>
    </div>
  );
}
