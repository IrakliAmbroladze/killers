import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
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
  drawer.drawText("გამოყენებული საშუალებები", x, y, {
    size: 9,
    bold: true,
  });
  const materialsRows: PdfTableCell[][] = formData.products.map((product) => [
    { type: "text", text: product.name },
    { type: "text", text: product.dosage },
    { type: "text", text: product.used },
  ]);

  const tableData2 = {
    headers: [
      { text: "დასახელება", width: 130 },
      { text: "დოზირება", width: 60 },
      { text: "გახარჯული", width: 70 },
    ],
    rows: materialsRows,
  };
  const productsTableHeight = drawer.drawTable(x, y, tableData2, {
    fontSize: 8,
    rowHeight: 18,
  });

  return { productsTableWidth: 260, productsTableHeight };
};
