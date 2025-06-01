import React from "react";
import { FiCopy, FiEdit } from "react-icons/fi";
import Cart from "@/components/cart";
import { TableProps } from "@/types/orders-table/TableProps";
import { useFilteredOrders } from "@/hooks/useFilteredOrders";
import { tableHeaders } from "@/constants/tableHeaders";
import { TH } from "./TH";
import { filterHidden } from "@/utils/filterHiddenHeader";
import { tableHeadersExtra } from "@/constants/tableHeadersExtra";
import { useTableRowActions } from "./hooks/useTableRowActions";

const Table = ({
  onSetStatus,
  onSetTitle,
  onOpenModal,
  modalIndex,
}: TableProps) => {
  const { filteredOrders } = useFilteredOrders();
  const { handleView, handleEdit, handleCopy } = useTableRowActions({
    modalIndex,
    onOpenModal,
    onSetStatus,
    onSetTitle,
  });

  const actions = [
    {
      key: "view",
      label: "view",
      onClick: handleView,
      content: "view",
    },
    {
      key: "edit",
      label: "edit",
      onClick: handleEdit,
      content: <FiEdit />,
    },
    {
      key: "copy",
      label: "copy",
      onClick: handleCopy,
      content: <FiCopy />,
    },
  ];

  return (
    <>
      <table className="min-w-full table-auto border border-collapse mt-4">
        <thead>
          <tr className="bg-gray-200 dark:bg-stone-800 text-left text-sm font-bold">
            {tableHeadersExtra.map((header) => (
              <th key={header} className="p-1">
                {header}
              </th>
            ))}
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
              {actions.map(({ key, onClick, content }) => (
                <td
                  key={key}
                  onClick={() => invoice.order_id && onClick(invoice.order_id)}
                  className="p-2 cursor-pointer text-blue-600 hover:underline"
                >
                  {content}
                </td>
              ))}
              <Cart invoice={invoice} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
