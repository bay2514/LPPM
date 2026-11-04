import { ROWS, EXTRA } from "./dashboardData.js";

export function rowsFor(tahun, prodi = "Semua Prodi") {
  const t = parseInt(tahun, 10);
  let filtered = ROWS.filter(r => r.tahun === t);
  if (prodi && prodi !== "Semua Prodi") {
    filtered = filtered.filter(r => r.prodi.toLowerCase() === prodi.toLowerCase());
  }
  return filtered;
}

export function totals(rows, tahun, prodi = "Semua Prodi") {
  const t = parseInt(tahun, 10);
  const sumPenelitian = rows.reduce((acc, r) => acc + r.penelitian, 0);
  const sumPkm = rows.reduce((acc, r) => acc + r.pkm, 0);
  const sumPublikasi = rows.reduce((acc, r) => acc + r.publikasi, 0);
  const sumHki = rows.reduce((acc, r) => acc + r.hki, 0);
  const sumDana = rows.reduce((acc, r) => acc + r.danaJuta, 0);

  const extraObj = (prodi === "Semua Prodi") ? (EXTRA[t] || { mitra: 0, desa: 0 }) : { mitra: "—", desa: "—" };

  return {
    penelitian: sumPenelitian,
    pkm: sumPkm,
    publikasi: sumPublikasi,
    hki: sumHki,
    danaJuta: sumDana,
    mitra: extraObj.mitra,
    desa: extraObj.desa,
  };
}

export function delta(tahun, prodi, kunci) {
  const currentRows = rowsFor(tahun, prodi);
  const prevRows = rowsFor(tahun - 1, prodi);

  const curTot = totals(currentRows, tahun, prodi);
  const prevTot = totals(prevRows, tahun - 1, prodi);

  const curVal = curTot[kunci];
  const prevVal = prevTot[kunci];

  if (typeof curVal !== "number" || typeof prevVal !== "number") {
    return { diff: 0, percent: 0, text: "—" };
  }

  const diff = curVal - prevVal;
  const percent = prevVal === 0 ? 0 : Math.round((diff / prevVal) * 100);
  const sign = diff > 0 ? "+" : "";
  return {
    diff,
    percent,
    text: `${sign}${diff} (${sign}${percent}%) dari tahun lalu`,
  };
}
