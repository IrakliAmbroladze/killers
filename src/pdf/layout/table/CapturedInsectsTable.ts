import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import { MARGIN_X } from "@/pdf/constants/pdfPageDimensions";
import { Cursor } from "@/pdf/types/Cursor";
import { AcceptanceFormData } from "@/types";

type drawCapturedInsectsTableProps = {
  drawer: PDFDrawer;
  cursor: Cursor;
  formData: AcceptanceFormData;
};

export const drawCapturedInsectsTable = ({
  drawer,
  cursor,
  formData,
}: drawCapturedInsectsTableProps) => {
  drawer.drawTable(MARGIN_X, cursor.y, {
    headers: [
      { text: "N", width: 100, align: "center" },
      { text: "დაჭერილი", width: 200, align: "center" },
      { text: "შეიცვალა ფირფიტა", width: 100, align: "center" },
    ],
    rows: [
      [
        { type: "text", text: "დაჭერილი", align: "center" },
        {
          type: "text",
          text: "hi there",
          align: "left",
        },
      ],
    ],
  });
};
