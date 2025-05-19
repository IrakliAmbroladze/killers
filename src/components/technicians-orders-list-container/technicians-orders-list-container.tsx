"use client";
import React from "react";
import { useOrders } from "@/context/orders-context";
import SortOrders from "./SortOrders";

const TechniciansOrdersListCotainer = () => {
  const orders = useOrders();

  return orders && <SortOrders orders={orders} />;
};

export default TechniciansOrdersListCotainer;
