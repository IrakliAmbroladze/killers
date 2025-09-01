import { useDraggable } from "@dnd-kit/core";
import React from "react";

export const Draggable = (props: { children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <div ref={setNodeRef} style={style} className="w-40 h-20 bg-blue-300">
      <button {...listeners} {...attributes}>
        {props.children}
      </button>
    </div>
  );
};
