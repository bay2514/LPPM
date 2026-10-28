import PageHero from "@shared/components/ui/PageHero.jsx";
import OutputList from "@public/components/sections/OutputList.jsx";

export default function Buku() {
  return (
    <div className="bg-canvas min-h-screen">
      <PageHero 
        title="Buku & Karya Tulis"
        description="Koleksi buku ajar, buku referensi, dan monograf yang telah diterbitkan oleh dosen Universitas Tiga Serangkai."
        badge="Luaran"
      />
      <div className="mx-auto max-w-container px-4 md:px-8">
        <OutputList type="Buku" title="Buku" />
      </div>
    </div>
  );
}
