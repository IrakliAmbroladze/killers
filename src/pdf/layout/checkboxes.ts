import { PDFPage } from "pdf-lib";
import { MARGIN_X, PAGE_WIDTH } from "../constants/pdfPageDimensions";
import { Services } from "../types/SanitaryServices";
import { Cursor } from "../types/Cursor";
import { PDFDrawer } from "../classes/PDFDrawer";

type drawServicesCheckBoxesProps = {
  services: Services[];
  page: PDFPage;
  cursor: Cursor;
  drawer: PDFDrawer;
};
export const drawServicesCheckBoxes = ({
  services,
  page,
  cursor,
  drawer,
}: drawServicesCheckBoxesProps) => {
  const colWidth = (PAGE_WIDTH - MARGIN_X * 2) / 3;
  services.forEach((service, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const xPos = MARGIN_X + 100 + col * colWidth;
    const yPos = cursor.y - row * 20;

    service.field.addToPage(page, {
      x: xPos,
      y: yPos,
      width: 10,
      height: 10,
    });
    if (service.checked) {
      service.field.check();
    }
    drawer.drawText(service.label, xPos + 15, yPos, { size: 10 });
  });

  cursor.move(Math.ceil(services.length / 2) * 20 + 15);
};
