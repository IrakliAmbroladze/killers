import type { Action, State } from "@/types/order-modal/Reducer";

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN_ORDER":
      return { openOrderId: action.payload };
    case "CLOSE_ORDER":
      return { openOrderId: action.payload };
    default:
      return state;
  }
}
