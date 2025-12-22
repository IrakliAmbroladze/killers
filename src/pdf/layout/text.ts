import { PDFDrawer } from "../classes/PDFDrawer";
import { MARGIN_X, PAGE_WIDTH } from "../constants/pdfPageDimensions";
import { Cursor } from "../types/Cursor";

type drawDocTitleProps = {
  drawer: PDFDrawer;
  title: string;
  cursor: Cursor;
};

export const drawDocTitle = ({ drawer, title, cursor }: drawDocTitleProps) => {
  drawer.drawText(title, PAGE_WIDTH / 3, cursor.y, {
    size: 14,
    bold: true,
    align: "center",
    maxWidth: 0,
  });
  cursor.move(30);
};

type drawDateProps = {
  drawer: PDFDrawer;
  date: string;
  cursor: Cursor;
};

export const drawDate = ({ drawer, date, cursor }: drawDateProps) => {
  drawer.drawText(`თარიღი: ${date} (წწ.თ.დ)`, MARGIN_X, cursor.y, {
    size: 10,
  });
  cursor.move(25);
};
