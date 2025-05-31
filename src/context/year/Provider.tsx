import { useReducer } from "react";
import { Context } from "./Context";
import { reducer } from "./reducer";
import { currentYear } from "./utils";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const initialArg = currentYear;

  const [year, dispatch] = useReducer(reducer, initialArg);

  const setYear = (year: number) =>
    dispatch({ type: "SET_YEAR", payload: year });

  return (
    <Context.Provider value={{ year, setYear }}>{children}</Context.Provider>
  );
};
