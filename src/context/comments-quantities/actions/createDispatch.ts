import { Dispatch } from "react";
import { Action } from "../types/Action";

type ActionType = "INCREASE" | "DECREASE";

export const createDispatcher =
  <T extends ActionType>(dispatch: Dispatch<Action>, type: T) =>
  (payload: string) =>
    dispatch({ type, payload });
