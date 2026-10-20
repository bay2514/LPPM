import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import React from "react";
import { MemoryRouter } from "react-router-dom";

global.window = {
  location: { pathname: "/", href: "http://localhost/", origin: "http://localhost", protocol: "http:", host: "localhost", hostname: "localhost", port: "", search: "", hash: "" },
  history: { pushState: () => {}, replaceState: () => {}, go: () => {}, back: () => {}, forward: () => {} },
  matchMedia: () => ({ matches: false, addListener: () => {}, removeListener: () => {} }),
  addEventListener: () => {},
  removeEventListener: () => {},
};
global.document = {
  createElement: () => ({ style: {} }),
  body: { appendChild: () => {}, removeChild: () => {} },
  getElementById: () => null,
  addEventListener: () => {},
  removeEventListener: () => {},
};
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
};
global.sessionStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
};
global.navigator = { userAgent: "node.js" };

async function runSmokeTest() {
  console.log("Starting SSR smoke test for individual pages...");

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    root: "/root/proyek/LPPM/frontend",
  });

  try {
    const pages = [
      { name: "Home", path: "/src/public/pages/Home.jsx", route: "/" },
      { name: "Dashboard", path: "/src/public/pages/Dashboard.jsx", route: "/dashboard" },
      { name: "Penelitian", path: "/src/public/pages/Penelitian.jsx", route: "/penelitian" },
      { name: "Pengabdian", path: "/src/public/pages/Pengabdian.jsx", route: "/pengabdian" },
      { name: "Kerjasama", path: "/src/public/pages/Kerjasama.jsx", route: "/kerjasama" },
      { name: "Documents", path: "/src/public/pages/Documents.jsx", route: "/dokumen" },
      { name: "Luaran", path: "/src/public/pages/Luaran.jsx", route: "/luaran" },
      { name: "Kegiatan", path: "/src/public/pages/Kegiatan.jsx", route: "/kegiatan" },
      { name: "Berita", path: "/src/public/pages/Berita.jsx", route: "/berita" },
      { name: "Pengajuan", path: "/src/public/pages/Pengajuan.jsx", route: "/pengajuan" },
      { name: "Admin Login", path: "/src/admin/pages/auth/Login.jsx", route: "/admin/login" },
      { name: "Admin Dashboard", path: "/src/admin/pages/Dashboard.jsx", route: "/admin" },
    ];

    let errorsCount = 0;

    for (const p of pages) {
      try {
        const mod = await vite.ssrLoadModule(p.path);
        const Component = mod.default || mod;
        const html = renderToString(
          React.createElement(
            MemoryRouter,
            { initialEntries: [p.route] },
            React.createElement(Component)
          )
        );
        console.log(`[PASS] Page ${p.name} (${p.route}) rendered successfully (Length: ${html.length})`);
      } catch (err) {
        errorsCount++;
        console.error(`[FAIL] Page ${p.name} (${p.route}) threw error:`, err);
      }
    }

    await vite.close();
    if (errorsCount > 0) {
      console.error(`Smoke test finished with ${errorsCount} errors.`);
      process.exit(1);
    } else {
      console.log("All pages passed SSR smoke test successfully!");
      process.exit(0);
    }
  } catch (err) {
    console.error("Failed to run smoke test modules:", err);
    await vite.close();
    process.exit(1);
  }
}

runSmokeTest();
