import { createContext } from "react";
import type { Context as YContext } from "@/types/year/Context";

export const Context = createContext<YContext | undefined>(undefined);
