import { useState } from "react";
import HeroSection from "@public/components/sections/HeroSection.jsx";
import EventItem from "@public/components/sections/EventItem.jsx";
import { usePublicData } from "@shared/hooks/usePublicData.js";

const TABS = ["Semua", "Mendatang", "Selesai"];

export default function Kegiatan() {
  const [tab, setTab] = useState("Semua");
  const events = usePublicData("events");

  return (
    <>
      <HeroSection
        badge="Agenda LPPM"
        title="Kegiatan & Agenda"
        description="Jadwal lengkap kegiatan penelitian, seminar, workshop, dan pengabdian masyarakat."
        dark
      />

      <section className="bg-canvas py-10">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <div className="mb-8 flex gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-colors ${
                  tab === t
                    ? "bg-navy-800 text-white"
                    : "bg-surface border border-line text-ink-700 hover:bg-canvas"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {events.map((ev) => (
              <EventItem key={ev.id} event={ev} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
