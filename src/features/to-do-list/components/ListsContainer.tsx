"use client";

import Header from "./Header";
import List from "./List";
import { StatusType } from "../types/StatusType";
import useListsContainer from "../hooks/useListsContainer";
import useVisibilityController from "../hooks/useVisibilityController";
import { OrderExtended } from "@/types";

const ListsContainer = ({
  status,
  orders,
}: {
  status: StatusType;
  orders: OrderExtended[];
}) => {
  const { visibleStatusArray, dispatch } = useVisibilityController();
  const { handleClick } = useListsContainer(visibleStatusArray, dispatch);
  return (
    <div className="flex flex-col w-80 shrink-0 bg-gray-100 dark:bg-gray-800 rounded-2xl p-2.5 ">
      <Header status={status} onHandleClick={handleClick} />
      {visibleStatusArray.includes(status.id) && (
        <List statusId={status.id} orders={orders} />
      )}
    </div>
  );
};

export default ListsContainer;
