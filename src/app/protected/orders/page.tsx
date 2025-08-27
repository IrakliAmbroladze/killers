import { headers } from "next/headers";

import OrderTable from "@/features/order-table/components/OrderTable";
import { getOrders } from "@/lib/getOrders";
import { ordersPathName } from "./constants/ordersPathName";
import { validateUrlForGettingOrders } from "@/utils";

const OrdersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
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
