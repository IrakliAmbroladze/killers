"use client";
import React from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

const DndTest = () => {
  return (
    <>
      <div>DndTest</div>
      <DndContext>
        <Draggable>hello</Draggable>
        <Droppable>Droppable</Droppable>
      </DndContext>
    </>
  );
};

export default DndTest;
