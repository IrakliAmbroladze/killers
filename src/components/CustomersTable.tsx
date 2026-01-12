"use client";

import { useState, useMemo } from "react";
import type { Customer } from "@/types";
import { ContractorStatus } from "./atoms/ContractorStatus";
import { editCustomer } from "@/lib/editCustomer";

type Props = {
  data: Customer[];
};

export default function CustomersTable({ data }: Props) {
  const [customers, setCustomers] = useState<Customer[]>(data);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Customer>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const pageSize = 50;

  // ---- Search + Sorting + Pagination ----
  const processed = useMemo(() => {
    let filtered = customers;

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
  }, [customers, search, sortKey, sortDir]);

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

  const handleEdit = (customer: Customer) => {
    setEditingId(customer.id);
    setEditedName(customer.name);
    setEditedDescription(customer.description ?? "");
  };

  const handleSave = async (customer: Customer) => {
    // Store previous values for rollback
    const previousName = customer.name;
    const previousDescription = customer.description;

    const updatedCustomer = {
      ...customer,
      name: editedName,
      description: editedDescription || null,
    };

    // Optimistic update - update state immediately
    setCustomers((prev) =>
      prev.map((c) => (c.id === customer.id ? updatedCustomer : c)),
    );

    setEditingId(null);
    setIsSaving(true);

    try {
      const response = await editCustomer(updatedCustomer);

      if (response.status !== "OK") {
        throw new Error("Update failed");
      }
    } catch (error) {
      // Rollback on error
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === customer.id
            ? {
                ...customer,
                name: previousName,
                description: previousDescription,
              }
            : c,
        ),
      );
      console.error("Update failed:", error);
      alert("❌ დაფიქსირდა შეცდომა");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedName("");
    setEditedDescription("");
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
              <th className="border-x border-b px-3 py-2 text-left">ACTION</th>
              {["id", "name", "description", "contractor"].map((key) => (
                <th
                  key={key}
                  className="border-x border-b px-3 py-2 text-left cursor-pointer select-none"
                  onClick={() => toggleSort(key as keyof Customer)}
                >
                  {key.toUpperCase()}{" "}
                  {sortKey === key ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((c) => {
              const isEditing = editingId === c.id;

              return (
                <tr key={c.id}>
                  <td className="border px-3 py-2">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <button
                          className="text-green-600 hover:text-green-800 disabled:opacity-50"
                          onClick={() => handleSave(c)}
                          disabled={isSaving}
                        >
                          {isSaving ? "..." : "Save"}
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-800"
                          onClick={handleCancel}
                          disabled={isSaving}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleEdit(c)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                  <td className="border px-3 py-2">{c.id}</td>
                  <td className="border px-3 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        className="border px-2 py-1 rounded w-full"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    ) : (
                      c.name
                    )}
                  </td>
                  <td className="border px-3 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        className="border px-2 py-1 rounded w-full"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                      />
                    ) : (
                      (c.description ?? "-")
                    )}
                  </td>
                  <td className="border px-3 py-2">
                    <ContractorStatus customer={c} />
                  </td>
                </tr>
              );
            })}

            {paginated.length === 0 && (
              <tr>
                <td className="px-3 py-2 border text-center" colSpan={5}>
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
