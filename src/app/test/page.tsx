// /test/page.ts

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import OrderTable from "@/features/order-table/components/OrderTable";
import { getOrders } from "@/lib/getOrders";
import * as Utils from "@/utils";

const TestPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  if (!Utils.hasValidDateRangeQuery(params)) {
    const pathname = (await headers()).get("x-url")?.split("?")[0] ?? "/test";
    const redirectUrl = Utils.getRedirectWithValidDateRange(pathname, params);
    redirect(redirectUrl);
  }

  const { fromDate, toDate } = params;
  const { orders } = await getOrders({ fromDate, toDate } as {
    fromDate: string;
    toDate: string;
  });

  return (
    <div className="mt-12 w-full">
      <OrderTable orders={orders} />
    </div>
  );
};

export default TestPage;
