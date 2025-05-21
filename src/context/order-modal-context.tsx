"use client";

import { createContext } from "react";
import type { ModalContextType } from "@/types/ModalContextType";

export const OrderModalContext = createContext<ModalContextType | undefined>(
  undefined
);
