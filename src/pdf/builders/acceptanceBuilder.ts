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
import {
  drawDate,
  drawDocTitle,
  drawInspectionCustomerNameSection,
  drawIntro,
} from "../layout/text";
import { sanitaryServices } from "../utils/sanitaryServices";
import { Services } from "../types/SanitaryServices";
import { drawServicesCheckBoxes } from "../layout/checkboxes";
import { drawMainTable, drawSpacesInspected } from "../layout/table";
import { drawSignatures } from "../layout/signatures";
import { drawLogo, drawStamp } from "../layout/images";
import { drawSoldInventoryTable } from "../layout/table/SoldInventoryTable";
import { drawTimeAndAddress } from "../layout/text/drawTimeAndAddress";

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
  cursor.move(-31);
  drawDocTitle({
    drawer,
    title: "მიღება-ჩაბარების აქტი",
    cursor,
    font_size: 14,
  });
  cursor.move(30);
  drawDate({ drawer, date: formData.date, cursor });
  drawIntro({
    drawer,
    cursor,
    customerName: formData.customer.name,
    customerId: formData.customer.personalNumber,
  });

  drawServicesCheckBoxes({ services, cursor, drawer });

  drawMainTable({ drawer, cursor, formData });
  const [sold_inventory_height, sold_inventory_width] = drawSoldInventoryTable({
    drawer,
    cursor,
    formData,
  });
  const [time_address_height] = drawTimeAndAddress({
    drawer,
    formData,
    x: MARGIN_X + sold_inventory_width + 10,
    y: cursor.y,
  });
  cursor.move(
    sold_inventory_height > time_address_height
      ? sold_inventory_height
      : time_address_height,
  );
  const [spaces_inspected_height] = drawSpacesInspected({
    drawer,
    formData,
    x: MARGIN_X,
    y: cursor.y,
  });
  cursor.move(spaces_inspected_height);
  drawSignatures({ drawer, cursor, formData, page, pdf });
  drawStamp({ drawer, cursor, image: stampImage });
  const secondPage = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const secondCursor = createCursor(secondPage);
  const secondDrawer = new PDFDrawer(pdf, secondPage, font, boldFont);
  drawDocTitle({
    drawer: secondDrawer,
    title: "ტერიტორიის ინსპექტირება",
    cursor: secondCursor,
    font_size: 10,
  });
  secondCursor.move(9);
  drawInspectionCustomerNameSection({
    drawer: secondDrawer,
    cursor: secondCursor,
    font_size: 9,
    customer_name: formData.customer.name,
  });
  secondCursor.move(18);
  drawDate({ drawer: secondDrawer, date: formData.date, cursor: secondCursor });
  const pdfBytes = await pdf.save();
  return pdfBytes;
}
