import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import { SPACE_BETWEEN_TITLE_AND_TABLE } from "@/pdf/constants/tableData";
import { PdfTableCell, TableHeaderCell } from "@/pdf/types/Table";
import { AcceptanceFormData } from "@/types";

export const createPestsTable = ({
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
  const W_FIRST_COL = 80;
  const W_SECOND_COL = 60;
  const W_THIRD_COL = 60;
  const W_FOURTH_COL = 50;
  const pestsTableWidth =
    W_FIRST_COL + W_SECOND_COL + W_THIRD_COL + W_FOURTH_COL;

  drawer.drawText("გატარებული ღონისძიება", x, y, {
    size: 9,
    bold: true,
    align: "center",
    maxWidth: pestsTableWidth,
  });

  const rows: PdfTableCell[][] = formData.pests.map((pest) => [
    { type: "text", text: pest.name, align: "left" },
    { type: "checkbox", checked: pest.monitor },
    { type: "checkbox", checked: pest.spray },
    { type: "checkbox", checked: pest.gel },
  ]);

  const headers: TableHeaderCell[] = [
    { text: "მავნებელი", width: W_FIRST_COL, align: "center" },
    { text: "მონიტორი", width: W_SECOND_COL, align: "center" },
    { text: "სპრეი", width: W_THIRD_COL, align: "center" },
    { text: "გელი", width: W_FOURTH_COL, align: "center" },
  ];

  const tableData = {
    headers,
    rows,
  };

  const pestsTableHeight =
    drawer.drawTable(x, y - SPACE_BETWEEN_TITLE_AND_TABLE, tableData, {
      fontSize: 8,
      rowHeight: 18,
    }) + SPACE_BETWEEN_TITLE_AND_TABLE;

  return { pestsTableWidth, pestsTableHeight };
};
