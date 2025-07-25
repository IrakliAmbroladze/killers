import { useOrders } from "./useOrders";
import { useMonth } from "./useMonth";
import { useYear } from "./useYear";
import { filterByYearMonth } from "@/utils/filterByYearMonth";

const useOrdersFilteredByMonth = () => {
  const { orders } = useOrders();
  const { month } = useMonth();
  const { year } = useYear();
  return filterByYearMonth(orders, year, month);
};

export default useOrdersFilteredByMonth;
