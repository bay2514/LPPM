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
  Bell,
  Search,
  User,
  FileEdit,
} from "@shared/components/ui/Icons.jsx";

const navItems = [
  { path: "/admin", label: "Dasbor", icon: LayoutDashboard, exact: true },
  { path: "/admin/berita", label: "Berita", icon: Newspaper },
  { path: "/admin/kegiatan", label: "Kegiatan", icon: Calendar },
  { path: "/admin/dokumen", label: "Dokumen", icon: FolderOpen },
  { path: "/admin/mitra", label: "Mitra", icon: Building2 },
  { path: "/admin/profil", label: "Profil & Kontak", icon: Settings },
  { path: "/admin/dashboard-config", label: "Pengaturan Dashboard", icon: FileEdit, exact: true },
];

function NavList({ onNavigate }) {
  const location = useLocation();

  const isActive = (item) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);

  return (
    <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto custom-scrollbar" aria-label="Navigasi admin">
      <p className="px-3 text-[10px] font-bold text-navy-400 uppercase tracking-widest mb-2">Main Menu</p>
      {navItems.map((item) => {
        const active = isActive(item);
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 min-h-[44px] ${
              active
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                : "text-ink-500 hover:bg-navy-800 hover:text-white"
            }`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${active ? "text-white" : "text-ink-700 group-hover:text-white"}`} />
            <span className="whitespace-nowrap">{item.label}</span>
            {active && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarFooter() {
  return (
    <div className="p-4 border-t border-navy-800 bg-navy-950/30">
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-ink-500 hover:bg-navy-800 hover:text-white transition-colors group"
      >
        <div className="w-8 h-8 rounded bg-navy-800 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
          <ExternalLink size={16} />
        </div>
        <div className="flex flex-col">
          <span>Website Publik</span>
          <span className="text-[10px] font-normal text-ink-700">Buka di tab baru</span>
        </div>
      </a>
    </div>
  );
}

export default function AdminLayout() {
  const { user } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    if (confirm("Apakah Anda yakin ingin keluar dari panel admin?")) {
      await logoutAdmin();
      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-navy-900 antialiased flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:flex-col bg-navy-900 text-white shrink-0 shadow-2xl z-50">
        <div className="p-6 border-b border-navy-800">
          <Link to="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-black text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              LP
            </div>
            <div className="leading-tight">
              <span className="font-bold text-lg tracking-tight block">LPPM TSU</span>
              <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest block opacity-70">Admin Panel</span>
            </div>
          </Link>
        </div>

        <NavList />
        <SidebarFooter />
      </aside>

      {/* Area Isi */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-line shadow-sm px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 shrink-0 rounded-lg border border-line flex items-center justify-center text-navy-900 hover:bg-canvas transition-colors"
            >
              <Menu size={20} />
            </button>
            
            <div className="hidden md:flex items-center bg-canvas rounded-lg px-3 py-1.5 w-64 border border-line focus-within:border-orange-500 transition-colors">
              <Search size={16} className="text-ink-500 mr-2" />
              <input 
                type="text" 
                placeholder="Cari fitur..." 
                className="bg-transparent text-sm w-full outline-none text-navy-900"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:flex items-center gap-2">
              <button className="w-10 h-10 rounded-lg border border-line flex items-center justify-center text-ink-700 hover:bg-canvas transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
              </button>
            </div>

            <div className="h-8 w-px bg-line hidden sm:block"></div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-canvas transition-colors cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-navy-900 leading-none">{user?.name || "Administrator"}</p>
                  <p className="text-[10px] text-ink-700 mt-1 leading-none font-medium uppercase tracking-wider">{user?.role || "Super Admin"}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-700 flex items-center justify-center font-bold text-sm border border-navy-100 group-hover:border-navy-300 transition-colors">
                  {user?.name?.[0] || <User size={20} />}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-10 h-10 rounded-lg border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                title="Keluar"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 overflow-y-auto custom-scrollbar">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>

        <footer className="py-4 px-8 bg-white border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-700 font-medium">
            &copy; 2026 LPPM Universitas Tiga Serangkai. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
             <span className="flex items-center gap-1.5 text-[10px] font-bold text-success uppercase tracking-widest bg-success/5 px-2 py-1 rounded border border-success/10">
               <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
               Sistem Stabil
             </span>
             <span className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">
               v2.0.4-beta
             </span>
          </div>
        </footer>
      </div>

      {/* Mobile Sidebar (Drawer) */}
      {sidebarOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-[60] bg-navy-900/60 backdrop-blur-sm transition-opacity" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-[70] w-72 bg-navy-900 text-white flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
             <div className="p-6 border-b border-navy-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black text-white shadow-lg">LP</div>
                  <span className="font-bold text-lg">Admin LPPM</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="w-10 h-10 rounded-lg hover:bg-navy-800 flex items-center justify-center">
                  <X size={24} />
                </button>
             </div>
             <NavList onNavigate={() => setSidebarOpen(false)} />
             <SidebarFooter />
          </aside>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
        aside.custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1E293B;
        }
        aside.custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </div>
  );
}
