import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "@shared/components/ui/Icons.jsx";
import logo from "@assets/logo-lppm-tsu.png";

const links = [
  { label: "Beranda", to: "/" },
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
  { label: "Capaian", to: "/capaian" },
  { label: "Kegiatan", to: "/kegiatan" },
  { label: "Berita", to: "/berita" },
  { label: "Pengajuan", to: "/pengajuan" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-surface">
      <div className="mx-auto flex max-w-container items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo LPPM TSU" className="h-10 w-auto" />
          <div className="hidden leading-tight sm:block">
            <div className="text-sm font-extrabold tracking-tight text-navy-800">
              LPPM
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">
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
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-ink-700 hover:bg-canvas"
                  onClick={() => setOpenDropdown((s) => !s)}
                  onBlur={() => setTimeout(() => setOpenDropdown(false), 120)}
                >
                  {item.label}
                  <ChevronDown size={16} />
                </button>
                {openDropdown && (
                  <div className="absolute left-0 top-full mt-1 w-48 rounded-lg border border-line bg-surface p-1 shadow-lift">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        to={c.to}
                        className="block rounded-md px-3 py-2 text-sm text-ink-700 hover:bg-canvas"
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
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === item.to
                    ? "bg-navy-50 text-navy-800"
                    : "text-ink-700 hover:bg-canvas"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden rounded-md border border-line bg-surface px-3 py-2 text-sm font-semibold text-navy-800 hover:bg-canvas min-[900px]:block"
          >
            Login Admin
          </Link>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-700 hover:bg-canvas min-[900px]:hidden"
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
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-md border border-line px-2 py-2 text-center text-sm font-semibold text-navy-800 hover:bg-canvas"
              >
                Login Admin
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
