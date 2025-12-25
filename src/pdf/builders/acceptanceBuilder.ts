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
import { drawMainTable, drawSpacesInspected } from "../layout/table";
import { drawSignatures } from "../layout/signatures";

export async function buildAcceptancePdf(formData: AcceptanceFormData) {
  console.log(formData);
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);

  const form = pdf.getForm();
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
  drawSpacesInspected({ drawer, cursor, formData });

  form.flatten();
  drawSignatures({ drawer, cursor, formData, page, pdf });

  const pdfBytes = await pdf.save();
  return pdfBytes;
}
