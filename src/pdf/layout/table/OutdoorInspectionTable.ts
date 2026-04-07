import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import { getCheckboxState } from "@/pdf/utils/getCheckboxState";
import { AcceptanceFormData } from "@/types";

type drawInpectionTableProps = {
  drawer: PDFDrawer;
  x: number;
  y: number;
  formData: AcceptanceFormData;
  FIRST_COLUMN_WIDTH: number;
  SECOND_COLUMN_WIDTH: number;
  title: string;
  areas: string[];
  checkboxes: { x: number; y: number; criteria: string }[];
};
export const drawInpectionTable = ({
  drawer,
  x,
  y,
  formData,
  FIRST_COLUMN_WIDTH,
  SECOND_COLUMN_WIDTH,
  title,
  areas,
  checkboxes,
}: drawInpectionTableProps) => {
  drawer.drawTable(x, y, {
    headers: [
      { text: "", width: FIRST_COLUMN_WIDTH, align: "center" },
      { text: title, width: SECOND_COLUMN_WIDTH, align: "center" },
    ],
    rows: areas.map((area, index) => [
      { type: "text", text: String(index + 1), align: "center" },
      {
        type: "text",
        text: area,
        align: "left",
      },
    ]),
  });
  checkboxes.forEach((chbx) => {
    drawer.drawCheckbox(
      x + chbx.x,
      y - chbx.y,
      getCheckboxState(formData.criteria[chbx.criteria]),
    );
  });
};
