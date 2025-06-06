import { TaskType } from "@/types/Task";
import { Context } from "./Context";
import { useReducer } from "react";
import { reducer } from "./reducer";
import { createDispatcher } from "./actions/createDispatch";

export const Provider = ({
  initialCommentsQuantities,
  children,
}: {
  initialCommentsQuantities: TaskType[];
  children: React.ReactNode;
}) => {
  // 🔁 Transform array into Record<string, number>
  const initialMapped = initialCommentsQuantities.reduce(
    (acc: Record<string, number>, task) => {
      acc[task.id] = task.comments_num;
      return acc;
    },
    {}
  );

  const [state, dispatch] = useReducer(reducer, initialMapped);

  const increaseQuantity = createDispatcher(dispatch, "INCREASE");
  const decreaseQuantity = createDispatcher(dispatch, "DECREASE");

  return (
    <Context.Provider
      value={{ commentsQuantities: state, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </Context.Provider>
  );
};
