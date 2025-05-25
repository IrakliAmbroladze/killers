import { useReducer } from "react";
import { Context } from "@/context/order-modal/Context";
import { reducer } from "@/context/order-modal/reducer";
import * as action from "./action";
import { State } from "@/types/order-modal/Reducer";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const initialState: State = {
    openOrderId: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const openOrder = (orderId: string) => dispatch(action.openOrder(orderId));
  const closeOrder = () => dispatch(action.closeOrder());

  return (
    <Context.Provider
      value={{ openOrderId: state.openOrderId, openOrder, closeOrder }}
    >
      {children}
    </Context.Provider>
  );
};
