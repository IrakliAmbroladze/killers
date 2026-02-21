import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import { MARGIN_X } from "@/pdf/constants/pdfPageDimensions";
import { Cursor } from "@/pdf/types/Cursor";
import { AcceptanceFormData } from "@/types";

type drawInpectionAreaTableProps = {
  drawer: PDFDrawer;
  cursor: Cursor;
  formData: AcceptanceFormData;
};

export const drawInpectionAreaTable = ({
  drawer,
  cursor,
  formData,
}: drawInpectionAreaTableProps) => {
  drawer.drawTable(MARGIN_X, cursor.y, {
    headers: [
      { text: "#", width: 20, align: "center" },
      { text: "გარე ტერიტორია", width: 400 },
    ],
    rows: [
      [
        { type: "text", text: "1", align: "center" },
        {
          type: "text",
          text:
            "ნაგვის ურნები შენობიდან მოშორებითაა" +
            drawer.drawCheckbox(500, cursor.y - 100, "crossed"),
        },
      ],
      [
        { type: "text", text: "2", align: "center" },
        {
          type: "text",
          text: "კედლებს კარებს ფანჯრებს საფეხმავლო ბილიკს და ტროტუარს არ აქვს ღიობები",
        },
      ],
    ],
  });
};
