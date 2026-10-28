import PageHero from "@shared/components/ui/PageHero.jsx";
import OutputList from "@public/components/sections/OutputList.jsx";

export default function Monograf() {
  return (
    <div className="bg-canvas min-h-screen">
      <PageHero 
        title="Monograf Ilmiah"
        description="Publikasi ilmiah dalam bentuk monograf yang menyajikan hasil penelitian mendalam pada satu topik spesifik."
        badge="Luaran"
      />
      <div className="mx-auto max-w-container px-4 md:px-8">
        <OutputList type="Monograf" title="Monograf" />
      </div>
    </div>
  );
}
