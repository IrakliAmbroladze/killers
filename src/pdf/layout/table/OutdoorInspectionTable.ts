import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import { MARGIN_X } from "@/pdf/constants/pdfPageDimensions";
import { Cursor } from "@/pdf/types/Cursor";
import { AcceptanceFormData } from "@/types";

const inspectionOutdoor = [
  "ნაგვის ურნები შენობიდან მოშორებითაა      არის სათანადოდ მოწესრიგებული",
  "კედლებს      კარებს      ფანჯრებს      საფეხმავლო ბილიკს      და ტროტუარს      არ აქვს ღიობები",
  "სანიაღვრე წყლები შენობიდან შორს არის მიმართული      არ ხდება წყლის დადგომა",
  "მილები და საკანალიზაციო ჭები დაცულია მეტალის ბადით",
  "ხეები, ბუჩქები, ნაფოტები, ნახერხი და სხვა ტიპის მცენარეები არის შენობიდან მოშორებით",
  "შენობის გარშემო არ გროვდება ნაგავი      მოწესრიგებულია ბალახი და სხვა მცენარეები",
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
};
