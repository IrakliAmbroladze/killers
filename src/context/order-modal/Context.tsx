import { createContext } from "react";
import type { Context as OMContext } from "@/types/order-modal/Context";

export const Context = createContext<OMContext | undefined>(undefined);
