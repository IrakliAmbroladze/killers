import * as action from "@/context/orders/action";

export type Action =
  | ReturnType<typeof action.deleteOrder>
  | ReturnType<typeof action.updateOrder>
  | ReturnType<typeof action.addOrder>
  | ReturnType<typeof action.setCurrentPage>
  | ReturnType<typeof action.setSearchTerm>
  | ReturnType<typeof action.setFilter>
  | ReturnType<typeof action.clearFilters>
  | ReturnType<typeof action.setSort>;
