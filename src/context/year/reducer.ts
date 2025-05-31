import { Action } from "@/types/year/Reducer";

export function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "SET_YEAR":
      return action.payload;
    default:
      return state;
  }
}
