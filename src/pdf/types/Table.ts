export type TableCell =
  | { type: "text"; text: string }
  | {
      type: "checkbox";
      checked: boolean;
      pestName: string;
      field: "monitor" | "spray" | "gel";
    };

export type TableHeaderCell = {
  text: string;
  width: number;
  rowspan?: number;
  colspan?: number;
};
