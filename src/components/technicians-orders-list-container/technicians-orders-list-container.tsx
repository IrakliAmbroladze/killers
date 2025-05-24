"use client";
import React from "react";
import SortOrders from "./SortOrders";
import { useOrders } from "@/hooks/useOrders";

const TechniciansOrdersListCotainer = () => {
  const { orders } = useOrders();

  return orders && <SortOrders orders={orders} />;
};

export default TechniciansOrdersListCotainer;
