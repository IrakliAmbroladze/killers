import { createContext } from "react";
import type { Context as MContext } from "@/types/month/Context";

export const Context = createContext<MContext | undefined>(undefined);
