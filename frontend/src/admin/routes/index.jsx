/**
 * Router Admin.
 * Menggunakan nested routes standar React Router v6 dengan Outlet di Layout.
 */

import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute, PublicOnlyRoute } from "@admin/auth/ProtectedRoute.jsx";

// Import lazy admin components
const Login = lazy(() => import("@admin/pages/auth/Login.jsx"));
const Layout = lazy(() => import("@admin/layouts/Layout.jsx"));
const Dashboard = lazy(() => import("@admin/pages/Dashboard.jsx"));
const Profile = lazy(() => import("@admin/pages/profile/ProfileEdit.jsx"));
const ContentManagerPage = lazy(() => import("@admin/pages/content/ContentManagerPage.jsx"));

const DashboardSettingsPage = lazy(() => import("@admin/pages/dashboard/DashboardSettingsPage.jsx"));

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface">
    <div className="w-8 h-8 border-4 border-navy-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function AdminRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Rute tanpa proteksi: halaman login */}
        <Route
          path="login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />

        {/* Rute yang diproteksi dengan Layout dan Outlet */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="berita" element={<ContentManagerPage />} />
          <Route path="mitra" element={<ContentManagerPage />} />
          <Route path="kegiatan" element={<ContentManagerPage />} />
          <Route path="dokumen" element={<ContentManagerPage />} />
          <Route path="profil" element={<Profile />} />
          <Route path="dashboard-config" element={<DashboardSettingsPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
