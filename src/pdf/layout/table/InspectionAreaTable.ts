import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import { MARGIN_X, PAGE_WIDTH } from "@/pdf/constants/pdfPageDimensions";
import { Cursor } from "@/pdf/types/Cursor";
import { getCheckboxState } from "@/pdf/utils/getCheckboxState";
import { AcceptanceFormData } from "@/types";
import { drawInpectionTable } from "./OutdoorInspectionTable";

const inspectionOutdoor = [
  "ნაგვის ურნები შენობიდან მოშორებითაა      არის სათანადოდ მოწესრიგებული",
  "კედლებს      კარებს      ფანჯრებს      საფეხმავლო ბილიკს      და ტროტუარს      არ აქვს ღიობები",
  "სანიაღვრე წყლები შენობიდან შორს არის მიმართული      არ ხდება წყლის დადგომა",
  "მილები და საკანალიზაციო ჭები დაცულია მეტალის ბადით",
  "ხეები, ბუჩქები, ნაფოტები, ნახერხი და სხვა ტიპის მცენარეები არის შენობიდან მოშორებით",
  "შენობის გარშემო არ გროვდება ნაგავი      მოწესრიგებულია ბალახი და სხვა მცენარეები",
];
const inspectionKitchen = [
  "კედლები და ჭერი არის სუფთა, არ არის ცხიმიანი      და არ იქმნება კონდესატი",
  "იატაკი და ტრაპები არის სუფთა, არ გროვდება ცხიმი ან ნარჩენები",
  "საკვების მოსამზადებელი სივრცე მოწესრიგებულია, არ რჩება ნარჩენები",
  "საკვები არ არის ხელმისაწვდომი მავნებლისთვის",
  "საკვების მოსამზადებელი დანადგარები არის სუფთა, არ გროვდება ცხიმი ან ნარჩენები",
  "ჭურჭლის სარეცხი სივრცე სუფთადაა      შენარჩუნებულია სიმშრალე",
  "გასარეცხი ჭურჭელი არ გროვდება სამზარეულოში",
];

const outdoorCheckboxes = [
  { x: 214, y: 35, criteria: "1.1" },
  { x: 390, y: 35, criteria: "1.2" },
  { x: 67, y: 55, criteria: "2.1" },
  { x: 115, y: 55, criteria: "2.2" },
  { x: 175, y: 55, criteria: "2.3" },
  { x: 289, y: 55, criteria: "2.4" },
  { x: 370, y: 55, criteria: "2.5" },
  { x: 280, y: 75, criteria: "3.1" },
  { x: 420, y: 75, criteria: "3.2" },
  { x: 305, y: 95, criteria: "4.1" },
  { x: 455, y: 115, criteria: "5.1" },
  { x: 205, y: 135, criteria: "6.1" },
  { x: 437, y: 135, criteria: "6.2" },
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

  drawInpectionTable({
    drawer,
    x: MARGIN_X,
    y: cursor.y,
    formData,
    FIRST_COLUMN_WIDTH,
    SECOND_COLUMN_WIDTH,
    title: "გარე ტერიტორია",
    areas: inspectionOutdoor,
    checkboxes: outdoorCheckboxes,
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
