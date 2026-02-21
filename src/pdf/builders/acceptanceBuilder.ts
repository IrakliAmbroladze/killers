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
  drawInspectionCustomerNameSection,
  drawIntro,
} from "../layout/text";
import { sanitaryServices } from "../utils/sanitaryServices";
import { Services } from "../types/SanitaryServices";
import { drawServicesCheckBoxes } from "../layout/checkboxes";
import { drawMainTable, drawSpacesInspected } from "../layout/table";
import { drawSignatures } from "../layout/signatures";
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
  cursor.move(65);
  drawer.drawImage(logoImage, MARGIN_X - 22, cursor.y, { height: 65 });
  cursor.move(-30);
  drawer.drawText("მიღება-ჩაბარების აქტი", 0, cursor.y, {
    size: 14,
    bold: true,
    align: "center",
    maxWidth: PAGE_WIDTH,
  });
  cursor.move(30);
  drawDate({ drawer, date: formData.date, cursor });
  cursor.move(15);
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
  drawer.drawImage(stampImage, PAGE_WIDTH / 2 - 40, cursor.y, {
    height: 80,
  });
  const secondPage = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const secondCursor = createCursor(secondPage);
  const secondDrawer = new PDFDrawer(pdf, secondPage, font, boldFont);
  secondCursor.move(10);
  secondDrawer.drawText("ტერიტორიის ინსპექტირება", 0, secondCursor.y, {
    size: 10,
    bold: true,
    align: "center",
    maxWidth: PAGE_WIDTH,
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
  //
  // გარე ტერიტორია
  secondDrawer.drawTable(MARGIN_X, secondCursor.y, {
    headers: [
      { text: "#", width: 20, align: "center" },
      { text: "გარე ტერიტორია", width: 400 },
    ],
    rows: [
      [
        { type: "text", text: "1", align: "center" },
        {
          type: "text",
          text:
            "ნაგვის ურნები შენობიდან მოშორებითაა" +
            secondDrawer.drawCheckbox(500, secondCursor.y - 100, true),
        },
      ],
      [
        { type: "text", text: "2", align: "center" },
        {
          type: "text",
          text: "კედლებს კარებს ფანჯრებს საფეხმავლო ბილიკს და ტროტუარს არ აქვს ღიობები",
        },
      ],
    ],
  });

  const pdfBytes = await pdf.save();
  return pdfBytes;
}
