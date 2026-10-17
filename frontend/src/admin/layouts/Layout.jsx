import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@admin/auth/auth.js";
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
  User,
} from "@shared/components/ui/Icons.jsx";

const navItems = [
  { path: "/admin", label: "Dasbor", icon: LayoutDashboard, exact: true },
  { path: "/admin/news", label: "Berita", icon: Newspaper },
  { path: "/admin/events", label: "Kegiatan", icon: Calendar },
  { path: "/admin/documents", label: "Dokumen", icon: FolderOpen },
  { path: "/admin/collaborators", label: "Mitra", icon: Building2 },
  { path: "/admin/profile", label: "Profil & Kontak", icon: Settings },
];

export default function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col md:flex-row font-sans text-navy-900 antialiased">
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Desktop fixed, Mobile drawer) */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-50 w-64 bg-navy-900 text-white flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-navy-800 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-white shadow-card">
              LP
            </div>
            <div>
              <span className="font-bold text-base tracking-tight block">Admin LPPM</span>
              <span className="text-xs text-gray-400 block">Panel Pengelolaan</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                  active
                    ? "bg-orange-500 text-white shadow-card"
                    : "text-gray-300 hover:bg-navy-800 hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? "text-white" : "text-gray-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
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
            <span>↗</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Header */}
        <header className="sticky top-0 z-30 bg-surface border-b border-line shadow-sm px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden w-11 h-11 rounded-lg border border-line flex items-center justify-center text-navy-900 hover:bg-canvas transition-colors"
              aria-label="Buka Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs text-gray-400 block sm:hidden">Admin LPPM</span>
              <h2 className="text-sm sm:text-base font-bold text-navy-900 truncate">
                Portal Pengelola LPPM
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-right">
              <div className="w-8 h-8 rounded-full bg-navy-50 text-navy-700 flex items-center justify-center font-bold text-xs">
                {user?.name?.[0] || "A"}
              </div>
              <div className="text-xs">
                <p className="font-semibold text-navy-900">{user?.name || "Administrator"}</p>
                <p className="text-gray-500">{user?.email || "admin@lppm.ac.id"}</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 min-h-[44px] sm:min-h-0 px-3"
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              <span className="whitespace-nowrap">Keluar</span>
            </Button>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Dev Mode Banner (Internal Only) */}
        {import.meta.env.DEV && (
          <footer className="py-2 px-4 bg-navy-900/5 text-center text-[11px] text-gray-500 border-t border-line">
            Mode Pengembangan: Penyimpanan Data Mock Lokal (Aktif)
          </footer>
        )}
      </div>
    </div>
  );
}
