import OrderTable from "@/features/order-table/components/OrderTable";
import { getOrders } from "@/lib/getOrders";
import React from "react";

const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

const TestPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const sParams = await searchParams;
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const fromDate =
    typeof sParams?.fromDate === "string"
      ? sParams.fromDate
      : formatDate(firstDayOfMonth);

  const toDate =
    typeof sParams?.toDate === "string" ? sParams.toDate : formatDate(today);

  const { orders, totalCount } = await getOrders({
    fromDate,
    toDate,
  });
  console.log(totalCount);
  console.log(fromDate, toDate);
  return (
    <div className="mt-12 w-full">
      <OrderTable orders={orders} />
    </div>
  );
};

export default TestPage;
