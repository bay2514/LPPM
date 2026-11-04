import React, { useState, useMemo } from "react";
import * as Icons from "@shared/components/ui/Icons.jsx";
import Button from "@shared/components/ui/Button.jsx";
import StatusBadge from "./StatusBadge.jsx";

/**
 * ContentList: Komponen generik untuk menampilkan daftar item dalam format tabel
 * dengan fitur pencarian, filter status, sort, pagination, dan aksi CRUD.
 */
export default function ContentList({
  schema,
  items,
  onAdd,
  onEdit,
  onDelete,
  onDuplicate,
  onViewVersions,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const IconComponent = Icons[schema.icon] || Icons.FileText;

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const filteredItems = useMemo(() => {
    let result = items.filter((item) => {
      if (statusFilter !== "all") {
        const st = (item.status || "draf").toLowerCase();
        if (statusFilter === "published" && !["terbit", "published", "active"].includes(st)) return false;
        if (statusFilter === "draft" && !["draf", "draft", "inactive"].includes(st)) return false;
        if (statusFilter === "scheduled" && !["dijadwalkan", "scheduled"].includes(st)) return false;
      }
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return schema.searchableFields.some((fieldKey) => {
        const val = item[fieldKey];
        return val && String(val).toLowerCase().includes(q);
      });
    });

    result.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (va == null && vb == null) return 0;
      if (va == null) return sortDir === "asc" ? -1 : 1;
      if (vb == null) return sortDir === "asc" ? 1 : -1;
      if (typeof va === "number" && typeof vb === "number") {
        return sortDir === "asc" ? va - vb : vb - va;
      }
      const sa = String(va).toLowerCase();
      const sb = String(vb).toLowerCase();
      if (sa < sb) return sortDir === "asc" ? -1 : 1;
      if (sa > sb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [items, statusFilter, search, sortKey, sortDir, schema.searchableFields]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const pagedItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(pagedItems.map((it) => it.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with vibrant background card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 p-6 text-white shadow-xl">
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30">
              <IconComponent size={30} />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-orange-400 mb-1">
                MODUL MANAJEMEN KONTEN
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight">{schema.label.plural}</h1>
              <p className="text-xs text-gray-300">
                Pusat kontrol dan publikasi data {schema.label.plural.toLowerCase()} lembaga.
              </p>
            </div>
          </div>
          <Button onClick={onAdd} className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 px-5 py-3 rounded-xl font-bold flex items-center gap-2">
            <Icons.Plus size={18} /> Tambah {schema.label.singular}
          </Button>
        </div>
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-orange-500/10 blur-2xl pointer-events-none"></div>
      </div>

      {/* Filter Bar with richer styling */}
      <div className="flex flex-col gap-4 rounded-2xl bg-surface p-5 shadow-lg border border-line sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-ink-400">
            <Icons.Search size={18} />
          </span>
          <input
            type="text"
            placeholder={`Cari ${schema.label.plural.toLowerCase()} berdasarkan judul atau kata kunci...`}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-xl border border-line bg-canvas py-2.5 pl-11 pr-4 text-sm text-navy-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
          />
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm font-semibold text-navy-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          >
            <option value="all">Semua Status</option>
            <option value="published">Terbit / Aktif</option>
            <option value="draft">Draf / Nonaktif</option>
            <option value="scheduled">Dijadwalkan</option>
          </select>
          <div className="bg-navy-50 text-navy-800 px-3 py-2 rounded-xl border border-navy-100 text-xs font-bold">
            Total: {filteredItems.length}
          </div>
        </div>
      </div>

      {/* Mini stat strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Data", value: items.length, icon: Icons.Inbox, tone: "bg-navy-50 text-navy-700 border-navy-100" },
          {
            label: "Terbit",
            value: items.filter((i) => ["terbit", "published", "active"].includes(String(i.status || "").toLowerCase())).length,
            icon: Icons.CheckCircle2,
            tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
          },
          {
            label: "Draf",
            value: items.filter((i) => ["draf", "draft", "inactive"].includes(String(i.status || "draf").toLowerCase())).length,
            icon: Icons.FileText,
            tone: "bg-amber-50 text-amber-700 border-amber-100",
          },
          { label: "Hasil Filter", value: filteredItems.length, icon: Icons.Search, tone: "bg-orange-50 text-orange-700 border-orange-100" },
        ].map((s) => {
          const SIcon = s.icon || Icons.Inbox;
          return (
            <div key={s.label} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 shadow-card">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${s.tone}`}>
                <SIcon size={16} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-500">{s.label}</p>
                <p className="text-lg font-extrabold leading-tight text-navy-950">{s.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bulk action bar */}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
          <p className="text-xs font-bold text-orange-800">
            {selectedItems.length} item dipilih
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedItems([])}
              className="rounded-lg border border-orange-200 bg-white px-3 py-1.5 text-xs font-semibold text-orange-700 hover:bg-orange-100"
            >
              Bersihkan pilihan
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm(`Hapus ${selectedItems.length} item terpilih?`)) {
                  selectedItems.forEach((id) => onDelete(id));
                  setSelectedItems([]);
                }
              }}
              className="rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-orange-700"
            >
              Hapus terpilih
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-line bg-navy-50/50 text-xs font-bold uppercase text-navy-800 tracking-wider">
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={pagedItems.length > 0 && selectedItems.length === pagedItems.length}
                    className="rounded border-line text-orange-600 focus:ring-orange-500"
                  />
                </th>
                {schema.listColumns.map((col) => (
                  <th key={col.key} className="p-5 cursor-pointer select-none" onClick={() => handleSort(col.key)}>
                    <div className="flex items-center space-x-1">
                      <span>{col.label}</span>
                      {sortKey === col.key && (
                        sortDir === "asc" ? <Icons.ChevronUp size={14} /> : <Icons.ChevronDown size={14} />
                      )}
                    </div>
                  </th>
                ))}
                <th className="p-5 text-left">Editor</th>
                <th className="p-5 w-28 text-center">Status</th>
                <th className="p-5 w-40 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-sm text-ink-800">
              {pagedItems.length === 0 ? (
                <tr>
                  <td colSpan={schema.listColumns.length + 4} className="p-8 text-center text-ink-400">
                    Tidak ada data ditemukan.
                  </td>
                </tr>
              ) : (
                pagedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-canvas transition-colors group">
                    <td className="p-5">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectOne(item.id)}
                        className="rounded border-line text-orange-600 focus:ring-orange-500"
                      />
                    </td>
                    {schema.listColumns.map((col) => (
                      <td key={col.key} className="p-5 font-medium text-navy-900 truncate max-w-xs">
                        {col.key === "image" || col.key === "logo" ? (
                          <div className="h-12 w-12 overflow-hidden rounded-xl bg-canvas border border-line">
                            {item[col.key] ? (
                              <img src={item[col.key]} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[10px] text-ink-400">-</div>
                            )}
                          </div>
                        ) : (
                          item[col.key] || "-"
                        )}
                      </td>
                    ))}
                    <td className="p-5 text-xs text-ink-600">
                      {item.updatedBy || "Admin A"}
                    </td>
                    <td className="p-5 text-center">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {onViewVersions && (
                          <button
                            onClick={() => onViewVersions(item)}
                            title="Riwayat Versi"
                            className="rounded-lg p-2 text-ink-500 hover:bg-navy-50 hover:text-navy-800"
                          >
                            <Icons.BookOpen size={18} />
                          </button>
                        )}
                        {onDuplicate && (
                          <button
                            onClick={() => onDuplicate(item.id)}
                            title="Duplikat"
                            className="rounded-lg p-2 text-ink-500 hover:bg-navy-50 hover:text-navy-800"
                          >
                            <Icons.ExternalLink size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => onEdit(item)}
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        >
                          Sunting
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Yakin ingin menghapus item ini?")) {
                              onDelete(item.id);
                            }
                          }}
                          className="rounded-lg p-2 text-orange-600 hover:bg-orange-50"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-line px-4 py-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="inline-flex items-center rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-navy-800 hover:bg-canvas disabled:opacity-40"
            >
              <Icons.ChevronLeft size={16} className="mr-1" /> Sebelumnya
            </button>
            <span className="text-sm text-ink-500">
              Halaman <strong>{page}</strong> dari <strong>{totalPages}</strong>
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="inline-flex items-center rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-navy-800 hover:bg-canvas disabled:opacity-40"
            >
              Selanjutnya <Icons.ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
