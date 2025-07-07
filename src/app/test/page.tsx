import { getOrders } from "@/lib/getOrders";
import React from "react";

const TestPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { page, pageSize } = await searchParams;
  const { orders, totalCount } = await getOrders(
    Number(page),
    Number(pageSize)
  );
  console.log(orders[0]);
  console.log(totalCount);
  return (
    <div className="mt-14">
      <div>TestPage</div>
      <div>
        {orders.map((order) => (
          <div key={order.id}>
            <span>{order.created_at}</span>
            <span> - </span>
            <span>{order.customers.name}</span>
            <span> - </span>
            <span>{order.address}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestPage;
