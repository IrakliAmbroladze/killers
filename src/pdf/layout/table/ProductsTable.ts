import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import {
  SPACE_BETWEEN_TITLE_AND_TABLE,
  W_FIRST_COL,
  W_SECOND_COL,
  W_THIRD_COL,
} from "@/pdf/constants/tableData";
import { PdfTableCell } from "@/pdf/types/Table";
import { AcceptanceFormData } from "@/types";

export const createProductsTable = ({
  drawer,
  x,
  y,
  formData,
}: {
  drawer: PDFDrawer;
  x: number;
  y: number;
  formData: AcceptanceFormData;
}) => {
  const productsTableWidth = W_FIRST_COL + W_SECOND_COL + W_THIRD_COL;
  drawer.drawText("გამოყენებული საშუალებები", x, y, {
    size: 9,
    bold: true,
    align: "center",
    maxWidth: productsTableWidth,
  });
  const materialsRows: PdfTableCell[][] = formData.products.map((product) => [
    { type: "text", text: product.name },
    { type: "text", text: product.dosage, align: "center" },
    { type: "text", text: product.used },
  ]);

  const tableData2 = {
    headers: [
      { text: "                დასახელება", width: W_FIRST_COL },
      { text: " დოზირება", width: W_SECOND_COL },
      { text: "  გახარჯული", width: W_THIRD_COL },
    ],
    rows: materialsRows,
  };
  const productsTableHeight =
    drawer.drawTable(x, y - SPACE_BETWEEN_TITLE_AND_TABLE, tableData2, {
      fontSize: 8,
      rowHeight: 18,
    }) + SPACE_BETWEEN_TITLE_AND_TABLE;

  return { productsTableWidth: 260, productsTableHeight };
};
