import { headers } from "next/headers";

import OrderTable from "@/features/order-table/components/OrderTable";
import { ordersPathName } from "../constants";
import { getOrders } from "@/modules/orders/server";
import { validateUrlForGettingOrders } from "../utils/validateUrlForGettingOrders";

const OrdersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const params = searchParams;
  const header = await headers();

  validateUrlForGettingOrders(params, header, ordersPathName);
  const { fromDate, toDate } = params;
  const ordersPromise = getOrders({ fromDate, toDate } as {
    fromDate: string;
    toDate: string;
  });

  return <OrderTable ordersPromise={ordersPromise} />;
};

export default OrdersPage;
