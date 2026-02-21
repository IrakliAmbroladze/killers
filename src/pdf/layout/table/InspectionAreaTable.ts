import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import { MARGIN_X, PAGE_WIDTH } from "@/pdf/constants/pdfPageDimensions";
import { Cursor } from "@/pdf/types/Cursor";
import { getCheckboxState } from "@/pdf/utils/getCheckboxState";
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
  const FIRST_COLUMN_WIDTH = 20;
  const SECOND_COLUMN_WIDTH = PAGE_WIDTH - MARGIN_X * 2 - FIRST_COLUMN_WIDTH;
  drawer.drawTable(MARGIN_X, cursor.y, {
    headers: [
      { text: "", width: FIRST_COLUMN_WIDTH, align: "center" },
      { text: "გარე ტერიტორია", width: SECOND_COLUMN_WIDTH, align: "center" },
    ],
    rows: [
      [
        { type: "text", text: "1", align: "center" },
        {
          type: "text",
          text: "ნაგვის ურნები შენობიდან მოშორებითაა     არის სათანადოდ მოწესრიგებული",
          align: "left",
        },
      ],
      [
        { type: "text", text: "2", align: "center" },
        {
          type: "text",
          text: "კედლებს კარებს ფანჯრებს საფეხმავლო ბილიკს და ტროტუარს არ აქვს ღიობები",
          align: "left",
        },
      ],
    ],
  });

  drawer.drawCheckbox(200, 20, getCheckboxState(formData.criteria["1.1"]));
};
