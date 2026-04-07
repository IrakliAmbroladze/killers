import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import { getCheckboxState } from "@/pdf/utils/getCheckboxState";
import { AcceptanceFormData } from "@/types";

const inspectionOutdoor = [
  "ნაგვის ურნები შენობიდან მოშორებითაა      არის სათანადოდ მოწესრიგებული",
  "კედლებს      კარებს      ფანჯრებს      საფეხმავლო ბილიკს      და ტროტუარს      არ აქვს ღიობები",
  "სანიაღვრე წყლები შენობიდან შორს არის მიმართული      არ ხდება წყლის დადგომა",
  "მილები და საკანალიზაციო ჭები დაცულია მეტალის ბადით",
  "ხეები, ბუჩქები, ნაფოტები, ნახერხი და სხვა ტიპის მცენარეები არის შენობიდან მოშორებით",
  "შენობის გარშემო არ გროვდება ნაგავი      მოწესრიგებულია ბალახი და სხვა მცენარეები",
];

const checkboxes = [
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

type drawOutdoorInpectionTableProps = {
  drawer: PDFDrawer;
  x: number;
  y: number;
  formData: AcceptanceFormData;
  FIRST_COLUMN_WIDTH: number;
  SECOND_COLUMN_WIDTH: number;
};
export const drawOutdoorInpectionTable = ({
  drawer,
  x,
  y,
  formData,
  FIRST_COLUMN_WIDTH,
  SECOND_COLUMN_WIDTH,
}: drawOutdoorInpectionTableProps) => {
  drawer.drawTable(x, y, {
    headers: [
      { text: "", width: FIRST_COLUMN_WIDTH, align: "center" },
      { text: "გარე ტერიტორია", width: SECOND_COLUMN_WIDTH, align: "center" },
    ],
    rows: inspectionOutdoor.map((area, index) => [
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
