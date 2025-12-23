import { PDFDocument, PDFPage } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "node:fs";
import path from "node:path";
import { AcceptanceFormData } from "@/types";
import { PAGE_WIDTH, PAGE_HEIGHT } from "../constants/pdfPageDimensions";
import { createCursor } from "../layout/cursor";
import { PDFDrawer } from "../classes/PDFDrawer";
import { drawDate, drawDocTitle, drawIntro } from "../layout/text";
import { sanitaryServices } from "../utils/sanitaryServices";
import { Services } from "../types/SanitaryServices";
import { drawServicesCheckBoxes } from "../layout/checkboxes";
import { drawMainTable } from "../layout/table";
import { drawSignatures } from "../layout/signatures";

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

  const drawer = new PDFDrawer(pdf, page, font, boldFont);
  const services: Services[] = sanitaryServices({ form, formData });

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

  // === SPACES INSPECTED ===
  /* drawer.drawText(
    "დეტალურად დათვალიერდა და საჭიროებისამებრ დამუშავდა შემდეგი სივრცეები:",
    MARGIN_X,
    cursorY,
    { size: 10, bold: true },
  );
  cursorY -= 20;



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

   */

  form.flatten();
  drawSignatures({ drawer, cursor, formData, page, pdf });

  const pdfBytes = await pdf.save();
  return pdfBytes;
}
