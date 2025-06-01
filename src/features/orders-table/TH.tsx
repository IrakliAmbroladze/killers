import { useOrders } from "@/hooks/useOrders";
import { TableHeaders } from "@/types/orders-table/TableHeaders";

export const TH = ({ header }: { header: TableHeaders }) => {
  const { sort, setSort, setFilter } = useOrders();
  return (
    <div
      className="p-1 cursor-pointer"
      onClick={() => {
        const dir =
          sort?.column === "date" && sort?.direction === "asc" ? "desc" : "asc";
        setSort("date", dir);
      }}
    >
      {header.display}{" "}
      {sort?.column === "date" ? (sort.direction === "asc" ? "↑" : "↓") : ""}
      <input
        type="text"
        className="block mt-1 w-full text-xs border rounded px-1"
        onChange={(e) => setFilter("date", e.target.value)}
      />
    </div>
  );
};
