import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import {
  SPACE_BETWEEN_TITLE_AND_TABLE,
  W_FIRST_COL,
  W_SECOND_COL,
  W_THIRD_COL,
} from "@/pdf/constants/tableData";
import { Cursor } from "@/pdf/types/Cursor";
import { PdfTableCell } from "@/pdf/types/Table";
import { AcceptanceFormData } from "@/types";

type DrawSoldInventoryTable = {
  drawer: PDFDrawer;
  cursor: Cursor;
  formData: AcceptanceFormData;
  x: number;
  y: number;
};
export const drawSoldInventoryTable = ({
  drawer,
  formData,
  x,
  y,
}: DrawSoldInventoryTable) => {
  const soldInventoryTableWidth = W_FIRST_COL + W_SECOND_COL + W_THIRD_COL;
  drawer.drawText("მიწოდებული ინვენტარი", x, y, {
    size: 9,
    bold: true,
    align: "center",
    maxWidth: soldInventoryTableWidth,
  });

  const rows: PdfTableCell[][] = formData.inventory.map((item) => [
    { type: "text", text: item.name },
    { type: "text", text: item.price },
    { type: "text", text: item.quantity },
  ]);

  const tableData = {
    headers: [
      { text: "დასახელება", width: 130 },
      { text: "ერთ.ფასი", width: 60 },
      { text: "რაოდენობა", width: 70 },
    ],
    rows,
  };

  drawer.drawTable(x, y - SPACE_BETWEEN_TITLE_AND_TABLE, tableData, {
    fontSize: 8,
    rowHeight: 18,
  });
};
