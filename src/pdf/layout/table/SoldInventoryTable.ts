import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import { MARGIN_X, PAGE_WIDTH } from "@/pdf/constants/pdfPageDimensions";
import { Cursor } from "@/pdf/types/Cursor";
import { PdfTableCell } from "@/pdf/types/Table";
import { AcceptanceFormData } from "@/types";

type DrawSoldInventoryTable = {
  drawer: PDFDrawer;
  cursor: Cursor;
  formData: AcceptanceFormData;
  x: number;
};
export const drawSoldInventoryTable = ({
  drawer,
  cursor,
  formData,
  x,
}: DrawSoldInventoryTable) => {
  let cursor_y = cursor.y;
  cursor_y += 133;
  drawer.drawText("მიწოდებული ინვენტარი", x, cursor_y, {
    size: 9,
    bold: true,
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

  cursor_y -= 0;

  drawer.drawTable(x, cursor_y, tableData, {
    fontSize: 8,
    rowHeight: 18,
  });
};
