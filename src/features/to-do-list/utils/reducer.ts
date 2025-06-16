import { ActionType } from "../types/ActionType";

export const reducer = (state: number[], action: ActionType) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((status) => status !== action.payload);

    default:
      return state;
  }
};
