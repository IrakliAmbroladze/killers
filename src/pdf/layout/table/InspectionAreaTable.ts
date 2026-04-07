import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import { MARGIN_X, PAGE_WIDTH } from "@/pdf/constants/pdfPageDimensions";
import { Cursor } from "@/pdf/types/Cursor";
import { getCheckboxState } from "@/pdf/utils/getCheckboxState";
import { AcceptanceFormData } from "@/types";
import { drawOutdoorInpectionTable } from "./OutdoorInspectionTable";

const inspectionKitchen = [
  "კედლები და ჭერი არის სუფთა, არ არის ცხიმიანი      და არ იქმნება კონდესატი",
  "იატაკი და ტრაპები არის სუფთა, არ გროვდება ცხიმი ან ნარჩენები",
  "საკვების მოსამზადებელი სივრცე მოწესრიგებულია, არ რჩება ნარჩენები",
  "საკვები არ არის ხელმისაწვდომი მავნებლისთვის",
  "საკვების მოსამზადებელი დანადგარები არის სუფთა, არ გროვდება ცხიმი ან ნარჩენები",
  "ჭურჭლის სარეცხი სივრცე სუფთადაა      შენარჩუნებულია სიმშრალე",
  "გასარეცხი ჭურჭელი არ გროვდება სამზარეულოში",
];

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
  const checkbox_X = MARGIN_X;
  const checkbox_Y = cursor.y;

  drawOutdoorInpectionTable({
    drawer,
    x: MARGIN_X,
    y: cursor.y,
    formData,
    FIRST_COLUMN_WIDTH,
    SECOND_COLUMN_WIDTH,
  });

  drawer.drawTable(MARGIN_X, cursor.y - 145, {
    headers: [
      { text: "", width: FIRST_COLUMN_WIDTH, align: "center" },
      { text: "სამზარეულო", width: SECOND_COLUMN_WIDTH, align: "center" },
    ],
    rows: inspectionKitchen.map((area, index) => [
      { type: "text", text: String(index + 7), align: "center" },
      {
        type: "text",
        text: area,
        align: "left",
      },
    ]),
  });
  drawer.drawCheckbox(
    checkbox_X + 253,
    checkbox_Y - 180,
    getCheckboxState(formData.criteria["7.1"]),
  );

  drawer.drawCheckbox(
    checkbox_X + 390,
    checkbox_Y - 180,
    getCheckboxState(formData.criteria["7.2"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 335,
    checkbox_Y - 200,
    getCheckboxState(formData.criteria["8.1"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 370,
    checkbox_Y - 220,
    getCheckboxState(formData.criteria["9.1"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 260,
    checkbox_Y - 240,
    getCheckboxState(formData.criteria["10.1"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 437,
    checkbox_Y - 260,
    getCheckboxState(formData.criteria["11.1"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 196,
    checkbox_Y - 280,
    getCheckboxState(formData.criteria["12.1"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 345,
    checkbox_Y - 280,
    getCheckboxState(formData.criteria["12.2"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 260,
    checkbox_Y - 300,
    getCheckboxState(formData.criteria["13.1"]),
  );
};
