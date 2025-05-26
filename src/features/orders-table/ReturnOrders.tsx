import React from "react";
import { FiCopy, FiEdit } from "react-icons/fi";
import Cart from "@/components/cart";
import { useOrderModal } from "@/hooks/useOrderModal";
import { ReturnOrdersProps } from "@/types/orders-table/ReturnOrdersProps";

const ReturnOrders = ({
  onSetStatus,
  onSetTitle,
  onOpenModal,
  modalIndex,
  orders,
  currentPage,
  setCurrentPage,
  totalOrders,
}: ReturnOrdersProps) => {
  const { openOrder } = useOrderModal();
  const Pagination = () => (
    <div className="flex justify-center gap-2 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 dark:text-black"
      >
        Prev
      </button>
      <span>Page {currentPage}</span>
      <button
        disabled={currentPage * 25 >= totalOrders}
        onClick={() => setCurrentPage((p) => p + 1)}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 dark:text-black"
      >
        Next
      </button>
    </div>
  );
  return (
    <>
      <Pagination />
      <table className="min-w-full table-auto border border-collapse mt-4">
        <thead>
          <tr className="bg-gray-200 dark:bg-stone-800 text-left text-sm font-bold">
            <th className="p-1">View</th>
            <th className="p-1">Edit</th>
            <th className="p-1">Copy</th>
            <th className="p-1">Date</th>
            <th className="p-1">Customer</th>
            <th className="p-1 hidden lg:table-cell">Identity</th>
            <th className="p-1 ">Address</th>
            <th className="p-1 hidden lg:table-cell">Items</th>
            <th className="p-1 hidden lg:table-cell">Total</th>
            <th className="p-1 hidden lg:table-cell">Provider</th>
            <th className="p-1 hidden lg:table-cell">Seller</th>
            <th className="p-1 hidden lg:table-cell">Delivery Date</th>
            <th className="p-1">Tech.</th>
            <th className="p-1">Doc.</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((invoice) => (
            <tr
              key={invoice.order_id}
              className="border-b dark:border-stone-700 hover:bg-gray-100 dark:hover:bg-stone-900"
            >
              <td
                onClick={() => {
                  if (invoice.order_id) {
                    openOrder(invoice.order_id);
                  }
                }}
                className="p-2 cursor-pointer text-blue-600 hover:underline"
              >
                view
              </td>
              <td
                onClick={() => {
                  if (invoice.order_id) {
                    onOpenModal(
                      modalIndex === invoice.order_id ? null : invoice.order_id
                    );
                    onSetStatus("update");
                    onSetTitle("Edit Order");
                  }
                }}
                className="p-2 cursor-pointer text-blue-600 hover:underline"
              >
                <FiEdit />
              </td>
              <td
                onClick={() => {
                  if (invoice.order_id) {
                    onOpenModal(
                      modalIndex === invoice.order_id ? null : invoice.order_id
                    );
                    onSetStatus("add");
                    onSetTitle("Copy Order");
                  }
                }}
                className="p-2 cursor-pointer text-blue-600 hover:underline"
              >
                <FiCopy />
              </td>
              <Cart invoice={invoice} />
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </>
  );
};

export default ReturnOrders;
