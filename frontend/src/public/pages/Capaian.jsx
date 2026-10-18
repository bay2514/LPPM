import { useContent } from "@public/hooks/useContent.js";
import { useAdminAuth } from "@admin/auth/auth.js";
import { TrendingUp, Award, BookOpen, Flask, Edit3, Eye } from "@shared/components/ui/Icons.jsx";
import { useNavigate } from "react-router-dom";

export default function Capaian() {
  const config = useContent("dashboard_config")[0] || {};
  const dataKinerja = useContent("performance_data");
  const programs = useContent("programs");
  const { user } = useAdminAuth();
  const navigate = useNavigate();

  // Mode otomatis: hitung dari data kinerja
  // Mode manual: ambil dari config.manualKpi
  const kpiData = config.kpiMode === "manual" ? config.manualKpi : [
    { label: "Penelitian", value: dataKinerja.reduce((acc, curr) => acc + (curr.research_count || 0), 0) },
    { label: "PKM", value: dataKinerja.reduce((acc, curr) => acc + (curr.pkm_count || 0), 0) },
    { label: "Publikasi", value: dataKinerja.reduce((acc, curr) => acc + (curr.publication_count || 0), 0) },
    { label: "HKI", value: dataKinerja.reduce((acc, curr) => acc + (curr.hki_count || 0), 0) },
  ];

  return (
    <>
      {user && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => navigate("/admin/dashboard-config")}
            className="flex items-center gap-2 rounded-full bg-orange-600 px-6 py-3 font-bold text-white shadow-lg hover:bg-orange-700 transition-all"
          >
            <Edit3 size={18} />
            Ubah Bagian Ini
          </button>
        </div>
      )}

      <section className="border-b border-line bg-white py-10">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-navy-800 md:text-4xl">{config.title || "Dashboard Capaian"}</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-500 md:text-base">{config.intro}</p>
          <p className="mt-4 text-xs text-ink-400">
            {config.updatedLabel || "Terakhir diperbarui pada"}: {new Date(config.lastUpdated || Date.now()).toLocaleDateString("id-ID")}
          </p>
        </div>
      </section>

      <section className="bg-canvas py-10">
        <div className="mx-auto max-w-container space-y-8 px-4 md:px-6 lg:px-8">
          {/* Widget Kartu KPI */}
          {config.widgets?.find(w => w.id === "kpi")?.visible && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {kpiData.map((k, idx) => (
                <div key={idx} className="rounded-lg border border-line bg-surface p-6 shadow-card">
                  <div className="text-xs font-bold uppercase tracking-wider text-ink-500">{k.label}</div>
                  <div className="mt-2 text-4xl font-extrabold text-navy-800">{k.value.toLocaleString("id-ID")}</div>
                </div>
              ))}
            </div>
          )}
          
          {/* Poin Cara Membaca */}
          <div className="rounded-lg border border-line bg-white p-6">
            <h3 className="font-bold text-navy-950 mb-3">Cara Membaca Dashboard Ini:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-ink-700">
              {config.howToRead?.map((point, idx) => <li key={idx}>{point}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}