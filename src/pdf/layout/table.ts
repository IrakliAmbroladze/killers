import { AcceptanceFormData } from "@/types";
import { PDFDrawer } from "../classes/PDFDrawer";
import { MARGIN_X, PAGE_WIDTH } from "../constants/pdfPageDimensions";
import { Cursor } from "../types/Cursor";
import { spacesList } from "../constants/tableData";
import { PdfTableCell } from "../types/Table";
import { createPestsTable } from "./table/PestsTable";
import { createProductsTable } from "./table/ProductsTable";

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
  const gapBetweenTables = 10;
  cursor.move(5);
  const { pestsTableWidth, pestsTableHeight } = createPestsTable({
    drawer,
    x: MARGIN_X,
    y: cursor.y,
    formData,
  });
  const { productsTableHeight } = createProductsTable({
    drawer,
    x: MARGIN_X + pestsTableWidth + gapBetweenTables,
    y: cursor.y,
    formData,
  });
  cursor.move(5);

  cursor.move(
    (pestsTableHeight > productsTableHeight
      ? pestsTableHeight
      : productsTableHeight) + 20,
  );
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
    { size: 8, bold: true },
  );
  cursor.move(20);

  const spaceCols = 4;
  const spaceColWidth = (PAGE_WIDTH - MARGIN_X * 5) / spaceCols;
  spacesList.forEach((space, index) => {
    const col = index % spaceCols;
    const row = Math.floor(index / spaceCols);
    const xPos = MARGIN_X + col * spaceColWidth;
    const yPos = cursor.y - row * 12;

    drawer.drawCheckbox(xPos, yPos, formData.spaces[space] || false, 8);
    drawer.drawText(space, xPos + 12, yPos, { size: 7 });
  });

  // cursor.move(Math.ceil(spacesList.length / spaceCols) * 18 + 15);

  const cursor_x = PAGE_WIDTH - 180;

  cursor.move(-6);
  drawer.drawText("დაწყების დრო:", cursor_x, cursor.y, {
    size: 9,
    bold: true,
  });
  drawer.drawText(formData.startTime, cursor_x + 80, cursor.y, { size: 9 });
  cursor.move(12);

  drawer.drawText("დასრულების დრო:", cursor_x, cursor.y, {
    size: 9,
    bold: true,
  });
  drawer.drawText(formData.endTime, cursor_x + 100, cursor.y, { size: 9 });
  cursor.move(18);

  drawer.drawText("ობიექტის მისამართი:", cursor_x, cursor.y, {
    size: 9,
    bold: true,
  });
  cursor.move(10);

  drawer.drawParagraph(formData.address, cursor_x, cursor.y, 170, {
    size: 9,
    lineHeight: 1.3,
  });

  //cursor.move(usedHeight + 15);
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
  cursor_x += 350;
  cursor_y += 133;
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
      { text: "დასახელება", width: 130 },
      { text: "ერთ.ფასი", width: 60 },
      { text: "რაოდენობა", width: 70 },
    ],
    rows,
  };

  cursor_y -= 5;

  drawer.drawTable(PAGE_WIDTH - MARGIN_X - 252, cursor_y, tableData, {
    fontSize: 8,
    rowHeight: 18,
  });
  cursor_x += 262;
};
