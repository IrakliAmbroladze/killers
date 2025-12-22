import { PDFPage } from "pdf-lib";
import { MARGIN_Y } from "../constants/pdfPageDimensions";

export function createCursor(page: PDFPage) {
  let y = page.getHeight() - MARGIN_Y;

  return {
    get y() {
      return y;
    },
    move(dy: number) {
      y -= dy;
    },
    ensureSpace(min = 80) {
      if (y < min) {
        return false;
      }
      return true;
    },
  };
}
