import { Sheets_Invoice } from "@/types/invoices";
import OrdersList from "@/components/orders-list";
import fetchOrders from "@/utils/server/fetch-orders";

const OrdersPage = async () => {
  const invoices: Sheets_Invoice[] = await fetchOrders();

  return (
    <ul className="space-y-4 flex-1 sm:px-5 pt-5 sm:pt-0">
      <OrdersList invoices={invoices} />;
    </ul>
  );
};

export default OrdersPage;
