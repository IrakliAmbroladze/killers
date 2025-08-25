import { useReducer } from "react";
import { Context } from "@/context/order-modal/Context";
import { reducer } from "@/context/order-modal/reducer";
import * as action from "./action";
import { State } from "@/types/order-modal/Reducer";
import { createClient } from "@/utils/supabase/client";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const initialState: State = {
    openOrderId: null,
    order: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // const openOrder = (orderId: string) => dispatch(action.openOrder(orderId));
  const closeOrder = () => dispatch(action.closeOrder());

  async function openOrder(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
      *,
      customers(id, name, description),
      payment_types(id, name),
      providers(id, name),
      employees(id, display_name, role_id)
    `
      )
      .eq("id", id)
      .single();

    if (!error && data) {
      // dispatch({ type: "OPEN_ORDER", payload: data });
      dispatch(action.openOrder(id, data));
    }
  }

  async function refreshOrder(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
      *,
      customers(id, name, description),
      payment_types(id, name),
      providers(id, name),
      employees(id, display_name, role_id)
    `
      )
      .eq("id", id)
      .single();

    if (!error && data) {
      // dispatch({ type: "OPEN_ORDER", payload: data });
      dispatch(action.openOrder(id, data));
    }
  }

  return (
    <Context.Provider
      value={{
        openOrderId: state.openOrderId,
        openOrder,
        closeOrder,
        order: state.order,
        refreshOrder,
      }}
    >
      {children}
    </Context.Provider>
  );
};
