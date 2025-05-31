import { useReducer } from "react";
import { currentMonth } from "./utils";
import { Context } from "./Context";
import { reducer } from "./reducer";

export const MonthProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState = currentMonth;
  const [month, dispatch] = useReducer(reducer, initialState);

  const setMonth = (number: number) =>
    dispatch({ type: "SET_MONTH", payload: number });

  return (
    <Context.Provider value={{ month, setMonth }}>{children}</Context.Provider>
  );
};
