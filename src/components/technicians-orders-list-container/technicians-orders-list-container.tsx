"use client";
import SortOrders from "./SortOrders";
import { useOrders } from "@/hooks/useOrders";
import { filterByYearMonth } from "./utils/filterByYearMonth";
import { useMonth } from "@/hooks/useMonth";
import { useYear } from "@/hooks/useYear";

const TechniciansOrdersListCotainer = () => {
  const { orders } = useOrders();
  const { month } = useMonth();
  const { year } = useYear();

  const ordersFilteredByMonth = filterByYearMonth(orders, year, month);

  return <SortOrders orders={ordersFilteredByMonth} />;
};

export default TechniciansOrdersListCotainer;
