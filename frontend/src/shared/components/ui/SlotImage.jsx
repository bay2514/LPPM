import { useState, useEffect } from "react";
import { getSlot } from "@shared/config/imageSlots.js";
import { Image as ImageIcon } from "@shared/components/ui/Icons.jsx";

/**
 * Komponen untuk menampilkan gambar dari slot konfigurasi dengan fallback placeholder.
 * 
 * @param {string} slot - Kunci slot dari imageSlots.js
 * @param {string} alt - Teks alternatif opsional (menimpa bawaan slot)
 * @param {string} className - Kelas CSS tambahan
 * @param {boolean} priority - Jika true, loading="eager" dan fetchpriority="high"
 */
export default function SlotImage({ slot: slotKey, alt, className = "", priority = false, ...props }) {
  const slot = getSlot(slotKey);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset state jika slot berubah
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [slotKey]);

  if (!slot) {
    return <div className={`bg-navy-900 ${className}`} style={{ aspectRatio: "16/9" }} />;
  }

  const finalAlt = alt || slot.alt;
  const isProd = import.meta.env.PROD;

  const renderPlaceholder = () => (
    <div 
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-navy-800 to-navy-950 text-white/20 ${className}`}
      style={{ aspectRatio: slot.ratio }}
    >
      {/* Pola halus */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      
      <ImageIcon size={48} strokeWidth={1} className="mb-2 opacity-20" />
      
      {!isProd && (
        <div className="text-center px-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{slotKey}</p>
          <p className="text-[9px] text-white/30">{slot.width} &times; {slot.height}</p>
        </div>
      )}
    </div>
  );

  if (hasError) {
    return renderPlaceholder();
  }

  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: slot.ratio }}>
      <img
        src={slot.src}
        alt={finalAlt}
        className={`h-full w-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
        width={slot.width}
        height={slot.height}
        loading={priority ? "eager" : "lazy"}
        fetchpriority={priority ? "high" : undefined}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        {...props}
      />
      {!isLoaded && renderPlaceholder()}
    </div>
  );
}
