/**
 * Layout Utama Admin (Sidebar, Header, Konten Area).
 * Responsif: di HP, sidebar menjadi drawer.
 * Dilengkapi tombol logout dan informasi profil admin yang sedang login.
 */

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout, useAdminAuth } from "@admin/auth/auth.js";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Calendar,
  Building2,
  FolderOpen,
  Settings,
  LogOut,
  Menu,
  X,
  User,
} from "@shared/components/ui/Icons.jsx";
import { Button } from "@shared/components/ui/Button.jsx";

const navItems = [
  { label: "Dasbor", path: "/admin", icon: LayoutDashboard },
  { label: "Berita & Pengumuman", path: "/admin/berita", icon: Newspaper },
  { label: "Kegiatan & Agenda", path: "/admin/kegiatan", icon: Calendar },
  { label: "Dokumen & SOP", path: "/admin/dokumen", icon: FileText },
  { label: "Mitra & Kerjasama", path: "/admin/mitra", icon: Building2 },
  { label: "Profil & Banner", path: "/admin/profil", icon: Settings },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-navy-800">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-gold-400 text-navy-900 font-bold">
              A
            </div>
            <span className="font-bold tracking-wide">Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
            aria-label="Tutup sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-navy-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-navy-800">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center text-gold-400 font-bold">
              {user?.name?.[0] || "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate text-white">{user?.name || "Administrator"}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email || "admin@lppm-tsu.ac.id"}</p>
            </div>
          </div>
          <Button
            variant="outline"
            fullWidth
            onClick={handleLogout}
            className="border-navy-700 text-gray-300 hover:bg-red-600 hover:border-red-600 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Keluar
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Buka sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              {navItems.find((item) => item.path === location.pathname)?.label || "Dashboard Admin"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium hidden sm:inline-flex items-center gap-1"
            >
              Lihat Website ↗
            </a>
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">
              {user?.name?.[0] || "A"}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
