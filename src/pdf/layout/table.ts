import { AcceptanceFormData } from "@/types";
import { PDFDrawer } from "../classes/PDFDrawer";
import { MARGIN_X, PAGE_WIDTH } from "../constants/pdfPageDimensions";
import { Cursor } from "../types/Cursor";
import {
  materialsTableData,
  pestTableData,
  spacesList,
} from "../constants/tableData";

type DrawMainTableProps = {
  drawer: PDFDrawer;
  cursor: Cursor;
  formData: AcceptanceFormData;
};
export const drawMainTable = ({ drawer, cursor }: DrawMainTableProps) => {
  let cursor_x = MARGIN_X;
  drawer.drawText(
    "ტერიტორიაზე ჩატარებული სამუშაოები და სამიზნე მავნებლები:",
    cursor_x,
    cursor.y,
    { size: 11, bold: true },
  );
  cursor.move(15);
  cursor_x += 50;
  drawer.drawText("გატარებული ღონისძიება", cursor_x, cursor.y, {
    size: 9,
    bold: true,
  });
  cursor_x += 270;
  drawer.drawText("გამოყენებული საშუალებები", cursor_x, cursor.y, {
    size: 9,
    bold: true,
  });
  cursor.move(5);
  cursor_x = MARGIN_X;
  const tableData = {
    headers: [
      { text: "მავნებელი", width: 80 },
      { text: "მონიტორი", width: 60 },
      { text: "სპრეი", width: 60 },
      { text: "გელი", width: 50 },
    ],
    rows: pestTableData.map((item) => [
      { text: item },
      { text: "" },
      { text: "" },
      { text: "" },
    ]),
  };

  const tableHeight = drawer.drawTable(cursor_x, cursor.y, tableData, {
    fontSize: 8,
    rowHeight: 18,
  });
  cursor_x += 262;
  const tableData2 = {
    headers: [
      { text: "დასახელება", width: 140 },
      { text: "დოზირება", width: 55 },
      { text: "გახარჯული", width: 60 },
    ],
    rows: materialsTableData.map((item) => [
      { text: item },
      { text: "" },
      { text: "" },
    ]),
  };
  const tableHeight2 = drawer.drawTable(cursor_x, cursor.y, tableData2, {
    fontSize: 8,
    rowHeight: 18,
  });
  const height = tableHeight > tableHeight2 ? tableHeight : tableHeight2;
  cursor.move(height + 20);

  // Check if we need a new page
  /*if (cursorY < 250) {
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    cursorY = PAGE_HEIGHT - MARGIN_Y;
  }*/
};

type DrawSpacesInspected = {
  drawer: PDFDrawer;
  cursor: Cursor;
  formData: AcceptanceFormData;
};
export const drawSpacesInspected = ({
  drawer,
  cursor,
  formData,
}: DrawSpacesInspected) => {
  drawer.drawText(
    "დეტალურად დათვალიერდა და საჭიროებისამებრ დამუშავდა შემდეგი სივრცეები:",
    MARGIN_X,
    cursor.y,
    { size: 10, bold: true },
  );
  cursor.move(20);

  const spaceCols = 5;
  const spaceColWidth = (PAGE_WIDTH - MARGIN_X * 2) / spaceCols;
  spacesList.forEach((space, index) => {
    const col = index % spaceCols;
    const row = Math.floor(index / spaceCols);
    const xPos = MARGIN_X + col * spaceColWidth;
    const yPos = cursor.y - row * 18;

    drawer.drawCheckbox(xPos, yPos, formData.spaces[space] || false, 8);
    drawer.drawText(space, xPos + 12, yPos - 8, { size: 7 });
  });

  cursor.move(Math.ceil(spacesList.length / spaceCols) * 18 + 20);

  drawer.drawText("დაწყების დრო:", MARGIN_X, cursor.y, {
    size: 9,
    bold: true,
  });
  drawer.drawText(formData.startTime, MARGIN_X + 150, cursor.y, { size: 9 });
  cursor.move(18);

  drawer.drawText("დასრულების დრო:", MARGIN_X, cursor.y, {
    size: 9,
    bold: true,
  });
  drawer.drawText(formData.endTime, MARGIN_X + 150, cursor.y, { size: 9 });
  cursor.move(18);

  drawer.drawText("ობიექტის მისამართი:", MARGIN_X, cursor.y, {
    size: 9,
    bold: true,
  });
  cursor.move(15);
  drawer.drawText(formData.address, MARGIN_X, cursor.y, { size: 9 });
  cursor.move(30);
};
