// hooks/useFilteredOrders.ts
import { useMemo } from "react";
import { useOrders } from "./useOrders";
import { wholeListSearch } from "@/utils/orders-table/wholeListSearch";

export const useFilteredOrders = () => {
  const { orders, searchTerm, filters, sort, currentPage, pageSize } =
    useOrders();

  const filtered = useMemo(() => {
    let result = [...orders];

    // General search
    if (searchTerm) {
      return wholeListSearch(result, searchTerm);
    }

    // Per-column filters
    for (const [key, value] of Object.entries(filters)) {
      result = result.filter((order) =>
        (order as any)[key]?.toLowerCase?.().includes(value.toLowerCase())
      );
    }

    // Sorting
    if (sort) {
      const { column, direction } = sort;
      result.sort((a, b) => {
        const aVal = a[column]?.toLowerCase?.() || "";
        const bVal = b[column]?.toLowerCase?.() || "";
        return direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }

    return result;
  }, [orders, searchTerm, filters, sort]);

  // Pagination
  const start = (currentPage - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return {
    filteredOrders: paginated,
    totalFiltered: filtered.length,
  };
};
