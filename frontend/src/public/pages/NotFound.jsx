import { Link } from "react-router-dom";
import { Search } from "@shared/components/ui/Icons.jsx";

export default function NotFound() {
  return (
    <section className="bg-canvas py-24">
      <div className="mx-auto max-w-container px-4 text-center md:px-6 lg:px-8">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-navy-50 text-navy-700">
          <Search size={36} />
        </div>
        <p className="text-sm font-bold uppercase tracking-widest text-orange-500">404</p>
        <h1 className="mt-2 text-3xl font-extrabold text-navy-800 md:text-4xl">Halaman tidak ditemukan</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-500">
          Halaman yang Anda cari mungkin sudah dipindahkan atau tidak tersedia lagi.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
}
