"use client";

import type { ICellRendererParams } from "ag-grid-community";
import { editOrder } from "@/lib";
import { FaRegSave } from "react-icons/fa";
import type { OrderExtended } from "@/types/Order";
import { normalizeOrder } from "../utils/normalize";
import { ordersPathName } from "@/app/protected/orders/constants/ordersPathName";
import { useRouter } from "next/navigation";

export const SaveButton = (props: ICellRendererParams<OrderExtended>) => {
  const router = useRouter();
  const handleSave = async () => {
    const data = props.node.data;
    if (!data?.id) {
      throw new Error("Order id is absent");
    }

    const updatedOrder = normalizeOrder(data);

    const { message, status } = await editOrder(updatedOrder, ordersPathName);
    alert(message);

    if (status === "OK") {
      router.refresh();
    }
  };
  return (
    <button className="cursor-pointer" onClick={handleSave}>
      <FaRegSave />
    </button>
  );
};
