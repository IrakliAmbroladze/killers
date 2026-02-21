import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import { MARGIN_X, PAGE_WIDTH } from "@/pdf/constants/pdfPageDimensions";
import { Cursor } from "@/pdf/types/Cursor";
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
    rows: inspectionOutdoor.map((area, index) => [
      { type: "text", text: String(index + 1), align: "center" },
      {
        type: "text",
        text: area,
        align: "left",
      },
    ]),
  });

  const checkbox_X = MARGIN_X;
  const checkbox_Y = cursor.y;

  drawer.drawCheckbox(
    checkbox_X + 214,
    checkbox_Y - 35,
    getCheckboxState(formData.criteria["1.1"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 390,
    checkbox_Y - 35,
    getCheckboxState(formData.criteria["1.2"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 67,
    checkbox_Y - 55,
    getCheckboxState(formData.criteria["2.1"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 115,
    checkbox_Y - 55,
    getCheckboxState(formData.criteria["2.2"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 175,
    checkbox_Y - 55,
    getCheckboxState(formData.criteria["2.3"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 289,
    checkbox_Y - 55,
    getCheckboxState(formData.criteria["2.4"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 370,
    checkbox_Y - 55,
    getCheckboxState(formData.criteria["2.5"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 280,
    checkbox_Y - 75,
    getCheckboxState(formData.criteria["3.1"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 420,
    checkbox_Y - 75,
    getCheckboxState(formData.criteria["3.2"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 300,
    checkbox_Y - 95,
    getCheckboxState(formData.criteria["4.1"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 455,
    checkbox_Y - 115,
    getCheckboxState(formData.criteria["5.1"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 205,
    checkbox_Y - 135,
    getCheckboxState(formData.criteria["6.1"]),
  );
  drawer.drawCheckbox(
    checkbox_X + 437,
    checkbox_Y - 135,
    getCheckboxState(formData.criteria["6.2"]),
  );
};
