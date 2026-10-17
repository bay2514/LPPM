/**
 * Router Admin.
 * Rute admin dimuat secara lazy (React.lazy) agar tidak ikut
 * di-load oleh pengunjung publik.
 */

import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute, PublicOnlyRoute } from "@admin/auth/ProtectedRoute.jsx";

// Import lazy admin components
const Login = lazy(() => import("@admin/pages/auth/Login.jsx"));
const Layout = lazy(() => import("@admin/layouts/Layout.jsx"));
const Dashboard = lazy(() => import("@admin/pages/Dashboard.jsx"));
const News = lazy(() => import("@admin/pages/news/NewsList.jsx"));
const Events = lazy(() => import("@admin/pages/events/EventList.jsx"));
const Documents = lazy(() => import("@admin/pages/documents/DocumentList.jsx"));
const Collaborators = lazy(() => import("@admin/pages/collaborators/CollaboratorList.jsx"));
const Profile = lazy(() => import("@admin/pages/profile/ProfileEdit.jsx"));

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
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

        {/* Rute yang diproteksi */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="berita" element={<News />} />
                  <Route path="kegiatan" element={<Events />} />
                  <Route path="dokumen" element={<Documents />} />
                  <Route path="mitra" element={<Collaborators />} />
                  <Route path="profil" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}
