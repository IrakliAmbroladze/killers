import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "fs";
import path from "path";

const PAGE_WIDTH = 595; // A4
const PAGE_HEIGHT = 842;
const MARGIN_X = 50;
let cursorY = PAGE_HEIGHT - 50; // vertical flow cursor

export async function POST(req: Request) {
  try {
    const { customerName, orderId, customerSignature, executorSignature } =
      await req.json();

    const safeCustomerName = customerName ?? "—";
    const safeOrderId = orderId ?? "—";

    const pdf = await PDFDocument.create();

    // ✅ REGISTER FONTKIT (THIS IS REQUIRED)
    pdf.registerFontkit(fontkit);

    // ✅ LOAD TTF FONT
    const fontPath = path.join(
      process.cwd(),
      "src/assets/fonts/NotoSansGeorgian-Regular.ttf",
    );
    const fontBytes = fs.readFileSync(fontPath);

    const page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

    // const font = await pdf.embedFont(StandardFonts.Helvetica);
    // const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);
    //
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

    const drawText = (text: string, size = 12) => {
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

    drawText("მიღება-ჩაბარების აქტი", 20);
    cursorY -= 10;

    drawText(`Order ID: ${orderId}`, 11);
    drawText(`თარიღი: ${new Date().toLocaleDateString()}`, 11);

    drawDivider();

    /* ------------------ BODY TEXT ------------------ */

    drawText(
      `ერთი მხრივ "${safeCustomerName}" და მეორე მხრივ შპს "ქილ" ვადასტურებთ, რომ შემსრულებელმა მიაწოდა, ხოლო დამკვეთმა მიიღო შესაბამისი მომსახურება.`,
      12,
    );

    cursorY -= 10;

    drawText("მომსახურების ტიპები:", 13);
    drawText("• დეზინსექცია");
    drawText("• დერატიზაცია");
    drawText("• დეზინფექცია");
    drawText("• ქვეწარმავლების პრევენცია");

    drawDivider();

    /* ------------------ SIGNATURES ------------------ */

    drawText("ხელმოწერები", 14);
    cursorY -= 10;

    // Decode base64
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

    // Customer
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

    // Executor
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
