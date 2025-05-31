// Context.ts
import type { State } from "./State";
import type { ContextActions } from "./ContextActions";

export type Context = State & ContextActions;
