import { Action } from "@/types/month/Reducer";

export function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "SET_MONTH":
      return action.payload;
    default:
      return state;
  }
}
