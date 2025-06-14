import React from "react";
import { StatusType } from "../types/StatusType";

const ToDoHeader = ({
  status,
  onHandleClick,
}: {
  status: StatusType;
  onHandleClick: (e: React.MouseEvent) => void;
}) => {
  return (
    <button
      key={status.id}
      id={`${status.id}`}
      onClick={onHandleClick}
      style={{
        background: status.bg,
      }}
      className={`text-white 
        text-xs
            rounded-t-lg
            justify-center
            text-center
            p-1.5
            cursor-pointer
            active:scale-95
            ease-in-out
            transition-transform
            duration-150
            hover:scale-102

            `}
    >
      {status.name}
    </button>
  );
};

export default ToDoHeader;
