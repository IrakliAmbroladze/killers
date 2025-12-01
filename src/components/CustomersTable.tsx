"use client";

import { useState, useMemo } from "react";
import type { Customer } from "@/types";

type Props = {
  data: Customer[];
};

export default function CustomersTable({ data }: Props) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Customer>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const pageSize = 50;

  // ---- Search + Sorting + Pagination ----
  const processed = useMemo(() => {
    let filtered = data;

    // SEARCH
    if (search) {
      const searchTerm = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm) ||
          c.id.toLowerCase().includes(searchTerm),
      );
    }

    // SORT
    filtered = [...filtered].sort((a, b) => {
      const A = a[sortKey] ?? "";
      const B = b[sortKey] ?? "";

      if (A < B) return sortDir === "asc" ? -1 : 1;
      if (A > B) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [data, search, sortKey, sortDir]);

  // PAGINATION
  const totalPages = Math.ceil(processed.length / pageSize);
  const paginated = processed.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key: keyof Customer) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div>
      {/* Search input */}
      <input
        className="border px-3 py-2 rounded mb-4 w-64"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            {["id", "name", "description", "contractor"].map((key) => (
              <th
                key={key}
                className="border px-3 py-2 text-left cursor-pointer select-none"
                onClick={() => toggleSort(key as keyof Customer)}
              >
                {key.toUpperCase()}{" "}
                {sortKey === key ? (sortDir === "asc" ? "▲" : "▼") : ""}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginated.map((c) => (
            <tr key={c.id}>
              <td className="border px-3 py-2">{c.id}</td>
              <td className="border px-3 py-2">{c.name}</td>
              <td className="border px-3 py-2">{c.description ?? "-"}</td>
              <td className="border px-3 py-2">
                {c.contractor ? "Yes" : "No"}
              </td>
            </tr>
          ))}

          {paginated.length === 0 && (
            <tr>
              <td className="px-3 py-2 border text-center" colSpan={4}>
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex gap-2 mt-4">
        <button
          className="border px-3 py-1 rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="px-2 py-1">
          Page {page} / {totalPages}
        </span>

        <button
          className="border px-3 py-1 rounded disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
