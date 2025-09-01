import { useDroppable } from "@dnd-kit/core";
import React from "react";

export const Droppable = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    background: isOver ? "green" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      className={`w-[400px] h-[400px] bg-yellow-500 ${
        isOver ? "bg-green-300" : undefined
      } `}
      style={style}
    >
      {props.children}
    </div>
  );
};
