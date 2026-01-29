import { AcceptanceFormData } from "@/types";
import { PDFDrawer } from "../classes/PDFDrawer";
import { MARGIN_X, PAGE_WIDTH } from "../constants/pdfPageDimensions";
import { Cursor } from "../types/Cursor";
import {
  SPACE_BETWEEN_TITLE_AND_TABLE,
  spacesList,
  TABLE_ROW_HEIGHT,
} from "../constants/tableData";
import { createPestsTable } from "./table/PestsTable";
import { createProductsTable } from "./table/ProductsTable";
import { drawSoldInventoryTable } from "./table/SoldInventoryTable";

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

  cursor.move(TABLE_ROW_HEIGHT - SPACE_BETWEEN_TITLE_AND_TABLE);
  drawSoldInventoryTable({
    drawer,
    cursor,
    formData,
    x: MARGIN_X + pestsTableWidth + gapBetweenTables,
    y: cursor.y - productsTableHeight,
  });
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
