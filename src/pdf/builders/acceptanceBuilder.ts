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
import { drawDate, drawDocHeader, drawDocTitle } from "../layout/text";

export async function buildAcceptancePdf(formData: AcceptanceFormData) {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  const form = pdf.getForm();

  const disinfectionField = form.createCheckBox("service.disinfection");
  const disinsectionField = form.createCheckBox("service.disinsection");
  const deratizationField = form.createCheckBox("service.deratization");
  const subcontractorPreventionField = form.createCheckBox(
    "service.subcontractorPrevention",
  );

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

  let page: PDFPage = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const cursor = createCursor(page);
  let cursorY = PAGE_HEIGHT - MARGIN_Y;

  // Helper class for drawing

  const drawer = new PDFDrawer(pdf, page, font, boldFont);

  // === HEADER ===
  // Logo would go here if you want to embed it
  cursorY -= 75;
  cursor.move(20);
  drawDocTitle({ drawer, title: "მიღება-ჩაბარების აქტი", cursor });
  drawDate({ drawer, date: formData.date, cursor });

  // === INTRODUCTORY TEXT ===
  const introText = `ერთი მხრივ "${formData.customer.name}" (ს/კ ${formData.customer.personalNumber}; შემდგომში "დამკვეთი") და მეორე მხრივ "შპს ქილ" (ს/კ 405049923; შემდგომში "შემსრულებელი") ვადასტურებთ, რომ შემსრულებელმა მიაწოდა, ხოლო დამკვეთმა მიიღო შემდეგი (მარკირებული/აღნიშნული) სახის მომსახურება:`;

  const textHeight = drawer.drawParagraph(
    introText,
    MARGIN_X,
    cursorY,
    PAGE_WIDTH - MARGIN_X * 2,
    { size: 10 },
  );
  cursorY -= textHeight + 15;

  // === SERVICE CHECKBOXES ===
  const services = [
    {
      label: "დეზინსექცია",
      checked: formData.services.disinsection,
      field: disinsectionField,
    },
    {
      label: "დეზინფექცია",
      checked: formData.services.disinfection,
      field: disinfectionField,
    },
    {
      label: "დერატიზაცია",
      checked: formData.services.deratization,
      field: deratizationField,
    },

    {
      label: "ქვეწარმავლების პრევენცია",
      checked: formData.services.subcontractorPrevention,
      field: subcontractorPreventionField,
    },
  ];

  const colWidth = (PAGE_WIDTH - MARGIN_X * 2) / 3;
  services.forEach((service, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const xPos = MARGIN_X + 100 + col * colWidth;
    const yPos = cursorY - row * 20;

    service.field.addToPage(page, {
      x: xPos,
      y: yPos,
      width: 10,
      height: 10,
    });
    if (service.checked) {
      service.field.check();
    }
    drawer.drawText(service.label, xPos + 15, yPos, { size: 10 });
  });

  form.flatten();

  cursorY -= Math.ceil(services.length / 2) * 20 + 15;

  // === MAIN TABLE ===
  drawer.drawText(
    "ტერიტორიაზე ჩატარებული სამუშაოები და სამიზნე მავნებლები:",
    MARGIN_X,
    cursorY,
    { size: 11, bold: true },
  );
  cursorY -= 10;
  cursor.move(200);

  // Complex table structure from your HTML
  /*    const tableData = {
      headers: [
        { text: "მავნებელი", width: 100 },
        { text: "მონიტორი", width: 60 },
        { text: "სპრეი", width: 60 },
        { text: "გელი", width: 60 },
        { text: "დასახელება", width: 120 },
        { text: "დოზირება", width: 50 },
        { text: "გახარჯ", width: 45 },
      ],
      rows: formData.pests.map((pest) => [
        { text: pest.name },
        { text: pest.monitor },
        { text: pest.spray },
        { text: pest.gel },
        { text: "" },
        { text: "" },
        { text: "" },
      ]),
    };

    const tableHeight = drawer.drawTable(MARGIN_X, cursorY, tableData, {
      fontSize: 8,
      rowHeight: 18,
    });
    cursorY -= tableHeight + 20;

    // Check if we need a new page
    if (cursorY < 250) {
      page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      cursorY = PAGE_HEIGHT - MARGIN_Y;
    } */

  page.drawRectangle({
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
  );
  cursorY -= PEST_TABLE_COL_HEIGHT * 4;
  // === SPACES INSPECTED ===
  drawer.drawText(
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
  cursorY -= 20;

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
