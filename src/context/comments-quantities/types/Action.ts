export type Action =
  | { type: "INCREASE"; payload: string }
  | { type: "DECREASE"; payload: string };
