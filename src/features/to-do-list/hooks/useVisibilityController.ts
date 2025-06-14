import { useReducer } from "react";
import { reducer } from "../utils/reducer";

const useVisibilityController = (initArg: number[] = [1]) => {
  const [visibleStatusArray, dispatch] = useReducer(reducer, initArg);
  return { visibleStatusArray, dispatch };
};

export default useVisibilityController;
