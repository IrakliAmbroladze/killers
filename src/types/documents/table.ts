export type UiTableCell =
  | { type: "text"; text: string }
  | {
      type: "checkbox";
      checked: boolean;
      pestName: string;
      field: "monitor" | "spray" | "gel";
    }
  | {
      type: "inputText";
      materialName: string;
      value: string;
    }
  | {
      type: "inventoryInputText";
      rowIndex: number;
      field: "name" | "price" | "quantity";
      value: string;
    };
