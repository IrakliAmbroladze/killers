import { useReducer } from "react";
import { OrderModalContext } from "@/context/order-modal-context";
import { orderModalReducer } from "@/context/orderModalReducer";
import * as Action from "./orderModalActions";

export const OrderModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(orderModalReducer, {
    openOrderId: null,
  });

  const openOrder = (orderId: string) =>
    dispatch(Action.openOrderAction(orderId));
  const closeOrder = () => dispatch(Action.closeOrderAction());

  return (
    <OrderModalContext.Provider
      value={{ openOrderId: state.openOrderId, openOrder, closeOrder }}
    >
      {children}
    </OrderModalContext.Provider>
  );
};
