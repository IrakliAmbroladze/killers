"use client";
import React from "react";
import SortOrders from "./SortOrders";
import { useOrders } from "@/hooks/useOrders";
import { filterCurrentMonth } from "./utils/filterCurrentMonth";

const TechniciansOrdersListCotainer = () => {
  const { orders } = useOrders();
  const cureentMonthOrders = filterCurrentMonth(orders);

  return cureentMonthOrders && <SortOrders orders={cureentMonthOrders} />;
};

export default TechniciansOrdersListCotainer;
