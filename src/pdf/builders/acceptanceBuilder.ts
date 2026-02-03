import { PDFDocument, PDFPage } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "node:fs";
import path from "node:path";
import { AcceptanceFormData } from "@/types";
import {
  PAGE_WIDTH,
  PAGE_HEIGHT,
  MARGIN_X,
} from "../constants/pdfPageDimensions";
import { createCursor } from "../layout/cursor";
import { PDFDrawer } from "../classes/PDFDrawer";
import { drawDate, drawDocTitle, drawIntro } from "../layout/text";
import { sanitaryServices } from "../utils/sanitaryServices";
import { Services } from "../types/SanitaryServices";
import { drawServicesCheckBoxes } from "../layout/checkboxes";
import { drawMainTable, drawSpacesInspected } from "../layout/table";
import { drawSignatures } from "../layout/signatures";
import { drawLogo, drawStamp } from "../layout/images";
import { drawSoldInventoryTable } from "../layout/table/SoldInventoryTable";

export async function buildAcceptancePdf(formData: AcceptanceFormData) {
  const pdf = await PDFDocument.create();
  const logoPath = path.join(process.cwd(), "public", "logoBlue.png");
  const logoBytes = fs.readFileSync(logoPath);
  const logoImage = await pdf.embedPng(logoBytes);
  const stampPath = path.join(process.cwd(), "public", "stamp.png");
  const stampBytes = fs.readFileSync(stampPath);
  const stampImage = await pdf.embedPng(stampBytes);

  pdf.registerFontkit(fontkit);

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
  const services: Services[] = sanitaryServices({ formData });
  drawLogo({ drawer, cursor, image: logoImage });
  drawDocTitle({ drawer, title: "მიღება-ჩაბარების აქტი", cursor });
  drawDate({ drawer, date: formData.date, cursor });
  drawIntro({
    drawer,
    cursor,
    customerName: formData.customer.name,
    customerId: formData.customer.personalNumber,
  });

  drawServicesCheckBoxes({ services, cursor, drawer });

  drawMainTable({ drawer, cursor, formData });
  drawSoldInventoryTable({
    drawer,
    cursor,
    formData,
    x: MARGIN_X,
    y: cursor.y,
  });

  drawSpacesInspected({ drawer, cursor, formData });
  drawSignatures({ drawer, cursor, formData, page, pdf });
  drawStamp({ drawer, cursor, image: stampImage });

  const pdfBytes = await pdf.save();
  return pdfBytes;
}
