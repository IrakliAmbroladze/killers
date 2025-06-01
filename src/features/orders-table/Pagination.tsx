import { useFilteredOrders } from "@/hooks/useFilteredOrders";
import { useOrders } from "@/hooks/useOrders";

export const Pagination = () => {
  const { pageSize, currentPage, setCurrentPage } = useOrders();
  const { totalFiltered } = useFilteredOrders();

  return (
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
        disabled={currentPage * pageSize >= totalFiltered}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 dark:text-black"
      >
        Next
      </button>
    </div>
  );
};
