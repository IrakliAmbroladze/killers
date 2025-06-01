import { useOrders } from "@/hooks/useOrders";
import { TableHeaders } from "@/types/orders-table/TableHeaders";
import { useThService } from "./utils/useThService";

export const TH = ({ header }: { header: TableHeaders }) => {
  const { sort, setSort, setFilter } = useOrders();
  const { handleClick } = useThService(sort, setSort, header);
  return (
    <>
      <div className="p-1 cursor-pointer" onClick={handleClick}>
        {header.display}
        {sort?.column === header.value
          ? sort.direction === "asc"
            ? "↑"
            : "↓"
          : ""}
      </div>
      <input
        type="text"
        className="block mt-1 w-full text-xs border rounded px-1"
        onChange={(e) => setFilter(header.value, e.target.value)}
      />
    </>
  );
};
