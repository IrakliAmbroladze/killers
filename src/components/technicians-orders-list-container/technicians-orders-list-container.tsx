"use client";
import SortOrders from "./SortOrders";
import { useOrders } from "@/hooks/useOrders";
import { filterByMonth } from "./utils/filterByMonth";
import { useMonth } from "@/hooks/useMonth";

const TechniciansOrdersListCotainer = () => {
  const { orders } = useOrders();
  const { month } = useMonth();

  const ordersFilteredByMonth = filterByMonth(orders, month);

  return <SortOrders orders={ordersFilteredByMonth} />;
};

export default TechniciansOrdersListCotainer;
