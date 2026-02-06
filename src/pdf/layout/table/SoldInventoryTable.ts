import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import { MARGIN_X } from "@/pdf/constants/pdfPageDimensions";
import { SPACE_BETWEEN_TITLE_AND_TABLE } from "@/pdf/constants/tableData";
import { Cursor } from "@/pdf/types/Cursor";
import { PdfTableCell } from "@/pdf/types/Table";
import { AcceptanceFormData } from "@/types";

type DrawSoldInventoryTable = {
  drawer: PDFDrawer;
  cursor: Cursor;
  formData: AcceptanceFormData;
};
export const drawSoldInventoryTable = ({
  drawer,
  formData,
  cursor,
}: DrawSoldInventoryTable) => {
  const W_FIRST_COL = 200;
  const W_SECOND_COL = 95;
  const W_THIRD_COL = 95;

  cursor.move(5);

  const soldInventoryTableWidth = W_FIRST_COL + W_SECOND_COL + W_THIRD_COL;
  drawer.drawText("მიწოდებული ინვენტარი", MARGIN_X, cursor.y, {
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
      {
        text: "                                დასახელება",
        width: W_FIRST_COL,
      },
      { text: "          ერთ.ფასი", width: W_SECOND_COL },
      { text: "        რაოდენობა", width: W_THIRD_COL },
    ],
    rows,
  };

  const table_height = drawer.drawTable(
    MARGIN_X,
    cursor.y - SPACE_BETWEEN_TITLE_AND_TABLE,
    tableData,
    {
      fontSize: 8,
      rowHeight: 18,
    },
  );
  const height = table_height + 9 + SPACE_BETWEEN_TITLE_AND_TABLE;
  const width = W_FIRST_COL + W_SECOND_COL + W_THIRD_COL;
  return [height, width];
};
