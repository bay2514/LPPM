import PageHero from "@shared/components/ui/PageHero.jsx";
import OutputList from "@public/components/sections/OutputList.jsx";

export default function HKI() {
  return (
    <div className="bg-canvas min-h-screen">
      <PageHero 
        title="Hak Kekayaan Intelektual"
        description="Daftar paten, hak cipta, merek, dan desain industri yang telah didaftarkan oleh civitas akademika Universitas Tiga Serangkai."
        badge="Luaran"
      />
      <div className="mx-auto max-w-container px-4 md:px-8">
        <OutputList type="HKI" title="HKI" />
      </div>
    </div>
  );
}
