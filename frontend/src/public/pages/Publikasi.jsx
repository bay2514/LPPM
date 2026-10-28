import PageHero from "@shared/components/ui/PageHero.jsx";
import OutputList from "@public/components/sections/OutputList.jsx";

export default function Publikasi() {
  return (
    <div className="bg-canvas min-h-screen">
      <PageHero 
        title="Publikasi Ilmiah"
        description="Daftar artikel ilmiah yang telah diterbitkan pada jurnal nasional terakreditasi maupun internasional bereputasi."
        badge="Luaran"
      />
      <div className="mx-auto max-w-container px-4 md:px-8">
        <OutputList type="Publikasi" title="Publikasi" />
      </div>
    </div>
  );
}
