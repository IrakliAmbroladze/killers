export type TableCell =
  | { type: "text"; text: string; colspan?: number }
  | {
      type: "checkbox";
      checked: boolean;
      pestName?: string;
      field?: "monitor" | "spray" | "gel";
      colspan?: number;
    }
  | {
      type: "inputText";
      materialName: string;
      value: string;
      colspan?: number;
    }
  | {
      type: "inventoryInputText";
      rowIndex: number;
      field: "name" | "price" | "quantity";
      value: string;
      colspan?: number;
    };

export type TableHeaderCell = {
  text: string;
  width: number;
  rowspan?: number;
  colspan?: number;
};
