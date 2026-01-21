import { PDFDrawer } from "../classes/PDFDrawer";
import { PAGE_WIDTH } from "../constants/pdfPageDimensions";
import { Cursor } from "../types/Cursor";
import { PDFImage } from "pdf-lib";

type DrawImapeProps = {
  drawer: PDFDrawer;
  cursor: Cursor;
  image: PDFImage;
};

export const drawLogo = async ({ drawer, cursor, image }: DrawImapeProps) => {
  drawer.drawImage(image, PAGE_WIDTH / 2 - 40, cursor.y, {
    width: 72,
    height: 54,
  });
  cursor.move(20);
};
