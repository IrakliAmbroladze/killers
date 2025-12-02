"use client";

import { useState, useMemo } from "react";
import type { Customer } from "@/types";
import { ContractorStatus } from "./atoms/ContractorStatus";

type Props = {
  data: Customer[];
};

export default function CustomersTable({ data }: Props) {
  /* const testCustomer: Customer = {
    description: "something",
    id: "60001128531",
    name: "ambroladze",
    contractor: true,
  };*/

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
      <div className="flex flex-col items-center sm:flex-row justify-between gap-2 my-2">
        <h1 className="text-2xl font-semibold hidden sm:block">Customers</h1>
        {/* Search input */}
        <input
          className="border px-3 py-2 rounded w-64"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Pagination */}
        <div className="flex gap-2">
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
      {/* Table */}
      <div className="overflow-auto max-h-[450px]">
        <table className="min-w-full border-gray-300">
          <thead className="sticky top-0 bg-[#6b7280] dark:bg-[#19171c]">
            <tr>
              {["id", "name", "description", "contractor"].map((key) => (
                <th
                  key={key}
                  className=" border-x border-b px-3 py-2 text-left cursor-pointer select-none"
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
                  <ContractorStatus customer={c} />
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
      </div>
    </div>
  );
}
