import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const { customerName, orderId, customerSignature, executorSignature } =
      await req.json();

    const pdf = await PDFDocument.create();
    const page = pdf.addPage([595, 842]); // A4 size (72 DPI)

    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const fontSize = 14;

    // Title
    page.drawText("Acceptance Document", {
      x: 50,
      y: 780,
      size: 20,
      font,
    });

    // Body text
    page.drawText(`Customer: ${customerName}`, {
      x: 50,
      y: 740,
      size: fontSize,
      font,
    });
    page.drawText(`Order ID: ${orderId}`, {
      x: 50,
      y: 720,
      size: fontSize,
      font,
    });
    page.drawText(
      `This document confirms that the customer accepted the order.`,
      {
        x: 50,
        y: 690,
        size: fontSize,
        font,
      },
    );

    // Signature title
    page.drawText("Customer Signature:", {
      x: 50,
      y: 630,
      size: fontSize,
      font,
    });

    // Process signature image
    const cusSignature = customerSignature.replace(
      /^data:image\/png;base64,/,
      "",
    );
    const customerSignatureImage = await pdf.embedPng(cusSignature);

    const execSignature = executorSignature.replace(
      /^data:image\/png;base64,/,
      "",
    );
    const executorSignatureImage = await pdf.embedPng(execSignature);

    page.drawImage(customerSignatureImage, {
      x: 50,
      y: 500,
      width: 250,
      height: 120,
    });

    page.drawImage(executorSignatureImage, {
      x: 50,
      y: 700,
      width: 250,
      height: 120,
    });

    const pdfBytes = await pdf.save();

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="acceptance_${orderId}.pdf"`,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 },
    );
  }
}
