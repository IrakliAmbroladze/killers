"use client";
import { createContext } from "react";
import { ContextType } from "./types/Context";

export const Context = createContext<ContextType | undefined>(undefined);
