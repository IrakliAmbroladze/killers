export type TableHeaderCell = {
  text: string;
  width: number;
  rowspan?: number;
  colspan?: number;
  align?: "left" | "center" | "right";
};

export type PdfTableCell =
  | {
      type: "text";
      text: string;
      colspan?: number;
      align?: "left" | "center" | "right";
    }
  | {
      type: "checkbox";
      checked: boolean;
      colspan?: number;
      align?: "left" | "center" | "right";
    };
