import { TableHeaders } from "@/types/orders-table/TableHeaders";
import { SetSort } from "@/types/orders/SetSort";
import { Sort } from "@/types/orders/Sort";

export const useThService = (
  sort: Sort,
  setSort: SetSort,
  header: TableHeaders
) => {
  const handleClick = () => {
    const dir =
      sort?.column === header.value && sort?.direction === "asc"
        ? "desc"
        : "asc";
    setSort(header.value, dir);
  };
  return { handleClick };
};
