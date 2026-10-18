import React from "react";

export default function StatusBadge({ status }) {
  const normalized = (status || "draf").toLowerCase();

  switch (normalized) {
    case "terbit":
    case "published":
    case "active":
      return (
        <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 border border-green-200">
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
          Terbit
        </span>
      );

    case "dijadwalkan":
    case "scheduled":
      return (
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200">
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
          Dijadwalkan
        </span>
      );

    case "draf":
    case "draft":
    case "inactive":
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700 border border-gray-200">
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-gray-400" />
          Draf
        </span>
      );
  }
}
