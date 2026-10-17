import { useParams, Link } from "react-router-dom";
import { useContent } from "@public/hooks/useContent.js";
import { Search, Download, FileText, ChevronLeft, Calendar, AlertCircle } from "@shared/components/ui/Icons.jsx";

export default function DocumentDetail() {
  const { slug } = useParams();
  const documents = useContent("documents");
  const doc = documents.find((d) => d.slug === slug || String(d.id) === String(slug));

  if (!doc) {
    return (
      <section className="bg-canvas py-16">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <FileText size={48} className="mb-4 text-ink-500" />
            <h2 className="text-2xl font-bold text-navy-800">Dokumen tidak ditemukan</h2>
            <p className="mt-2 text-ink-500">Dokumen dengan slug {slug} tidak tersedia.</p>
            <Link
              to="/dokumen"
              className="mt-6 inline-flex items-center gap-2 text-orange-500 font-bold hover:underline"
            >
              <ChevronLeft size={18} />
              Kembali ke Pusat Unduhan
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white py-10 border-b border-line">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-ink-500">
            <ol className="flex items-center gap-1">
              <li><Link to="/" className="hover:text-orange-500">Beranda</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/dokumen" className="hover:text-orange-500">Pusat Unduhan</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-ink-700 truncate max-w-[200px] md:max-w-md">{doc.title}</li>
            </ol>
          </nav>
          <h1 className="text-2xl font-extrabold text-navy-800 md:text-3xl">{doc.title}</h1>
          <p className="mt-2 text-sm text-ink-500">{doc.description}</p>
        </div>
      </section>

      <section className="bg-canvas py-10">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-lg bg-surface p-6 shadow-card">
                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase text-orange-700">
                    {doc.category}
                  </span>
                  <span className="text-xs font-medium text-ink-500">{doc.fileType}</span>
                  <span className="text-xs font-medium text-ink-500">{doc.size}</span>
                  <span className="text-xs font-medium text-ink-500">{doc.year}</span>
                </div>

                <div className="mb-6 flex items-start gap-4 rounded-md bg-navy-50 p-4">
                  <AlertCircle size={20} className="mt-0.5 shrink-0 text-navy-700" />
                  <div className="text-sm text-navy-800">
                    <p className="font-semibold mb-1">Info Penggunaan</p>
                    <ul className="list-disc space-y-1 pl-5 text-ink-500">
                      <li>File ini untuk keperluan internal akademik dan penelitian</li>
                      <li>Dilarang keras memperjualbelikan atau mengubah isi dokumen tanpa izin</li>
                      <li>Pastikan Anda membaca panduan lengkap sebelum menggunakan template ini</li>
                    </ul>
                  </div>
                </div>

                <a
                  href={`#unduh-${doc.slug}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-6 py-3.5 text-base font-bold text-white hover:bg-orange-600 sm:w-auto"
                >
                  <Download size={20} />
                  Unduh Dokumen
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg bg-surface p-6 shadow-card">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink-500">Detail Dokumen</h3>
                <dl className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-line pb-2">
                    <dt className="text-ink-500">Kategori</dt>
                    <dd className="font-medium text-navy-800">{doc.category}</dd>
                  </div>
                  <div className="flex justify-between border-b border-line pb-2">
                    <dt className="text-ink-500">Tipe File</dt>
                    <dd className="font-medium text-navy-800">{doc.fileType}</dd>
                  </div>
                  <div className="flex justify-between border-b border-line pb-2">
                    <dt className="text-ink-500">Ukuran</dt>
                    <dd className="font-medium text-navy-800">{doc.size}</dd>
                  </div>
                  <div className="flex justify-between border-b border-line pb-2">
                    <dt className="text-ink-500">Tahun</dt>
                    <dd className="font-medium text-navy-800">{doc.year}</dd>
                  </div>
                  <div className="flex justify-between border-b border-line pb-2">
                    <dt className="text-ink-500">Terakhir diupdate</dt>
                    <dd className="font-medium text-navy-800">2025-03-15</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-lg bg-surface p-6 shadow-card">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink-500">Dokumen Terkait</h3>
                <ul className="space-y-3">
                  {documents.filter((d) => d.category === doc.category && d.slug !== slug).slice(0, 3).map((related) => (
                    <li key={related.id}>
                      <Link to={`/dokumen/${related.slug}`} className="group flex items-center gap-3 rounded-md p-2 hover:bg-surface">
                        <FileText size={16} className="shrink-0 text-navy-700" />
                        <div className="overflow-hidden">
                          <p className="truncate text-sm font-medium text-navy-800 group-hover:text-orange-500">{related.title}</p>
                          <p className="truncate text-xs text-ink-500">{related.year}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                  {documents.filter((d) => d.category === doc.category && d.slug !== slug).length === 0 && (
                    <p className="text-sm text-ink-500 italic">Tidak ada dokumen terkait.</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
