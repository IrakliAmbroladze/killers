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
  cursor.move(
    pestsTableHeight > productsTableHeight
      ? pestsTableHeight
      : productsTableHeight,
  );
};

type DrawSpacesInspected = {
  drawer: PDFDrawer;
  x: number;
  y: number;
  formData: AcceptanceFormData;
};
export const drawSpacesInspected = ({
  drawer,
  formData,
  x,
  y,
}: DrawSpacesInspected) => {
  const initial_y = y;
  const ROW_HEIGHT = 18;
  y -= 5;
  drawer.drawText(
    "დეტალურად დათვალიერდა და საჭიროებისამებრ დამუშავდა შემდეგი სივრცეები:",
    x,
    y,
    { size: 9, bold: true },
  );
  y -= 20;

  const spaceCols = 5;
  const spaceColWidth = (PAGE_WIDTH - MARGIN_X * 2) / spaceCols;
  spacesList.forEach((space, index) => {
    const col = index % spaceCols;
    const row = Math.floor(index / spaceCols);
    const xPos = MARGIN_X + col * spaceColWidth;
    const yPos = y - row * ROW_HEIGHT;

    drawer.drawCheckbox(xPos, yPos, formData.spaces[space] || false, 8);
    drawer.drawText(space, xPos + 12, yPos, { size: 7 });
  });
  y -= Math.ceil(spacesList.length / spaceCols) * ROW_HEIGHT;
  const usedHeight = initial_y - y;
  return [usedHeight];
  // cursor.move(Math.ceil(spacesList.length / spaceCols) * 18 + 15);

  //cursor.move(usedHeight + 15);
};
