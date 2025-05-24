type OrderModalState = {
  openOrderId: string | null;
};

export type OrderModalAction =
  | { type: "OPEN_ORDER"; payload: string }
  | { type: "CLOSE_ORDER" };

export function orderModalReducer(
  state: OrderModalState,
  action: OrderModalAction
): OrderModalState {
  switch (action.type) {
    case "OPEN_ORDER":
      return { openOrderId: action.payload };
    case "CLOSE_ORDER":
      return { openOrderId: null };
    default:
      return state;
  }
}
