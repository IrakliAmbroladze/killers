import { PDFDocument, rgb, PDFPage } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "node:fs";
import path from "node:path";
import { AcceptanceFormData } from "@/types";
import {
  PAGE_WIDTH,
  PAGE_HEIGHT,
  MARGIN_X,
  MARGIN_Y,
} from "../constants/pdfPageDimensions";
import { createCursor } from "../layout/cursor";
import {
  PEST_TABLE_COL_HEIGHT,
  PEST_TABLE_COL_WIDTHS,
} from "../constants/pestTableCellSize";
import { PDFDrawer } from "../classes/PDFDrawer";
import { drawDate, drawDocTitle, drawIntro } from "../layout/text";
import { sanitaryServices } from "../utils/sanitaryServices";
import { Services } from "../types/SanitaryServices";
import { drawServicesCheckBoxes } from "../layout/checkboxes";
import { drawMainTable } from "../layout/table";

export async function buildAcceptancePdf(formData: AcceptanceFormData) {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);

  const form = pdf.getForm();
  // Load fonts
  const regularFontPath = path.join(
    process.cwd(),
    "src/assets/fonts/NotoSansGeorgian-Regular.ttf",
  );
  const boldFontPath = path.join(
    process.cwd(),
    "src/assets/fonts/NotoSansGeorgian-Bold.ttf",
  );

  const regularFontBytes = fs.readFileSync(regularFontPath);
  const boldFontBytes = fs.readFileSync(boldFontPath);

  const font = await pdf.embedFont(regularFontBytes);
  const boldFont = await pdf.embedFont(boldFontBytes);

  const page: PDFPage = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const cursor = createCursor(page);
  let cursorY = PAGE_HEIGHT - MARGIN_Y;

  const drawer = new PDFDrawer(pdf, page, font, boldFont);
  const services: Services[] = sanitaryServices({ form, formData });

  cursorY -= 500;
  cursor.move(20);
  drawDocTitle({ drawer, title: "მიღება-ჩაბარების აქტი", cursor });
  drawDate({ drawer, date: formData.date, cursor });
  drawIntro({
    drawer,
    cursor,
    customerName: formData.customer.name,
    customerId: formData.customer.personalNumber,
  });

  drawServicesCheckBoxes({ services, page, cursor, drawer });

  drawMainTable({ drawer, cursor, formData });

  /* page.drawRectangle({
    x: MARGIN_X,
    y: cursorY - PEST_TABLE_COL_HEIGHT * 2,
    width: PEST_TABLE_COL_WIDTHS[0],
    height: PEST_TABLE_COL_HEIGHT,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  drawer.drawText(
    "მავნებლები",
    MARGIN_X,
    cursorY - 15 - PEST_TABLE_COL_HEIGHT,
    {
      size: 10,
      bold: true,
    },
  );
  page.drawRectangle({
    x: MARGIN_X,
    y: cursorY - PEST_TABLE_COL_HEIGHT,
    width:
      PEST_TABLE_COL_WIDTHS[0] +
      PEST_TABLE_COL_WIDTHS[1] +
      PEST_TABLE_COL_WIDTHS[2] +
      PEST_TABLE_COL_WIDTHS[3],
    height: PEST_TABLE_COL_HEIGHT,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });

  drawer.drawText("გატარებული ღონისძიება", MARGIN_X, cursorY - 15, {
    size: 10,
    bold: true,
  });
  page.drawRectangle({
    x: MARGIN_X + PEST_TABLE_COL_WIDTHS[0],
    y: cursorY - PEST_TABLE_COL_HEIGHT * 2,
    width: PEST_TABLE_COL_WIDTHS[1],
    height: PEST_TABLE_COL_HEIGHT,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  drawer.drawText(
    "მონიტორი",
    MARGIN_X + PEST_TABLE_COL_WIDTHS[0],
    cursorY - PEST_TABLE_COL_HEIGHT * 1 - 15,
    {
      size: 10,
      bold: true,
    },
  );
  page.drawRectangle({
    x: MARGIN_X + PEST_TABLE_COL_WIDTHS[0] + PEST_TABLE_COL_WIDTHS[1],
    y: cursorY - PEST_TABLE_COL_HEIGHT * 3,
    width: PEST_TABLE_COL_WIDTHS[2],
    height: PEST_TABLE_COL_HEIGHT,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  drawer.drawText(
    "სპრეი",
    MARGIN_X + PEST_TABLE_COL_WIDTHS[0] + PEST_TABLE_COL_WIDTHS[1],
    cursorY - PEST_TABLE_COL_HEIGHT * 2 - 10,
    {
      size: 10,
      bold: true,
    },
  );
  page.drawRectangle({
    x:
      MARGIN_X +
      PEST_TABLE_COL_WIDTHS[0] +
      PEST_TABLE_COL_WIDTHS[1] +
      PEST_TABLE_COL_WIDTHS[2],
    y: cursorY - PEST_TABLE_COL_HEIGHT * 3,
    width: PEST_TABLE_COL_WIDTHS[3],
    height: PEST_TABLE_COL_HEIGHT,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  drawer.drawText(
    "გელი",
    MARGIN_X +
      PEST_TABLE_COL_WIDTHS[0] +
      PEST_TABLE_COL_WIDTHS[1] +
      PEST_TABLE_COL_WIDTHS[2],
    cursorY - PEST_TABLE_COL_HEIGHT * 2 - 10,
    {
      size: 10,
      bold: true,
    },
  );
  page.drawRectangle({
    x:
      MARGIN_X +
      PEST_TABLE_COL_WIDTHS[0] +
      PEST_TABLE_COL_WIDTHS[1] +
      PEST_TABLE_COL_WIDTHS[2] +
      PEST_TABLE_COL_WIDTHS[3],
    y: cursorY - PEST_TABLE_COL_HEIGHT,
    width:
      PEST_TABLE_COL_WIDTHS[4] +
      PEST_TABLE_COL_WIDTHS[5] +
      PEST_TABLE_COL_WIDTHS[6],
    height: PEST_TABLE_COL_HEIGHT,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  drawer.drawText(
    "გამოყენებული საშუალებები",
    MARGIN_X +
      PEST_TABLE_COL_WIDTHS[0] +
      PEST_TABLE_COL_WIDTHS[1] +
      PEST_TABLE_COL_WIDTHS[2] +
      PEST_TABLE_COL_WIDTHS[3],
    cursorY - 10,
    {
      size: 10,
      bold: true,
    },
  );
  page.drawRectangle({
    x:
      MARGIN_X +
      PEST_TABLE_COL_WIDTHS[0] +
      PEST_TABLE_COL_WIDTHS[1] +
      PEST_TABLE_COL_WIDTHS[2] +
      PEST_TABLE_COL_WIDTHS[3],
    y: cursorY - PEST_TABLE_COL_HEIGHT * 2,
    width: PEST_TABLE_COL_WIDTHS[4],
    height: PEST_TABLE_COL_HEIGHT,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  drawer.drawText(
    "დასახელება",
    MARGIN_X +
      PEST_TABLE_COL_WIDTHS[0] +
      PEST_TABLE_COL_WIDTHS[1] +
      PEST_TABLE_COL_WIDTHS[2] +
      PEST_TABLE_COL_WIDTHS[3],
    cursorY - PEST_TABLE_COL_HEIGHT - 10,
    {
      size: 10,
      bold: true,
    },
  );

  page.drawRectangle({
    x:
      MARGIN_X +
      PEST_TABLE_COL_WIDTHS[0] +
      PEST_TABLE_COL_WIDTHS[1] +
      PEST_TABLE_COL_WIDTHS[2] +
      PEST_TABLE_COL_WIDTHS[3] +
      PEST_TABLE_COL_WIDTHS[4],
    y: cursorY - PEST_TABLE_COL_HEIGHT * 2,
    width: PEST_TABLE_COL_WIDTHS[5],
    height: PEST_TABLE_COL_HEIGHT,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  drawer.drawText(
    "დოზირება",
    MARGIN_X +
      PEST_TABLE_COL_WIDTHS[0] +
      PEST_TABLE_COL_WIDTHS[1] +
      PEST_TABLE_COL_WIDTHS[2] +
      PEST_TABLE_COL_WIDTHS[3] +
      PEST_TABLE_COL_WIDTHS[4],
    cursorY - PEST_TABLE_COL_HEIGHT - 10,
    {
      size: 10,
      bold: true,
    },
  ); */
  cursorY -= PEST_TABLE_COL_HEIGHT * 4;
  // === SPACES INSPECTED ===
  /* drawer.drawText(
    "დეტალურად დათვალიერდა და საჭიროებისამებრ დამუშავდა შემდეგი სივრცეები:",
    MARGIN_X,
    cursorY,
    { size: 10, bold: true },
  );
  cursorY -= 20;

  const spacesList = [
    "მიმღები",
    "სასტუმრო ოთახი",
    "სამზარეულო",
    "ოფისი",
    "დერეფანი",
    "რესტორანი",
    "ბარი",
    "ტერასა",
    "სველი წერტილები",
    "საწყობი",
    "საერთო სივრცე",
    "სხვენი",
    "სარდაფი",
    "მარანი",
    "ტექნიკური ოთახი",
    "საწარმო",
    "მომარაგების ოთახი",
    "ნაგავსაყრელი",
    "გარე ტერიტორია",
  ];

  const spaceCols = 5;
  const spaceColWidth = (PAGE_WIDTH - MARGIN_X * 2) / spaceCols;
  spacesList.forEach((space, index) => {
    const col = index % spaceCols;
    const row = Math.floor(index / spaceCols);
    const xPos = MARGIN_X + col * spaceColWidth;
    const yPos = cursorY - row * 18;

    drawer.drawCheckbox(xPos, yPos, formData.spaces[space] || false, 8);
    drawer.drawText(space, xPos + 12, yPos - 8, { size: 7 });
  });

  cursorY -= Math.ceil(spacesList.length / spaceCols) * 18 + 20;

  // === TIME AND ADDRESS ===
  drawer.drawText("დაწყების დრო:", MARGIN_X, cursorY, {
    size: 9,
    bold: true,
  });
  drawer.drawText(formData.startTime, MARGIN_X + 150, cursorY, { size: 9 });
  cursorY -= 18;

  drawer.drawText("დასრულების დრო:", MARGIN_X, cursorY, {
    size: 9,
    bold: true,
  });
  drawer.drawText(formData.endTime, MARGIN_X + 150, cursorY, { size: 9 });
  cursorY -= 18;

  drawer.drawText("ობიექტის მისამართი:", MARGIN_X, cursorY, {
    size: 9,
    bold: true,
  });
  cursorY -= 15;
  drawer.drawText(formData.address, MARGIN_X, cursorY, { size: 9 });
  cursorY -= 30;

  // === SIGNATURES ===
  if (cursorY < 200) {
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    cursorY = PAGE_HEIGHT - MARGIN_Y;
  }

  drawer.drawText("დამკვეთის წარმომადგენელი", MARGIN_X, cursorY, {
    size: 11,
    bold: true,
  });
  drawer.drawText("შემსრულებელი", PAGE_WIDTH / 2 + 50, cursorY, {
    size: 11,
    bold: true,
  });
  cursorY -= 20;

  // Customer info
  drawer.drawText(
    `სახელი, გვარი: ${formData.customer.name}`,
    MARGIN_X,
    cursorY,
    {
      size: 9,
    },
  );
  cursorY -= 15;
  drawer.drawText(
    `პირადი ნომერი: ${formData.customer.personalNumber}`,
    MARGIN_X,
    cursorY,
    { size: 9 },
  );
  cursorY -= 20; */

  form.flatten();
  drawer.drawText("ხელმოწერა", MARGIN_X, cursorY, { size: 9 });
  drawer.drawText("ხელმოწერა", PAGE_WIDTH / 2 + 50, cursorY, { size: 9 });
  cursorY -= 10;

  // Embed signatures
  if (formData.customer.signature && formData.executor.signature) {
    const customerPngBytes = Uint8Array.from(
      atob(formData.customer.signature.replace(/^data:image\/png;base64,/, "")),
      (c) => c.charCodeAt(0),
    );
    const executorPngBytes = Uint8Array.from(
      atob(formData.executor.signature.replace(/^data:image\/png;base64,/, "")),
      (c) => c.charCodeAt(0),
    );

    const customerImg = await pdf.embedPng(customerPngBytes);
    const executorImg = await pdf.embedPng(executorPngBytes);

    const sigWidth = 150;
    const sigHeight = 75;

    page.drawImage(customerImg, {
      x: MARGIN_X,
      y: cursorY - sigHeight,
      width: sigWidth,
      height: sigHeight,
    });

    page.drawImage(executorImg, {
      x: PAGE_WIDTH / 2 + 50,
      y: cursorY - sigHeight,
      width: sigWidth,
      height: sigHeight,
    });
  }

  // === SAVE PDF ===
  const pdfBytes = await pdf.save();
  return pdfBytes;
}
