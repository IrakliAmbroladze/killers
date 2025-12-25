export type TableCell =
  | { type: "text"; text: string; colspan?: number }
  | { type: "checkbox"; checked: boolean; colspan?: number };

export type TableHeaderCell = {
  text: string;
  width: number;
  rowspan?: number;
  colspan?: number;
};
