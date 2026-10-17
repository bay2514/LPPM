import { useState } from "react";
import { Link } from "react-router-dom";
import HeroSection from "@public/components/sections/HeroSection.jsx";
import { FileText, AlertCircle, Calendar, ChevronRight } from "@shared/components/ui/Icons.jsx";

const STEPS = [
  { id: 1, label: "Informasi Dasar", icon: "FileText" },
  { id: 2, label: "Detail Usulan", icon: "Calendar" },
  { id: 3, label: "Dokumen Pendukung", icon: "FileText" },
];

export default function Pengajuan() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    category: "Penelitian",
    scheme: "Hibah Internal",
    abstract: "",
    keywords: "",
    fundingAmount: "",
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <>
      <HeroSection
        badge="Sistem Informasi LPPM"
        title="Pengajuan Usulan Baru"
        description="Lengkapi formulir di bawah ini untuk mengajukan usulan hibah penelitian atau pengabdian masyarakat."
        dark
      />

      <section className="bg-canvas py-10">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar Steps */}
            <aside className="lg:col-span-1">
              <nav className="sticky top-6">
                <ul className="space-y-4">
                  {STEPS.map((s) => (
                    <li key={s.id} className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                          step === s.id
                            ? "bg-orange-500 text-white"
                            : step > s.id
                            ? "bg-teal-500 text-white"
                            : "bg-surface border border-line text-ink-500"
                        }`}
                      >
                        {step > s.id ? "✓" : s.id}
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          step === s.id ? "text-navy-800 font-bold" : "text-ink-500"
                        }`}
                      >
                        {s.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 rounded-lg bg-orange-50 p-4">
                  <div className="flex gap-3">
                    <AlertCircle size={18} className="shrink-0 text-orange-600" />
                    <p className="text-xs leading-relaxed text-orange-800">
                      Pastikan Anda sudah mengunduh dan membaca <strong>Panduan Penulisan Proposal</strong> sebelum mengisi formulir ini.
                    </p>
                  </div>
                </div>
              </nav>
            </aside>

            {/* Form Content */}
            <div className="lg:col-span-3">
              <div className="rounded-xl border border-line bg-surface p-6 shadow-card md:p-8">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <h2 className="text-lg font-bold text-navy-800">Informasi Dasar Usulan</h2>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="md:col-span-2">
                          <label className="mb-2 block text-sm font-semibold text-ink-900">Judul Usulan</label>
                          <input
                            type="text"
                            placeholder="Contoh: Pengembangan Sistem Monitoring Kualitas Air..."
                            className="w-full rounded-lg border border-line bg-canvas px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-ink-900">Kategori</label>
                          <select className="w-full rounded-lg border border-line bg-canvas px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500">
                            <option>Penelitian</option>
                            <option>Pengabdian Masyarakat</option>
                          </select>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-ink-900">Skema Hibah</label>
                          <select className="w-full rounded-lg border border-line bg-canvas px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500">
                            <option>Hibah Internal Dosen Pemula</option>
                            <option>Hibah Internal Kolaboratif</option>
                            <option>Program Kreativitas Mahasiswa</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <h2 className="text-lg font-bold text-navy-800">Detail Usulan</h2>
                      <div className="space-y-6">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-ink-900">Abstrak</label>
                          <textarea
                            rows={6}
                            placeholder="Tuliskan ringkasan usulan Anda di sini..."
                            className="w-full rounded-lg border border-line bg-canvas px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                          ></textarea>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-ink-900">Kata Kunci</label>
                          <input
                            type="text"
                            placeholder="Pisahkan dengan koma (contoh: IoT, Pertanian, Monitoring)"
                            className="w-full rounded-lg border border-line bg-canvas px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <h2 className="text-lg font-bold text-navy-800">Dokumen Pendukung</h2>
                      <div className="space-y-6">
                        <div className="rounded-lg border-2 border-dashed border-line p-8 text-center transition-colors hover:border-orange-300">
                          <FileText size={40} className="mx-auto mb-4 text-ink-500" />
                          <h3 className="mb-1 text-sm font-bold text-navy-800">Unggah Proposal (.pdf)</h3>
                          <p className="mb-4 text-xs text-ink-500">Maksimal ukuran file 10MB</p>
                          <button type="button" className="rounded-md bg-navy-800 px-4 py-2 text-xs font-bold text-white hover:bg-navy-700">
                            Pilih File
                          </button>
                        </div>
                        <div className="rounded-lg border-2 border-dashed border-line p-8 text-center transition-colors hover:border-orange-300">
                          <FileText size={40} className="mx-auto mb-4 text-ink-500" />
                          <h3 className="mb-1 text-sm font-bold text-navy-800">Unggah RAB (.xlsx)</h3>
                          <p className="mb-4 text-xs text-ink-500">Gunakan template yang sudah disediakan</p>
                          <button type="button" className="rounded-md bg-navy-800 px-4 py-2 text-xs font-bold text-white hover:bg-navy-700">
                            Pilih File
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-line pt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={step === 1}
                      className="rounded-lg px-6 py-2.5 text-sm font-bold text-ink-700 hover:bg-canvas disabled:opacity-50"
                    >
                      Sebelumnya
                    </button>
                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-2 rounded-lg bg-orange-500 px-8 py-2.5 text-sm font-bold text-white hover:bg-orange-600 transition-transform active:scale-95"
                      >
                        Selanjutnya
                        <ChevronRight size={18} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="rounded-lg bg-teal-600 px-8 py-2.5 text-sm font-bold text-white hover:bg-teal-700 transition-transform active:scale-95 shadow-lg shadow-teal-600/20"
                      >
                        Kirim Usulan
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
