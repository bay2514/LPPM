import HeroSection from "@public/components/sections/HeroSection.jsx";
import { collaborators } from "@shared/lib/mock.js";

export default function Kerjasama() {
  return (
    <>
      <HeroSection
        badge="Kemitraan Strategis"
        title="Kerjasama & Kolaborator"
        description="Jejaring kemitraan LPPM Universitas Tiga Serangkai bersama industri, pemerintah, dan perguruan tinggi lainnya."
        dark
      />

      <section className="bg-canvas py-10">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {collaborators.map((c) => (
              <div
                key={c.id}
                className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface p-6 text-center shadow-card transition-transform hover:-translate-y-1"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy-50 text-xl font-black text-navy-800">
                  {c.name.substring(0, 2).toUpperCase()}
                </div>
                <h3 className="text-base font-bold text-navy-800">{c.name}</h3>
                <span className="mt-1 rounded-full bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold uppercase text-orange-700">
                  {c.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
