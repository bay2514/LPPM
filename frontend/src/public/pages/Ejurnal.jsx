import React from "react";
import PageHero from "@shared/components/ui/PageHero.jsx";
import Container from "@shared/components/ui/Container.jsx";
import Card from "@shared/components/ui/Card.jsx";
import { ExternalLink } from "@shared/components/ui/ExternalLink.jsx";
import { externalLinksConfig } from "@shared/config/externalLinks.js";
import { initialJournalsData } from "@shared/config/journalsData.js";

import { contentStore } from "@shared/lib/contentStore.js";

export default function Ejurnal() {
  // Ambil data jurnal dari contentStore atau fallback ke initialJournalsData
  const journals = contentStore.getAll("journals") || initialJournalsData;
  const activeJournalsCount = journals.filter(j => j.aktif).length;

  const mainUrl = externalLinksConfig?.ejurnal?.main;
  const registerUrl = externalLinksConfig?.ejurnal?.register;
  const submitUrl = externalLinksConfig?.ejurnal?.submit;
  const guideUrl = externalLinksConfig?.ejurnal?.guide;

  return (
    <div className="min-h-screen bg-canvas pb-20">
      <PageHero
        title="Portal e-Jurnal TSU"
        subtitle="Pusat publikasi ilmiah, jurnal peer-review, dan akses artikel riset civitas akademika Universitas Tiga Serangkai."
        badge="Open Journal Systems (OJS)"
      >
        <div className="mt-8 flex flex-wrap gap-4 items-center justify-center">
          <ExternalLink
            url={mainUrl}
            className="px-6 py-3 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 shadow-lg transition-all"
            fallbackText="Portal Utama Belum Dikonfigurasi"
          >
            Kunjungi e-Jurnal TSU
          </ExternalLink>
          <ExternalLink
            url={submitUrl}
            className="px-6 py-3 rounded-xl border border-white/30 text-white font-bold hover:bg-white/10 transition-all"
            fallbackText="Kirim Naskah Belum Dikonfigurasi"
          >
            Kirim Naskah Online
          </ExternalLink>
        </div>
      </PageHero>

      <Container className="mt-12">
        {/* Statistik / Ringkasan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm">
            <div className="text-3xl font-extrabold text-navy-900 mb-1">{activeJournalsCount}</div>
            <div className="text-sm font-medium text-ink">Jurnal Ilmiah Terakreditasi</div>
          </div>
          <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm">
            <div className="text-3xl font-extrabold text-orange-600 mb-1">Open Access</div>
            <div className="text-sm font-medium text-ink">Akses Terbuka untuk Peneliti & Publik</div>
          </div>
          <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm">
            <div className="text-3xl font-extrabold text-navy-900 mb-1">OJS Standard</div>
            <div className="text-sm font-medium text-ink">Standar Pengelolaan Berbasis Elektronik</div>
          </div>
        </div>

        {/* Daftar Jurnal */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-navy-900">Daftar Jurnal Terbitan TSU</h2>
            <span className="text-sm text-ink font-medium">Total: {journals.length} Jurnal</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {journals.map((jurnal) => {
              const targetUrl = jurnal.archiveUrl || jurnal.url || mainUrl;
              return (
                <div key={jurnal.id} className="p-6 rounded-2xl bg-surface border border-line shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-navy-50 text-navy-800 border border-navy-100">
                        {jurnal.chip || "Resmi TSU"}
                      </span>
                      <span className="text-xs text-ink">{jurnal.nomorSK}</span>
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 mb-2">{jurnal.nama}</h3>
                    <p className="text-sm text-ink mb-4">{jurnal.bidang}</p>
                    <div className="text-xs text-ink mb-6">Periode Pengelola: {jurnal.periodePengelola}</div>
                  </div>
                  <div className="pt-4 border-t border-line flex items-center justify-between">
                    <span className="text-xs text-ink">Situs / OJS Jurnal</span>
                    <ExternalLink
                      url={targetUrl}
                      className="px-4 py-2 rounded-xl bg-navy-900 text-white font-bold hover:bg-navy-800 text-sm transition-all"
                      fallbackText="Tautan Jurnal Belum Diisi"
                    >
                      Lihat Edisi & Artikel
                    </ExternalLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alur Pengiriman Naskah */}
        <div className="p-8 rounded-2xl bg-surface border border-line shadow-lg mb-16">
          <h2 className="text-2xl font-extrabold text-navy-900 mb-6 text-center">Alur Pengiriman Naskah (Submission)</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-canvas border border-line text-center">
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center mx-auto mb-3">1</div>
              <div className="font-bold text-navy-900 text-sm mb-1">Panduan Penulis</div>
              <p className="text-xs text-ink mb-3">Baca template & gaya selingkung.</p>
              <ExternalLink url={guideUrl} className="text-xs text-orange-600 font-bold justify-center" fallbackText="Panduan Belum Diisi">Baca Panduan</ExternalLink>
            </div>
            <div className="p-4 rounded-xl bg-canvas border border-line text-center">
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center mx-auto mb-3">2</div>
              <div className="font-bold text-navy-900 text-sm mb-1">Daftar Akun OJS</div>
              <p className="text-xs text-ink mb-3">Registrasi sebagai Author di sistem.</p>
              <ExternalLink url={registerUrl} className="text-xs text-orange-600 font-bold justify-center" fallbackText="Daftar Belum Diisi">Daftar Akun</ExternalLink>
            </div>
            <div className="p-4 rounded-xl bg-canvas border border-line text-center">
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center mx-auto mb-3">3</div>
              <div className="font-bold text-navy-900 text-sm mb-1">Kirim Online</div>
              <p className="text-xs text-ink mb-3">Submit naskah via portal jurnal.</p>
              <ExternalLink url={submitUrl} className="text-xs text-orange-600 font-bold justify-center" fallbackText="Submit Belum Diisi">Kirim Naskah</ExternalLink>
            </div>
            <div className="p-4 rounded-xl bg-canvas border border-line text-center">
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center mx-auto mb-3">4</div>
              <div className="font-bold text-navy-900 text-sm mb-1">Review & Revisi</div>
              <p className="text-xs text-ink">Proses penelaahan oleh mitra bestari.</p>
            </div>
            <div className="p-4 rounded-xl bg-canvas border border-line text-center">
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center mx-auto mb-3">5</div>
              <div className="font-bold text-navy-900 text-sm mb-1">Published</div>
              <p className="text-xs text-ink">Artikel terbit dan ber-DOI.</p>
            </div>
          </div>
        </div>

        {/* CTA Bawah */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 text-white text-center shadow-xl">
          <h2 className="text-2xl font-extrabold mb-3">Siap Mempublikasikan Hasil Riset Anda?</h2>
          <p className="text-navy-200 mb-6 max-w-2xl mx-auto text-sm">
            Bergabunglah dengan ratusan akademisi dan peneliti lainnya yang telah mempublikasikan karya ilmiah terbaik mereka di portal e-Jurnal TSU.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <ExternalLink
              url={submitUrl || mainUrl}
              className="px-6 py-3 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 shadow-lg transition-all"
              fallbackText="Submit Belum Diisi"
            >
              Mulai Submission Sekarang
            </ExternalLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
