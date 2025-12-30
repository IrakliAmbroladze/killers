export type TableHeaderCell = {
  text: string;
  width: number;
  rowspan?: number;
  colspan?: number;
};

export type PdfTableCell =
  | { type: "text"; text: string; colspan?: number }
  | { type: "checkbox"; checked: boolean; colspan?: number };
