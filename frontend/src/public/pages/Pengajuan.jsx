import { useState } from "react";
import { Link } from "react-router-dom";
import HeroSection from "@public/components/sections/HeroSection.jsx";
import { FileText, AlertCircle, Calendar, ChevronRight, CheckCircle2 } from "@shared/components/ui/Icons.jsx";
import { contentStore } from "@shared/lib/contentStore.js";

const STEPS = [
  { id: 1, label: "Informasi Dasar", icon: "FileText" },
  { id: 2, label: "Detail Usulan", icon: "Calendar" },
  { id: 3, label: "Dokumen Pendukung", icon: "FileText" },
];

export default function Pengajuan() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Penelitian",
    scheme: "Hibah Internal Dosen Pemula",
    abstract: "",
    keywords: "",
    fundingAmount: "15000000",
    leaderName: "",
    leaderEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.abstract) {
      alert("Mohon lengkapi Judul dan Abstrak usulan terlebih dahulu.");
      return;
    }

    // Simpan ke contentStore sebagai dokumen/usulan baru
    contentStore.create("documents", {
      title: formData.title,
      description: formData.abstract,
      category: "Usulan Proposal",
      fileType: "PDF",
      year: new Date().getFullYear(),
      size: "1.8 MB",
      status: "terbit",
      scheme: formData.scheme,
      keywords: formData.keywords,
    });

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-canvas pb-16">
      <HeroSection
        badge="Sistem Informasi LPPM"
        title="Pengajuan Usulan Baru"
        description="Lengkapi formulir di bawah ini untuk mengajukan usulan hibah penelitian atau pengabdian kepada masyarakat Universitas Tiga Serangkai."
        dark
      />

      <section className="mx-auto max-w-container px-4 md:px-6 lg:px-8 py-10">
        {submitted ? (
          <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-surface p-8 text-center shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10 text-teal-600">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-2xl font-extrabold text-navy-950 mb-2">Usulan Berhasil Dikirim!</h2>
            <p className="text-sm text-ink-600 mb-6">
              Terima kasih telah mengajukan proposal usulan tridharma. Usulan Anda dengan judul <strong>&quot;{formData.title}&quot;</strong> telah terdaftar dalam sistem dan akan segera melalui tahap review.
            </p>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setFormData({
                    title: "",
                    category: "Penelitian",
                    scheme: "Hibah Internal Dosen Pemula",
                    abstract: "",
                    keywords: "",
                    fundingAmount: "15000000",
                    leaderName: "",
                    leaderEmail: "",
                  });
                }}
                className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all"
              >
                Ajukan Proposal Lain
              </button>
              <Link
                to="/dokumen"
                className="rounded-xl border border-line bg-canvas px-6 py-3 text-sm font-bold text-navy-900 hover:bg-line/50 transition-all"
              >
                Lihat Daftar Dokumen
              </Link>
            </div>
          </div>
        ) : (
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
                            ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                            : step > s.id
                            ? "bg-teal-600 text-white"
                            : "bg-surface border border-line text-ink-500"
                        }`}
                      >
                        {step > s.id ? "✓" : s.id}
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          step === s.id ? "text-navy-950" : "text-ink-500"
                        }`}
                      >
                        {s.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 rounded-2xl bg-orange-500/10 p-4 border border-orange-500/20">
                  <div className="flex gap-3">
                    <AlertCircle size={18} className="shrink-0 text-orange-600" />
                    <p className="text-xs leading-relaxed text-orange-900">
                      Pastikan Anda sudah mengunduh dan membaca <strong>Panduan Penulisan Proposal</strong> sebelum mengisi formulir ini.
                    </p>
                  </div>
                </div>
              </nav>
            </aside>

            {/* Form Content */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-line bg-surface p-6 shadow-lg md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-bold text-navy-950">Informasi Dasar Usulan</h2>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="md:col-span-2">
                          <label className="mb-2 block text-sm font-semibold text-ink-900">Judul Usulan *</label>
                          <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Contoh: Pengembangan Sistem Monitoring Kualitas Air..."
                            className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-navy-950 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-ink-900">Kategori</label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-navy-950 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                          >
                            <option value="Penelitian">Penelitian</option>
                            <option value="Pengabdian Masyarakat">Pengabdian Masyarakat</option>
                          </select>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-ink-900">Skema Hibah</label>
                          <select
                            name="scheme"
                            value={formData.scheme}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-navy-950 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                          >
                            <option value="Hibah Internal Dosen Pemula">Hibah Internal Dosen Pemula</option>
                            <option value="Hibah Internal Kolaboratif">Hibah Internal Kolaboratif</option>
                            <option value="Program Kreativitas Mahasiswa">Program Kreativitas Mahasiswa</option>
                            <option value="Hibah Hilirisasi Inovasi">Hibah Hilirisasi Inovasi</option>
                          </select>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-ink-900">Ketua Pengusul</label>
                          <input
                            type="text"
                            name="leaderName"
                            value={formData.leaderName}
                            onChange={handleChange}
                            placeholder="Nama Lengkap beserta Gelar"
                            className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-navy-950 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-ink-900">Email Institusi</label>
                          <input
                            type="email"
                            name="leaderEmail"
                            value={formData.leaderEmail}
                            onChange={handleChange}
                            placeholder="nama@tsu.ac.id"
                            className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-navy-950 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-bold text-navy-950">Detail Usulan & Ringkasan</h2>
                      <div className="space-y-6">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-ink-900">Abstrak *</label>
                          <textarea
                            name="abstract"
                            rows={6}
                            required
                            value={formData.abstract}
                            onChange={handleChange}
                            placeholder="Tuliskan ringkasan / abstrak usulan Anda di sini..."
                            className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-navy-950 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                          ></textarea>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-sm font-semibold text-ink-900">Kata Kunci</label>
                            <input
                              type="text"
                              name="keywords"
                              value={formData.keywords}
                              onChange={handleChange}
                              placeholder="Pisahkan dengan koma (contoh: IoT, Pertanian, Monitoring)"
                              className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-navy-950 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-semibold text-ink-900">Usulan Dana (Rp)</label>
                            <input
                              type="number"
                              name="fundingAmount"
                              value={formData.fundingAmount}
                              onChange={handleChange}
                              placeholder="15000000"
                              className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-navy-950 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-bold text-navy-950">Dokumen Pendukung</h2>
                      <div className="space-y-6">
                        <div className="rounded-2xl border-2 border-dashed border-line p-8 text-center transition-colors hover:border-orange-400 bg-canvas">
                          <FileText size={40} className="mx-auto mb-4 text-orange-500" />
                          <h3 className="mb-1 text-sm font-bold text-navy-950">Unggah Berkas Proposal (.pdf)</h3>
                          <p className="mb-4 text-xs text-ink-500">Maksimal ukuran berkas 10MB</p>
                          <label className="cursor-pointer inline-flex items-center rounded-xl bg-navy-950 px-5 py-2.5 text-xs font-bold text-white hover:bg-navy-900 transition-all">
                            Pilih File PDF
                            <input type="file" accept=".pdf" className="hidden" />
                          </label>
                        </div>
                        <div className="rounded-2xl border-2 border-dashed border-line p-8 text-center transition-colors hover:border-orange-400 bg-canvas">
                          <FileText size={40} className="mx-auto mb-4 text-teal-600" />
                          <h3 className="mb-1 text-sm font-bold text-navy-950">Unggah RAB & Lampiran (.xlsx)</h3>
                          <p className="mb-4 text-xs text-ink-500">Gunakan template RAB resmi LPPM</p>
                          <label className="cursor-pointer inline-flex items-center rounded-xl bg-navy-950 px-5 py-2.5 text-xs font-bold text-white hover:bg-navy-900 transition-all">
                            Pilih File Excel
                            <input type="file" accept=".xlsx,.xls" className="hidden" />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-line pt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={step === 1}
                      className="rounded-xl px-6 py-3 text-sm font-bold text-ink-700 hover:bg-canvas disabled:opacity-50 transition-all"
                    >
                      Sebelumnya
                    </button>
                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-3 text-sm font-bold text-white hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                      >
                        Selanjutnya
                        <ChevronRight size={18} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="rounded-xl bg-teal-600 px-8 py-3 text-sm font-bold text-white hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 active:scale-95"
                      >
                        Kirim Usulan Sekarang
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
