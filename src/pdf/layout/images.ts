import { PDFDrawer } from "../classes/PDFDrawer";
import { MARGIN_X, PAGE_WIDTH } from "../constants/pdfPageDimensions";
import { Cursor } from "../types/Cursor";
import { PDFImage } from "pdf-lib";

type DrawImapeProps = {
  drawer: PDFDrawer;
  cursor: Cursor;
  image: PDFImage;
};

export const drawLogo = async ({ drawer, cursor, image }: DrawImapeProps) => {
  const LOGO_HEIGHT = 65;
  cursor.move(LOGO_HEIGHT);
  drawer.drawImage(image, MARGIN_X - 22, cursor.y, {
    height: LOGO_HEIGHT,
  });
};

export const drawStamp = async ({ drawer, cursor, image }: DrawImapeProps) => {
  const STAMP_HEIGHT = 80;
  drawer.drawImage(image, PAGE_WIDTH / 2 - 20, cursor.y - 20, {
    height: STAMP_HEIGHT,
  });
};
