import { PDFPage } from "pdf-lib";
import {
  PEST_TABLE_COL_WIDTHS,
  PEST_TABLE_COL_HEIGHT,
} from "../constants/pestTableCellSize";
import { MARGIN_X } from "../constants/pdfPageDimensions";

export const tableCell = (
  page: PDFPage,
  cursor: { y: number; move: (dy: number) => void },
  column: number,
  row: number,
) => {
  const x = MARGIN_X;
  const y = cursor.y;
  page.drawRectangle({
    x,
    y,
    width: PEST_TABLE_COL_WIDTHS[1],
    height: PEST_TABLE_COL_HEIGHT,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  drawer.drawText(
    "მონიტორი",
    MARGIN_X + PEST_TABLE_COL_WIDTHS[0],
    cursorY - PEST_TABLE_COL_HEIGHT * 1 - 15,
    {
      size: 10,
      bold: true,
    },
  );
};
