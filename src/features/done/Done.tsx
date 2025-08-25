import { OrderExtended } from "@/types";
import React, { JSX, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { GrInProgress } from "react-icons/gr";
import { normalizeOrder } from "../order-table/utils/normalize";
import { editOrder } from "@/lib";
import { proceduresPathName } from "@/app/protected/procedures/constants/proceduresPathName";
import { useOrderModal } from "@/hooks/useOrderModal";

const Done = ({
  order,
  isInModal = false,
}: {
  order: OrderExtended;

  isInModal?: boolean;
}): JSX.Element => {
  const { refreshOrder } = useOrderModal();

  const [done, setDone] = useState<boolean>(false);

  const date = new Date(order?.plan_time ?? "");

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const localDateString = `${year}-${month}-${day}`;
  useEffect(() => {
    if (!!order?.delivery_date) {
      setDone(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async () => {
    if (!order) return;

    if (!order.plan_time && !done) {
      alert("თარიღი არაა მითითებული");
      return;
    }

    const newDone = !done;
    setDone(newDone);

    const updatedOrder = normalizeOrder({
      ...order,
      delivery_date: newDone ? localDateString : null,
    });

    const result = await editOrder(updatedOrder, proceduresPathName);

    if (result.status === "OK" && isInModal) {
      await refreshOrder(order.id); // fetch updated order and update context
    }
  };

  if (!order) return <div>Order not found</div>;

  return (
    <button onClick={handleClick} className="text-xs ">
      {!!done ? <FaCheck /> : <GrInProgress />}
    </button>
  );
};

export default Done;
