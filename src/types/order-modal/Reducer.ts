import { OrderExtended } from "../Order";

type State = { openOrderId: string | null; order: OrderExtended | null };
type Action =
  | {
      type: "OPEN_ORDER";
      payload: { openOrderId: string; order: OrderExtended };
    }
  | { type: "CLOSE_ORDER"; payload: null };

export type { State, Action };
