import React from "react";
import { ActionType } from "../types/ActionType";

const useListsContainer = (
  visibleStatusArray: number[],
  dispatch: (action: ActionType) => void
) => {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const id = Number(target.id);
    return visibleStatusArray.includes(id)
      ? dispatch({ type: "REMOVE", payload: id })
      : dispatch({ type: "ADD", payload: id });
  };
  return { handleClick };
};

export default useListsContainer;
