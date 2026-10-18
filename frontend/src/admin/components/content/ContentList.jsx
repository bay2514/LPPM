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
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
            <IconComponent size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">{schema.label.plural}</h1>
            <p className="text-sm text-ink-500">
              Kelola data {schema.label.plural.toLowerCase()} secara dinamis via skema terpusat.
            </p>
          </div>
        </div>
        <Button onClick={onAdd} className="bg-orange-600 hover:bg-orange-700 text-white">
          + Tambah {schema.label.singular}
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col gap-3 rounded-xl bg-surface p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-ink-400">
            <Icons.Search size={18} />
          </span>
          <input
            type="text"
            placeholder={`Cari ${schema.label.plural.toLowerCase()}...`}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-lg border border-line bg-white py-2 pl-10 pr-4 text-sm text-navy-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="rounded-lg border border-line bg-white px-3 py-2 text-sm text-navy-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="all">Semua Status</option>
            <option value="published">Terbit / Aktif</option>
            <option value="draft">Draf / Nonaktif</option>
            <option value="scheduled">Dijadwalkan</option>
          </select>
          <span className="text-xs text-ink-500">
            Total: <strong>{filteredItems.length}</strong> item
          </span>
        </div>
      </div>

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
                  <th key={col.key} className="p-4 cursor-pointer select-none" onClick={() => handleSort(col.key)}>
                    <div className="flex items-center space-x-1">
                      <span>{col.label}</span>
                      {sortKey === col.key && (
                        sortDir === "asc" ? <Icons.ChevronUp size={14} /> : <Icons.ChevronDown size={14} />
                      )}
                    </div>
                  </th>
                ))}
                <th className="p-4 w-28 text-center">Status</th>
                <th className="p-4 w-40 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-sm text-ink-800">
              {pagedItems.length === 0 ? (
                <tr>
                  <td colSpan={schema.listColumns.length + 3} className="p-8 text-center text-ink-400">
                    Tidak ada data ditemukan.
                  </td>
                </tr>
              ) : (
                pagedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-canvas transition-colors">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectOne(item.id)}
                        className="rounded border-line text-orange-600 focus:ring-orange-500"
                      />
                    </td>
                    {schema.listColumns.map((col) => (
                      <td key={col.key} className="p-4 font-medium text-navy-900 truncate max-w-xs">
                        {col.key === "image" || col.key === "logo" ? (
                          <div className="h-10 w-10 overflow-hidden rounded bg-canvas border border-line">
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
                    <td className="p-4 text-center">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {onViewVersions && (
                          <button
                            onClick={() => onViewVersions(item)}
                            title="Riwayat Versi"
                            className="rounded p-1.5 text-ink-500 hover:bg-navy-50 hover:text-navy-800"
                          >
                            <Icons.BookOpen size={16} />
                          </button>
                        )}
                        {onDuplicate && (
                          <button
                            onClick={() => onDuplicate(item.id)}
                            title="Duplikat"
                            className="rounded p-1.5 text-ink-500 hover:bg-navy-50 hover:text-navy-800"
                          >
                            <Icons.ExternalLink size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => onEdit(item)}
                          className="rounded p-1.5 text-blue-600 hover:bg-blue-50"
                        >
                          Sunting
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Yakin ingin menghapus item ini?")) {
                              onDelete(item.id);
                            }
                          }}
                          className="rounded p-1.5 text-orange-600 hover:bg-orange-50"
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
