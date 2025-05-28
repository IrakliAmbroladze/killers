"use client";
import SortOrders from "./SortOrders";
import { useOrders } from "@/hooks/useOrders";
import { filterCurrentMonth } from "./utils/filterCurrentMonth";

const TechniciansOrdersListCotainer = () => {
  const { orders } = useOrders();

  const currentMonthOrders = filterCurrentMonth(orders);

  return <SortOrders orders={currentMonthOrders} />;
};

export default TechniciansOrdersListCotainer;
