export type TableCell =
  | { type: "text"; text: string; colspan?: number }
  | { type: "checkbox"; checked: boolean; colspan?: number };
