import OrderTable from "@/features/order-table/components/OrderTable";
import { getOrders } from "@/lib/getOrders";
import * as Utils from "@/utils";

const TestPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const sParams = await searchParams;

  const fromDate = Utils.getValidDateParam(
    sParams,
    "fromDate",
    Utils.firstDayOfCurrentMonth
  );
  const toDate = Utils.getValidDateParam(sParams, "toDate", new Date());
  const { orders } = await getOrders({
    fromDate,
    toDate,
  });
  return (
    <div className="mt-12 w-full">
      <OrderTable orders={orders} />
    </div>
  );
};

export default TestPage;
