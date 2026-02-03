import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import { AcceptanceFormData } from "@/types";

type DrawTimeAndAddress = {
  drawer: PDFDrawer;
  formData: AcceptanceFormData;
  x: number;
  y: number;
};

export const drawTimeAndAddress = ({
  drawer,
  formData,
  x,
  y,
}: DrawTimeAndAddress) => {
  const initial_y = y;
  y -= 30;
  drawer.drawText("დაწყების დრო:", x, y, {
    size: 9,
    bold: true,
  });
  drawer.drawText(formData.startTime, x + 80, y, { size: 9 });
  y -= 12;

  drawer.drawText("დასრულების დრო:", x, y, {
    size: 9,
    bold: true,
  });
  drawer.drawText(formData.endTime, x + 100, y, { size: 9 });
  y -= 18;

  drawer.drawText("ობიექტის მისამართი:", x, y, {
    size: 9,
    bold: true,
  });
  y -= 18;

  drawer.drawParagraph(formData.address, x, y, 150, {
    size: 9,
    lineHeight: 1.3,
  });
  const usedHeight = initial_y - y;

  return [usedHeight];
};
