import React from "react";
import { FiCopy, FiEdit } from "react-icons/fi";
import Cart from "@/components/cart";
import { useOrderModal } from "@/hooks/useOrderModal";
import { TableProps } from "@/types/orders-table/TableProps";
import { useFilteredOrders } from "@/hooks/useFilteredOrders";
import { tableHeaders } from "@/constants/tableHeaders";
import { TH } from "./TH";
import { filterHidden } from "@/utils/filterHiddenHeader";

const Table = ({
  onSetStatus,
  onSetTitle,
  onOpenModal,
  modalIndex,
}: TableProps) => {
  const { openOrder } = useOrderModal();
  const { filteredOrders } = useFilteredOrders();

  return (
    <>
      <table className="min-w-full table-auto border border-collapse mt-4">
        <thead>
          <tr className="bg-gray-200 dark:bg-stone-800 text-left text-sm font-bold">
            <th className="p-1">View</th>
            <th className="p-1">Edit</th>
            <th className="p-1">Copy</th>
            {tableHeaders.filter(filterHidden).map((header) => (
              <th key={header.value}>
                <TH header={header} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((invoice) => (
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
    </>
  );
};

export default Table;
