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
    const page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

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
      page.drawText(text, {
        x: 50,
        y: cursorY,
        size,
        font,
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

    /* ------------------ HEADER ------------------ */

    drawText("მიღება-ჩაბარების აქტი", 10);
    cursorY -= 10;

    drawText(`Order ID: ${orderId}`, 11);
    drawText(`თარიღი: ${new Date().toLocaleDateString()}`, 11);

    drawDivider();

    /* ------------------ BODY TEXT ------------------ */

    drawText(
      `ერთი მხრივ "${safeCustomerName}" და მეორე მხრივ შპს "ქილ" ვადასტურებთ, რომ შემსრულებელმა მიაწოდა, ხოლო დამკვეთმა მიიღო შესაბამისი მომსახურება.`,
      10,
    );

    cursorY -= 10;

    drawText("მომსახურების ტიპები:", 13);
    drawText("• დეზინსექცია");
    drawText("• დერატიზაცია");
    drawText("• დეზინფექცია");
    drawText("• ქვეწარმავლების პრევენცია");

    drawDivider();

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
