import { Link, useLocation } from "react-router-dom";
import { navigationConfig } from "@shared/config/navigation";

function findPath(items, pathname, parents = []) {
  for (const item of items) {
    if (item.to === pathname) {
      return [...parents, item];
    }
    if (item.children) {
      const found = findPath(item.children, pathname, [...parents, item]);
      if (found) return found;
    }
  }
  return null;
}

export default function Breadcrumb() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  const matched = findPath(navigationConfig, pathname);
  
  const crumbs = [{ label: "Beranda", to: "/" }];

  if (matched) {
    for (const m of matched) {
      if (m.to !== "/") {
        crumbs.push({ label: m.label, to: m.to === "#" ? "" : m.to });
      }
    }
  } else {
    const segments = pathname.split("/").filter(Boolean);
    let accum = "";
    segments.forEach((seg) => {
      accum += `/${seg}`;
      const label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ");
      crumbs.push({ label, to: accum });
    });
  }

  return (
    <nav aria-label="Breadcrumb" className="bg-canvas border-b border-line py-3">
      <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
        <ol className="flex items-center flex-wrap gap-2 text-xs md:text-sm font-semibold text-ink-600">
          {crumbs.map((crumb, idx) => {
            const isLast = idx === crumbs.length - 1;
            return (
              <li key={idx} className="flex items-center gap-2">
                {idx > 0 && <span className="text-ink-400">/</span>}
                {isLast || !crumb.to || crumb.to === "#" ? (
                  <span className="text-navy-950 font-bold" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link to={crumb.to} className="hover:text-orange-600 transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
