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
  drawer.drawCheckbox(
    x + 214,
    y - 35,
    getCheckboxState(formData.criteria["1.1"]),
  );
  drawer.drawCheckbox(
    x + 390,
    y - 35,
    getCheckboxState(formData.criteria["1.2"]),
  );
  drawer.drawCheckbox(
    x + 67,
    y - 55,
    getCheckboxState(formData.criteria["2.1"]),
  );
  drawer.drawCheckbox(
    x + 115,
    y - 55,
    getCheckboxState(formData.criteria["2.2"]),
  );
  drawer.drawCheckbox(
    x + 175,
    y - 55,
    getCheckboxState(formData.criteria["2.3"]),
  );
  drawer.drawCheckbox(
    x + 289,
    y - 55,
    getCheckboxState(formData.criteria["2.4"]),
  );
  drawer.drawCheckbox(
    x + 370,
    y - 55,
    getCheckboxState(formData.criteria["2.5"]),
  );
  drawer.drawCheckbox(
    x + 280,
    y - 75,
    getCheckboxState(formData.criteria["3.1"]),
  );
  drawer.drawCheckbox(
    x + 420,
    y - 75,
    getCheckboxState(formData.criteria["3.2"]),
  );
  drawer.drawCheckbox(
    x + 300,
    y - 95,
    getCheckboxState(formData.criteria["4.1"]),
  );
  drawer.drawCheckbox(
    x + 455,
    y - 115,
    getCheckboxState(formData.criteria["5.1"]),
  );
  drawer.drawCheckbox(
    x + 205,
    y - 135,
    getCheckboxState(formData.criteria["6.1"]),
  );
  drawer.drawCheckbox(
    x + 437,
    y - 135,
    getCheckboxState(formData.criteria["6.2"]),
  );
};
