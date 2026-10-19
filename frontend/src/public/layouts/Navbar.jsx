import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "@shared/components/ui/Icons.jsx";
import logo from "@assets/logo-lppm-tsu.png";

const links = [
  { label: "Beranda", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  {
    label: "Layanan",
    to: "#",
    children: [
      { label: "Penelitian", to: "/penelitian" },
      { label: "Pengabdian", to: "/pengabdian" },
      { label: "Kerjasama", to: "/kerjasama" },
    ],
  },
  { label: "Dokumen", to: "/dokumen" },
  { label: "Luaran", to: "/luaran" },
  { label: "Kegiatan", to: "/kegiatan" },
  { label: "Berita", to: "/berita" },
  { label: "Pengajuan", to: "/pengajuan" },
];

function AuthLink({ onNavigate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Link
          to="/admin"
          onClick={onNavigate}
          className="rounded-xl border border-line bg-navy-50 px-4 py-2.5 text-sm font-bold text-navy-800 hover:bg-navy-100 min-h-[44px] flex items-center transition-all"
        >
          Dasbor Admin
        </Link>
        <button
          type="button"
          onClick={() => {
            setIsAuthenticated(false);
            if (onNavigate) onNavigate();
          }}
          className="rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700 hover:bg-red-100 min-h-[44px] transition-all"
        >
          Keluar
        </button>
      </div>
    );
  }

  return (
    <Link
      to="/admin/login"
      onClick={onNavigate}
      className="rounded-xl bg-navy-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-navy-800 min-h-[44px] flex items-center transition-all shadow-md"
    >
      Login Admin
    </Link>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-container items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo LPPM TSU" className="h-10 w-auto" />
          <div className="hidden leading-tight sm:block">
            <div className="text-sm font-extrabold tracking-tight text-navy-950">
              LPPM
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-navy-600">
              Universitas Tiga Serangkai
            </div>
          </div>
        </Link>

        {/* desktop */}
        <div className="hidden items-center gap-1 min-[900px]:flex">
          {links.map((item) =>
            item.children ? (
              <div key={item.label} className="relative">
                <button
                  className="flex items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-bold text-navy-900 hover:bg-canvas transition-colors"
                  onClick={() => setOpenDropdown((s) => !s)}
                  onBlur={() => setTimeout(() => setOpenDropdown(false), 120)}
                >
                  {item.label}
                  <ChevronDown size={16} />
                </button>
                {openDropdown && (
                  <div className="absolute left-0 top-full mt-2 w-48 rounded-2xl border border-line bg-white p-2 shadow-2xl">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        to={c.to}
                        className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-navy-900 hover:bg-orange-50 hover:text-orange-700 transition-colors"
                        onClick={() => setOpenDropdown(false)}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                  pathname === item.to
                    ? "bg-orange-50 text-orange-700"
                    : "text-navy-900 hover:bg-canvas"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden min-[900px]:block">
            <AuthLink />
          </div>
          <button
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-navy-900 hover:bg-canvas min-[900px]:hidden transition-all"
            aria-label="Buka menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 min-[900px]:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-72 bg-surface p-6 shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4">
              <span className="text-sm font-extrabold text-navy-800">Menu</span>
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-500 hover:bg-canvas" onClick={() => setOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {links.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <span className="px-2 py-2 text-sm font-semibold text-ink-500">{item.label}</span>
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        to={c.to}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-4 py-2 text-sm text-ink-700 hover:bg-canvas"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`rounded-md px-2 py-2 text-sm font-medium ${
                      pathname === item.to
                        ? "bg-navy-50 text-navy-800"
                        : "text-ink-700 hover:bg-canvas"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="mt-2">
                <AuthLink onNavigate={() => setOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
