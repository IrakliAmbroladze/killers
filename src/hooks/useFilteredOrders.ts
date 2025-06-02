// hooks/useFilteredOrders.ts
import { useMemo } from "react";
import { useOrders } from "./useOrders";
import { wholeListSearch } from "@/utils/orders-table/wholeListSearch";
import { FilterableKeys } from "@/types/FilterableKeys";
import { tableHeaders } from "@/constants/tableHeaders";
import { Sheets_Invoice } from "@/types/invoices";

export const useFilteredOrders = () => {
  const { orders, searchTerm, filters, sort, currentPage, pageSize } =
    useOrders();

  const filtered = useMemo(() => {
    let result = [...orders];

    // General search
    if (searchTerm) {
      return wholeListSearch(result, searchTerm);
    }

    for (const [key, value] of Object.entries(filters)) {
      if (
        tableHeaders.map((h) => h.value).includes(key as keyof Sheets_Invoice)
      ) {
        result = result.filter((order) =>
          (order[key as FilterableKeys] as string)
            ?.toLowerCase()
            .includes(value.toLowerCase())
        );
      }
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
