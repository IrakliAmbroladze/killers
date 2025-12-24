import { NextResponse } from "next/server";
import { AcceptanceFormData } from "@/types";
import { buildAcceptancePdf } from "@/pdf/builders/acceptanceBuilder";

export async function POST(req: Request) {
  try {
    const formData: AcceptanceFormData = await req.json();
    const pdfBytes = await buildAcceptancePdf(formData);

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="acceptance_${formData.date}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      {
        error: "PDF generation failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
