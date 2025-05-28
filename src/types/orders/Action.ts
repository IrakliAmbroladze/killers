import {
  addOrder,
  setCurrentPage,
  setSearchTerm,
  updateOrder,
} from "@/context/orders/action";

export type Action =
  | ReturnType<typeof updateOrder>
  | ReturnType<typeof addOrder>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setSearchTerm>;
