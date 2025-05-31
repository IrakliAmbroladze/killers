import React from "react";
import { FiCopy, FiEdit } from "react-icons/fi";
import Cart from "@/components/cart";
import { useOrderModal } from "@/hooks/useOrderModal";
import { ReturnOrdersProps } from "@/types/orders-table/ReturnOrdersProps";
import { useFilteredOrders } from "@/hooks/useFilteredOrders";
import { useOrders } from "@/hooks/useOrders";

const ReturnOrders = ({
  pageSize,
  onSetStatus,
  onSetTitle,
  onOpenModal,
  modalIndex,
  currentPage,
  setCurrentPage,
  totalOrders,
}: ReturnOrdersProps) => {
  const { openOrder } = useOrderModal();
  const { filteredOrders, totalFiltered } = useFilteredOrders();
  const { sort, setSort, setFilter } = useOrders();
  const Pagination = () => (
    <div className="flex justify-center gap-2 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 dark:text-black"
      >
        Prev
      </button>
      <span>
        Page {currentPage} / {Math.ceil(totalFiltered / pageSize)}
      </span>
      <button
        disabled={currentPage * pageSize >= totalOrders}
        onClick={() => setCurrentPage(currentPage + 1)}
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
            <th
              className="p-1 cursor-pointer"
              onClick={() => {
                const dir =
                  sort?.column === "date" && sort?.direction === "asc"
                    ? "desc"
                    : "asc";
                setSort("date", dir);
              }}
            >
              Date{" "}
              {sort?.column === "date"
                ? sort.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
              <input
                type="text"
                className="block mt-1 w-full text-xs border rounded px-1"
                onChange={(e) => setFilter("date", e.target.value)}
              />
            </th>
            <th
              className="p-1 cursor-pointer"
              onClick={() => {
                const dir =
                  sort?.column === "customer" && sort?.direction === "asc"
                    ? "desc"
                    : "asc";
                setSort("customer", dir);
              }}
            >
              Customer{" "}
              {sort?.column === "customer"
                ? sort.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
              <input
                type="text"
                className="block mt-1 w-full text-xs border rounded px-1"
                onChange={(e) => setFilter("customer", e.target.value)}
              />
            </th>
            {/* <th
              className="p-1 cursor-pointer hidden lg:table-cell"
              onClick={() =>
                setSortConfig((prev) => {
                  if (prev?.key === "identity") {
                    return {
                      key: "identity",
                      direction: prev.direction === "asc" ? "desc" : "asc",
                    };
                  }
                  return { key: "identity", direction: "asc" };
                })
              }
            >
              Identity
              <input
                type="text"
                className="mt-1 block w-full text-xs p-1 rounded border"
                placeholder="Search..."
                value={filters.identity}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, identity: e.target.value }))
                }
              />
            </th>
            <th
              className="p-1 cursor-pointer"
              onClick={() =>
                setSortConfig((prev) => {
                  if (prev?.key === "address") {
                    return {
                      key: "address",
                      direction: prev.direction === "asc" ? "desc" : "asc",
                    };
                  }
                  return { key: "address", direction: "asc" };
                })
              }
            >
              Address
              <input
                type="text"
                className="mt-1 block w-full text-xs p-1 rounded border"
                placeholder="Search..."
                value={filters.address}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, address: e.target.value }))
                }
              />
            </th>
            <th
              className="p-1 cursor-pointer hidden lg:table-cell"
              onClick={() =>
                setSortConfig((prev) => {
                  if (prev?.key === "items") {
                    return {
                      key: "items",
                      direction: prev.direction === "asc" ? "desc" : "asc",
                    };
                  }
                  return { key: "items", direction: "asc" };
                })
              }
            >
              Items
              <input
                type="text"
                className="mt-1 block w-full text-xs p-1 rounded border"
                placeholder="Search..."
                value={filters.items}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, items: e.target.value }))
                }
              />
            </th>
            <th
              className="p-1 cursor-pointer hidden lg:table-cell"
              onClick={() =>
                setSortConfig((prev) => {
                  if (prev?.key === "total") {
                    return {
                      key: "total",
                      direction: prev.direction === "asc" ? "desc" : "asc",
                    };
                  }
                  return { key: "total", direction: "asc" };
                })
              }
            >
              Total
              <input
                type="text"
                className="mt-1 block w-full text-xs p-1 rounded border"
                placeholder="Search..."
                value={filters.total}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, total: e.target.value }))
                }
              />
            </th>
            <th
              className="p-1 cursor-pointer hidden lg:table-cell"
              onClick={() =>
                setSortConfig((prev) => {
                  if (prev?.key === "provider") {
                    return {
                      key: "provider",
                      direction: prev.direction === "asc" ? "desc" : "asc",
                    };
                  }
                  return { key: "provider", direction: "asc" };
                })
              }
            >
              Provider
              <input
                type="text"
                className="mt-1 block w-full text-xs p-1 rounded border"
                placeholder="Search..."
                value={filters.provider}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, provider: e.target.value }))
                }
              />
            </th>
            <th
              className="p-1 cursor-pointer hidden lg:table-cell"
              onClick={() =>
                setSortConfig((prev) => {
                  if (prev?.key === "seller") {
                    return {
                      key: "seller",
                      direction: prev.direction === "asc" ? "desc" : "asc",
                    };
                  }
                  return { key: "seller", direction: "asc" };
                })
              }
            >
              Seller
              <input
                type="text"
                className="mt-1 block w-full text-xs p-1 rounded border"
                placeholder="Search..."
                value={filters.seller}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, seller: e.target.value }))
                }
              />
            </th>
            <th
              className="p-1 cursor-pointer hidden lg:table-cell"
              onClick={() =>
                setSortConfig((prev) => {
                  if (prev?.key === "delivery_date") {
                    return {
                      key: "delivery_date",
                      direction: prev.direction === "asc" ? "desc" : "asc",
                    };
                  }
                  return { key: "delivery_date", direction: "asc" };
                })
              }
            >
              Delivery Date
              <input
                type="text"
                className="mt-1 block w-full text-xs p-1 rounded border"
                placeholder="Search..."
                value={filters.delivery}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, delivery: e.target.value }))
                }
              />
            </th>
            <th
              className="p-1 cursor-pointer"
              onClick={() =>
                setSortConfig((prev) => {
                  if (prev?.key === "technician") {
                    return {
                      key: "technician",
                      direction: prev.direction === "asc" ? "desc" : "asc",
                    };
                  }
                  return { key: "technician", direction: "asc" };
                })
              }
            >
              Tech.
              <input
                type="text"
                className="mt-1 block w-full text-xs p-1 rounded border"
                placeholder="Search..."
                value={filters.technician}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    technician: e.target.value,
                  }))
                }
              />
            </th>
            <th className="p-1">Doc.</th> */}
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
      <Pagination />
    </>
  );
};

export default ReturnOrders;
