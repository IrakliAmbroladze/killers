type State = { openOrderId: string | null };
type Action =
  | { type: "OPEN_ORDER"; payload: string }
  | { type: "CLOSE_ORDER"; payload: null };

export type { State, Action };
