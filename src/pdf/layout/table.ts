import { AcceptanceFormData } from "@/types";
import { PDFDrawer } from "../classes/PDFDrawer";
import { MARGIN_X, PAGE_WIDTH } from "../constants/pdfPageDimensions";
import { Cursor } from "../types/Cursor";
import { spacesList } from "../constants/tableData";
import { PdfTableCell } from "../types/Table";

type DrawMainTableProps = {
  drawer: PDFDrawer;
  cursor: Cursor;
  formData: AcceptanceFormData;
};
export const drawMainTable = ({
  drawer,
  cursor,
  formData,
}: DrawMainTableProps) => {
  let cursor_x = MARGIN_X;
  drawer.drawText(
    "ტერიტორიაზე ჩატარებული სამუშაოები და სამიზნე მავნებლები:",
    cursor_x,
    cursor.y,
    { size: 10, bold: true },
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

  const rows: PdfTableCell[][] = formData.pests.map((pest) => [
    { type: "text", text: pest.name },
    { type: "checkbox", checked: pest.monitor },
    { type: "checkbox", checked: pest.spray },
    { type: "checkbox", checked: pest.gel },
  ]);

  const tableData = {
    headers: [
      { text: "მავნებელი", width: 80 },
      { text: "მონიტორი", width: 60 },
      { text: "სპრეი", width: 60 },
      { text: "გელი", width: 50 },
    ],
    rows,
  };

  const tableHeight = drawer.drawTable(cursor_x, cursor.y, tableData, {
    fontSize: 8,
    rowHeight: 18,
  });
  cursor_x += 262;

  const materialsRows: PdfTableCell[][] = formData.products.map((product) => [
    { type: "text", text: product.name },
    { type: "text", text: product.dosage },
    { type: "text", text: product.used },
  ]);

  const tableData2 = {
    headers: [
      { text: "დასახელება", width: 130 },
      { text: "დოზირება", width: 60 },
      { text: "გახარჯული", width: 70 },
    ],
    rows: materialsRows,
  };
  const tableHeight2 = drawer.drawTable(cursor_x, cursor.y, tableData2, {
    fontSize: 8,
    rowHeight: 18,
  });
  /*const height = tableHeight > tableHeight2 ? tableHeight : tableHeight2;*/
  cursor.move((tableHeight > tableHeight2 ? tableHeight : tableHeight2) + 20);

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
  cursor.move(15);

  const spaceCols = 5;
  const spaceColWidth = (PAGE_WIDTH - MARGIN_X * 2) / spaceCols;
  spacesList.forEach((space, index) => {
    const col = index % spaceCols;
    const row = Math.floor(index / spaceCols);
    const xPos = MARGIN_X + col * spaceColWidth;
    const yPos = cursor.y - row * 18;

    drawer.drawCheckbox(xPos, yPos, formData.spaces[space] || false, 8);
    drawer.drawText(space, xPos + 12, yPos, { size: 7 });
  });

  cursor.move(Math.ceil(spacesList.length / spaceCols) * 18 + 15);

  drawer.drawText("დაწყების დრო:", MARGIN_X, cursor.y, {
    size: 9,
    bold: true,
  });
  drawer.drawText(formData.startTime, MARGIN_X + 80, cursor.y, { size: 9 });
  cursor.move(18);

  drawer.drawText("დასრულების დრო:", MARGIN_X, cursor.y, {
    size: 9,
    bold: true,
  });
  drawer.drawText(formData.endTime, MARGIN_X + 100, cursor.y, { size: 9 });
  cursor.move(18);

  drawer.drawText("ობიექტის მისამართი:", MARGIN_X, cursor.y, {
    size: 9,
    bold: true,
  });
  cursor.move(15);

  const usedHeight = drawer.drawParagraph(
    formData.address,
    MARGIN_X,
    cursor.y,
    200,
    { size: 9, lineHeight: 1.3 },
  );

  cursor.move(usedHeight + 15);
};

type DrawSoldInventoryTable = {
  drawer: PDFDrawer;
  cursor: Cursor;
  formData: AcceptanceFormData;
};
export const drawSoldInventoryTable = ({
  drawer,
  cursor,
  formData,
}: DrawSoldInventoryTable) => {
  let cursor_x = MARGIN_X;
  let cursor_y = cursor.y;
  cursor_y += 95;
  cursor_x += 50;
  cursor_x += 270;
  drawer.drawText("მიწოდებული ინვენტარი", cursor_x, cursor_y, {
    size: 9,
    bold: true,
  });

  const rows: PdfTableCell[][] = formData.inventory.map((item) => [
    { type: "text", text: item.name },
    { type: "text", text: item.price },
    { type: "text", text: item.quantity },
  ]);

  const tableData = {
    headers: [
      { text: "დასახელება", width: 150 },
      { text: "ერთეულის ფასი", width: 100 },
      { text: "რაოდენობა", width: 60 },
    ],
    rows,
  };

  cursor_y -= 5;
  cursor_x -= 120;

  drawer.drawTable(cursor_x, cursor_y, tableData, {
    fontSize: 8,
    rowHeight: 18,
  });
  cursor_x += 262;
};
