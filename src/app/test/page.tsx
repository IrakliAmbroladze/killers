import OrderTable from "@/features/order-table/components/OrderTable";
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
  console.log(totalCount);
  return (
    <div className="mt-14 w-full">
      <div>TestPage</div>
      <div>
        {orders.map((order) => (
          <div key={order.id}>
            <span>{order.created_at}</span>
            <span> - </span>
            <span>{order.customers.name}</span>
            <span> - </span>
            <span>{order.address}</span>
            <span>{order.payment_types.name}</span>
          </div>
        ))}
      </div>
      <OrderTable orders={orders} />
    </div>
  );
};

export default TestPage;
