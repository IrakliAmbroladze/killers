import Orders from "@/features/orders-table/Orders";
import Link from "next/link";

const OrdersPage = async () => {
  return (
    <div className="w-full my-10">
      <ul className="space-y-4 flex-1 sm:px-5 pt-5 sm:pt-0">
        <div>
          <Link
            className="my-10 hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out bg-gray-300 text-black py-3 px-20 rounded-lg cursor-pointer"
            href="./orders/create-invoice"
          >
            create-invoice
          </Link>
        </div>
        <Orders />
      </ul>
    </div>
  );
};

export default OrdersPage;
