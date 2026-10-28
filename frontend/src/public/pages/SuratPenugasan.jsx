import { useState } from "react";
import PageHero from "@shared/components/ui/PageHero.jsx";
import { Search, Download, FileText, Calendar, User } from "@shared/components/ui/Icons.jsx";
import { useContent } from "@public/hooks/useContent";

export default function SuratPenugasan() {
  const [search, setSearch] = useState("");
  
  // Mock surat penugasan data since it's not in mock.js yet, or we can use a local array / content store
  const suratList = [
    {
      id: "SP-001/LPPM/2025",
      nomor: "012/UN.TSU/LPPM/SP/III/2025",
      tanggal: "10 Maret 2025",
      perihal: "Penugasan Pelaksanaan Penelitian Hibah Internal Dosen Tahun 2025",
      penerima: "Dr. Budi Santoso, M.Kom. (Ketua Tim)",
      kategori: "Penelitian",
      status: "Aktif"
    },
    {
      id: "SP-002/LPPM/2025",
      nomor: "013/UN.TSU/LPPM/SP/III/2025",
      tanggal: "08 Maret 2025",
      perihal: "Penugasan Pengabdian Kepada Masyarakat Desa Binaan Mandiri",
      penerima: "Siti Aminah, M.Pd. (Ketua Tim)",
      kategori: "Pengabdian",
      status: "Aktif"
    },
    {
      id: "SP-003/LPPM/2025",
      nomor: "014/UN.TSU/LPPM/SP/II/2025",
      tanggal: "25 Februari 2025",
      perihal: "Penugasan Pendampingan Penyusunan Proposal Hibah Dikti",
      penerima: "Prof. Dr. Bambang Sudarmanto",
      kategori: "Workshop",
      status: "Selesai"
    },
    {
      id: "SP-004/LPPM/2025",
      nomor: "015/UN.TSU/LPPM/SP/II/2025",
      tanggal: "15 Februari 2025",
      perihal: "Penugasan Reviewer Internal Proposal Penelitian Tahun 2025",
      penerima: "Tim Reviewer LPPM TSU",
      kategori: "Penelitian",
      status: "Selesai"
    }
  ];

  const filtered = suratList.filter(s => 
    s.nomor.toLowerCase().includes(search.toLowerCase()) ||
    s.perihal.toLowerCase().includes(search.toLowerCase()) ||
    s.penerima.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-canvas min-h-screen">
      <PageHero 
        title="Surat Penugasan"
        description="Daftar resmi surat penugasan penelitian, pengabdian masyarakat, dan penugasan struktural LPPM Universitas Tiga Serangkai."
        badge="Informasi Resmi"
      />

      <div className="mx-auto max-w-container px-4 py-12 md:px-8">
        {/* Search bar */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
            <input
              type="text"
              placeholder="Cari nomor surat, perihal, atau nama penerima..."
              className="w-full rounded-2xl border border-line bg-surface py-3 pl-12 pr-4 text-sm focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="text-sm font-semibold text-ink-500">
            Menampilkan {filtered.length} surat penugasan
          </div>
        </div>

        {/* List */}
        <div className="grid gap-6">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div 
                key={item.id}
                className="group rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="rounded-lg bg-orange-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-orange-700">
                        {item.kategori}
                      </span>
                      <span className={`rounded-lg px-2.5 py-0.5 text-xs font-bold ${item.status === 'Aktif' ? 'bg-teal-50 text-teal-700' : 'bg-canvas text-ink-500'}`}>
                        {item.status}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-ink-400">
                        <Calendar size={14} />
                        {item.tanggal}
                      </span>
                    </div>
                    
                    <h3 className="mb-2 text-lg font-bold text-navy-950 group-hover:text-orange-600 transition-colors">
                      {item.perihal}
                    </h3>
                    
                    <div className="mb-4 flex flex-wrap items-center gap-6 text-xs text-ink-600">
                      <span className="font-mono font-bold text-navy-800 bg-canvas px-2.5 py-1 rounded-lg border border-line">
                        {item.nomor}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={14} className="text-orange-500" />
                        {item.penerima}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <button className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:bg-orange-600 transition-all">
                      <Download size={16} />
                      Unduh SK
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-line bg-canvas p-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-ink-300">
                <FileText size={32} />
              </div>
              <h3 className="text-lg font-bold text-navy-900">Surat Penugasan Tidak Ditemukan</h3>
              <p className="text-sm text-ink-500">Coba gunakan kata kunci pencarian yang lain.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
