import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "@shared/components/ui/Icons.jsx";
import { navigationConfig } from "@shared/config/navigation";
import logo from "@assets/logo-lppm-tsu.png";

function AuthLink({ onNavigate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Link
          to="/admin"
          onClick={onNavigate}
          className="rounded-xl border border-line bg-navy-50 px-4 py-2.5 text-sm font-bold text-navy-800 hover:bg-navy-100 min-h-[44px] flex items-center transition-all focus:ring-2 focus:ring-orange-500"
        >
          Dasbor Admin
        </Link>
        <button
          type="button"
          onClick={() => {
            setIsAuthenticated(false);
            if (onNavigate) onNavigate();
          }}
          className="rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700 hover:bg-red-100 min-h-[44px] transition-all focus:ring-2 focus:ring-red-500"
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
      className="rounded-xl bg-navy-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-navy-800 min-h-[44px] flex items-center transition-all shadow-md focus:ring-2 focus:ring-orange-500"
    >
      Login Admin
    </Link>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // label of open dropdown
  const [activeFlyout, setActiveFlyout] = useState(null); // label of open submenu flyout (e.g. Luaran)
  const navRef = useRef(null);

  // Close dropdowns on route change or click outside
  useEffect(() => {
    setActiveDropdown(null);
    setActiveFlyout(null);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setActiveFlyout(null);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setActiveDropdown(null);
        setActiveFlyout(null);
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isItemActive = (item) => {
    if (item.to === pathname) return true;
    if (item.children) {
      return item.children.some((child) => isItemActive(child));
    }
    return false;
  };

  return (
    <nav ref={navRef} className="sticky top-0 z-50 border-b border-line bg-white shadow-sm">
      <div className="mx-auto flex max-w-container items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 min-h-[44px] focus:ring-2 focus:ring-orange-500 rounded-xl">
          <img src={logo} alt="Logo LPPM TSU" className="h-10 w-auto" />
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-tight text-navy-950">
              LPPM
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-navy-600">
              Universitas Tiga Serangkai
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 min-[1024px]:flex">
          {navigationConfig.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = activeDropdown === item.label;
            const active = isItemActive(item);

            if (!hasChildren) {
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`rounded-xl px-4 py-2.5 text-sm font-bold transition-all min-h-[44px] flex items-center focus:ring-2 focus:ring-orange-500 ${
                    active ? "bg-orange-50 text-orange-700 font-extrabold" : "text-navy-900 hover:bg-canvas"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => {
                  setActiveDropdown(null);
                  setActiveFlyout(null);
                }}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => setActiveDropdown(isOpen ? null : item.label)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveDropdown(isOpen ? null : item.label);
                    }
                  }}
                  className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold transition-all min-h-[44px] focus:ring-2 focus:ring-orange-500 ${
                    active || isOpen ? "bg-orange-50 text-orange-700 font-extrabold" : "text-navy-900 hover:bg-canvas"
                  }`}
                >
                  {item.label}
                  <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="absolute left-0 top-full pt-1 w-56 z-50">
                    <div className="rounded-2xl border border-line bg-white p-2 shadow-2xl">
                      {item.children.map((child) => {
                        const childHasChildren = child.children && child.children.length > 0;
                        const isFlyoutOpen = activeFlyout === child.label;
                        const childActive = isItemActive(child);

                        if (!childHasChildren) {
                          return (
                            <Link
                              key={child.label}
                              to={child.to}
                              className={`block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors min-h-[40px] flex items-center ${
                                childActive
                                  ? "bg-orange-50 text-orange-700 font-bold"
                                  : "text-navy-900 hover:bg-orange-50 hover:text-orange-700"
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        }

                        // Submenu with flyout (e.g. Luaran)
                        return (
                          <div
                            key={child.label}
                            className="relative"
                            onMouseEnter={() => setActiveFlyout(child.label)}
                            onMouseLeave={() => setActiveFlyout(null)}
                          >
                            <button
                              type="button"
                              aria-haspopup="true"
                              aria-expanded={isFlyoutOpen}
                              onClick={() => setActiveFlyout(isFlyoutOpen ? null : child.label)}
                              className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors min-h-[40px] ${
                                childActive || isFlyoutOpen
                                  ? "bg-orange-50 text-orange-700 font-bold"
                                  : "text-navy-900 hover:bg-orange-50 hover:text-orange-700"
                              }`}
                            >
                              <span>{child.label}</span>
                              <ChevronRight size={16} />
                            </button>

                            {isFlyoutOpen && (
                              <div className="absolute left-full top-0 pl-2 w-52 z-50">
                                <div className="rounded-2xl border border-line bg-white p-2 shadow-2xl">
                                  {child.children.map((sub) => {
                                    const subActive = pathname === sub.to;
                                    return (
                                      <Link
                                        key={sub.label}
                                        to={sub.to}
                                        className={`block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors min-h-[40px] flex items-center ${
                                          subActive
                                            ? "bg-orange-50 text-orange-700 font-bold"
                                            : "text-navy-900 hover:bg-orange-50 hover:text-orange-700"
                                        }`}
                                      >
                                        {sub.label}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden min-[1024px]:block">
            <AuthLink />
          </div>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-navy-900 hover:bg-canvas min-[1024px]:hidden transition-all focus:ring-2 focus:ring-orange-500"
            aria-label="Buka menu navigasi"
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 min-[1024px]:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-80 bg-surface p-6 shadow-2xl overflow-y-auto flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
                <span className="text-base font-extrabold text-navy-950">Menu Navigasi</span>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-600 hover:bg-canvas focus:ring-2 focus:ring-orange-500"
                  onClick={() => setOpen(false)}
                  aria-label="Tutup menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navigationConfig.map((item) => {
                  const hasChildren = item.children && item.children.length > 0;
                  const active = isItemActive(item);

                  if (!hasChildren) {
                    return (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors min-h-[44px] flex items-center ${
                          active ? "bg-orange-50 text-orange-700 font-extrabold" : "text-navy-900 hover:bg-canvas"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  }

                  return (
                    <div key={item.label} className="flex flex-col gap-1 py-1">
                      <div className={`px-4 py-2 text-sm font-bold ${active ? "text-orange-700" : "text-navy-950"}`}>
                        {item.label}
                      </div>
                      <div className="flex flex-col gap-1 pl-4 border-l-2 border-line ml-4">
                        {item.children.map((child) => {
                          const childHasChildren = child.children && child.children.length > 0;
                          const childActive = isItemActive(child);

                          if (!childHasChildren) {
                            return (
                              <Link
                                key={child.label}
                                to={child.to}
                                onClick={() => setOpen(false)}
                                className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors min-h-[40px] flex items-center ${
                                  childActive ? "bg-orange-50 text-orange-700 font-bold" : "text-ink-700 hover:bg-canvas"
                                }`}
                              >
                                {child.label}
                              </Link>
                            );
                          }

                          // Mobile nested accordion for Luaran submenu
                          return (
                            <div key={child.label} className="flex flex-col gap-1 py-1">
                              <div className={`px-3 py-2 text-sm font-semibold ${childActive ? "text-orange-700 font-bold" : "text-navy-900"}`}>
                                {child.label}
                              </div>
                              <div className="flex flex-col gap-1 pl-3 border-l-2 border-line ml-2">
                                {child.children.map((sub) => {
                                  const subActive = pathname === sub.to;
                                  return (
                                    <Link
                                      key={sub.label}
                                      to={sub.to}
                                      onClick={() => setOpen(false)}
                                      className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors min-h-[38px] flex items-center ${
                                        subActive ? "bg-orange-50 text-orange-700 font-bold" : "text-ink-600 hover:bg-canvas"
                                      }`}
                                    >
                                      {sub.label}
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line">
              <AuthLink onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
