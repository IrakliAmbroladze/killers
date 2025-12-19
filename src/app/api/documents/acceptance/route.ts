import { NextResponse } from "next/server";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "node:fs";
import path from "node:path";

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN_X = 50;
let cursorY = PAGE_HEIGHT - 50; // vertical flow cursor

export async function POST(req: Request) {
  try {
    const { customerName, orderId, customerSignature, executorSignature } =
      await req.json();

    const safeCustomerName = customerName ?? "—";
    const pdf = await PDFDocument.create();
    pdf.registerFontkit(fontkit);
    let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

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

    /* ------------------ helpers ------------------ */

    const drawText = (text: string, size = 10, bold = false) => {
      const activeFont = bold ? boldFont : font;
      page.drawText(text, {
        x: 50,
        y: cursorY,
        size,
        font: activeFont,
        color: rgb(0, 0, 0),
      });
      cursorY -= size + 8;
    };
    const drawDivider = () => {
      cursorY -= 10;
      page.drawLine({
        start: { x: MARGIN_X, y: cursorY },
        end: { x: PAGE_WIDTH - MARGIN_X, y: cursorY },
        thickness: 1,
        color: rgb(0.8, 0.8, 0.8),
      });
      cursorY -= 20;
    };

    const drawParagraph = (text: string, fontSize = 10, bold = false) => {
      const activeFont = bold ? boldFont : font;
      const maxWidth = PAGE_WIDTH - MARGIN_X * 2;

      const words = text.split(" ");
      let line = "";

      for (const word of words) {
        const testLine = line ? `${line} ${word}` : word;
        const lineWidth = activeFont.widthOfTextAtSize(testLine, fontSize);

        if (lineWidth > maxWidth) {
          page.drawText(line, {
            x: MARGIN_X,
            y: cursorY,
            size: fontSize,
            font: activeFont,
            color: rgb(0, 0, 0),
          });
          cursorY -= fontSize + 6;
          line = word;
        } else {
          line = testLine;
        }
      }

      if (line) {
        page.drawText(line, {
          x: MARGIN_X,
          y: cursorY,
          size: fontSize,
          font: activeFont,
          color: rgb(0, 0, 0),
        });
        cursorY -= fontSize + 10;
      }
    };

    const drawCheckbox = (
      x: number,
      y: number,
      checked: boolean,
      size = 12,
    ) => {
      // Box
      page.drawRectangle({
        x,
        y,
        width: size,
        height: size,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
      });

      // Checkmark
      if (checked) {
        page.drawLine({
          start: { x: x + 2, y: y + size / 2 },
          end: { x: x + size / 2, y: y + 2 },
          thickness: 1.5,
        });
        page.drawLine({
          start: { x: x + size / 2, y: y + 2 },
          end: { x: x + size - 2, y: y + size - 2 },
          thickness: 1.5,
        });
      }
    };

    const drawCheckboxWithLabel = (
      label: string,
      checked: boolean,
      fontSize = 10,
    ) => {
      const boxSize = 10;

      drawCheckbox(MARGIN_X, cursorY - boxSize, checked, boxSize);

      page.drawText(label, {
        x: MARGIN_X + boxSize + 8,
        y: cursorY - boxSize + 1,
        size: fontSize,
        font,
      });

      cursorY -= fontSize + 8;
    };

    type TableColumn = {
      header: string;
      width: number;
    };

    type TableRow = string[];

    const drawTable = (
      columns: TableColumn[],
      rows: TableRow[],
      rowHeight = 20,
      fontSize = 9,
    ) => {
      const tableWidth = columns.reduce((s, c) => s + c.width, 0);

      // Header row
      let x = MARGIN_X;

      columns.forEach((col) => {
        page.drawRectangle({
          x,
          y: cursorY - rowHeight,
          width: col.width,
          height: rowHeight,
          borderWidth: 1,
        });

        page.drawText(col.header, {
          x: x + 4,
          y: cursorY - rowHeight + 6,
          size: fontSize,
          font: boldFont,
        });

        x += col.width;
      });

      cursorY -= rowHeight;

      // Data rows
      for (const row of rows) {
        x = MARGIN_X;

        row.forEach((cell, i) => {
          page.drawRectangle({
            x,
            y: cursorY - rowHeight,
            width: columns[i].width,
            height: rowHeight,
            borderWidth: 1,
          });

          page.drawText(cell, {
            x: x + 4,
            y: cursorY - rowHeight + 6,
            size: fontSize,
            font,
          });

          x += columns[i].width;
        });

        cursorY -= rowHeight;

        // Page break safety
        if (cursorY < 80) {
          page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
          cursorY = PAGE_HEIGHT - 50;
        }
      }

      cursorY -= 10;
    };

    /* ------------------ HEADER ------------------ */

    drawText("მიღება-ჩაბარების აქტი", 10);
    cursorY -= 10;

    drawText(`Order ID: ${orderId}`, 11);
    drawText(`თარიღი: ${new Date().toLocaleDateString()}`, 10, false);

    drawDivider();

    /* ------------------ BODY TEXT ------------------ */

    drawParagraph(
      `ერთი მხრივ "${safeCustomerName}" და მეორე მხრივ შპს "ქილ" ვადასტურებთ, რომ შემსრულებელმა მიაწოდა, ხოლო დამკვეთმა მიიღო შესაბამისი მომსახურება.`,
      10,
    );

    cursorY -= 10;

    drawText("მომსახურების ტიპები:", 10, true);

    drawCheckboxWithLabel("დეზინსექცია", true);
    drawCheckboxWithLabel("დერატიზაცია", false);
    drawCheckboxWithLabel("დეზინფექცია", true);
    drawCheckboxWithLabel("ქვეწარმავლების პრევენცია", false);

    drawDivider();

    /*------------------ TABLES --------------------*/
    drawText(
      "ტერიტორიაზე ჩატარებული სამუშაოები და სამიზნე მავნებლები:",
      12,
      true,
    );

    drawTable(
      [
        { header: "მავნებელი", width: 120 },
        { header: "საშუალება", width: 200 },
        { header: "დოზა", width: 80 },
        { header: "შენიშვნა", width: 145 },
      ],
      [
        ["ბუზი", "Killzone", "-", ""],
        ["ტარაკანი", "BROMOBLEU", "-", ""],
        ["ჭიანჭველა", "RATIMOR", "-", ""],
        ["ბაღლინჯო", "RAPTOR GEL", "-", ""],
      ],
    );

    /* ------------------ SIGNATURES ------------------ */

    drawText("ხელმოწერები", 14, true);
    cursorY -= 10;

    const customerPngBytes = Uint8Array.from(
      atob(customerSignature.replace(/^data:image\/png;base64,/, "")),
      (c) => c.charCodeAt(0),
    );

    const executorPngBytes = Uint8Array.from(
      atob(executorSignature.replace(/^data:image\/png;base64,/, "")),
      (c) => c.charCodeAt(0),
    );

    const customerImg = await pdf.embedPng(customerPngBytes);
    const executorImg = await pdf.embedPng(executorPngBytes);

    const sigWidth = 200;
    const sigHeight = 100;

    page.drawText("დამკვეთის წარმომადგენელი", {
      x: MARGIN_X,
      y: cursorY,
      size: 12,
      font: boldFont,
    });

    page.drawImage(customerImg, {
      x: MARGIN_X,
      y: cursorY - sigHeight - 10,
      width: sigWidth,
      height: sigHeight,
    });

    page.drawText("შემსრულებელი", {
      x: PAGE_WIDTH / 2 + 20,
      y: cursorY,
      size: 12,
      font: boldFont,
    });

    page.drawImage(executorImg, {
      x: PAGE_WIDTH / 2 + 20,
      y: cursorY - sigHeight - 10,
      width: sigWidth,
      height: sigHeight,
    });

    /* ------------------ FINALIZE ------------------ */

    const pdfBytes = await pdf.save();

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="acceptance_${orderId}.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 },
    );
  }
}
