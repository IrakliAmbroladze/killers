"use client";
import type { Context as OContext } from "@/types/orders/Context";
import { createContext } from "react";

export const Context = createContext<OContext | undefined>(undefined);
