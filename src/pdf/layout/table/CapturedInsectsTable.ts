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
      { text: "", width: 100, align: "center" },
      { text: "header", width: 200, align: "center" },
    ],
    rows: [
      [
        { type: "text", text: "first text", align: "center" },
        {
          type: "text",
          text: "hi there",
          align: "left",
        },
      ],
    ],
  });
};
