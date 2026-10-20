import { NextResponse } from "next/server";
import { AcceptanceFormData } from "@/types";
import { buildAcceptancePdf } from "@/pdf/builders/acceptanceBuilder";
import { validateServices } from "@/utils/validateServices";
import { validatePests } from "@/utils/validatePests";
import { validateProducts } from "@/utils/validateProducts";
import { validateSpaces } from "@/utils/validateSpaces";

export async function POST(req: Request) {
  try {
    const formData: AcceptanceFormData = await req.json();
    console.dir(formData.pests, { depth: null });
    console.dir(formData.products, { depth: null });
    if (!validateServices(formData.services)) {
      return NextResponse.json(
        { error: "მინიმუმ ერთი პროცედურა უნდა იყოს მონიშნული" },
        { status: 400 },
      );
    }

    if (!validatePests(formData.pests)) {
      return NextResponse.json(
        {
          error: "მინიმუმ ერთი გატარებული ღონისძიება უნდა იყოს მონიშნული",
        },
        { status: 400 },
      );
    }

    if (!validateProducts(formData.products)) {
      return NextResponse.json(
        {
          error: "მინიმუმ ერთი გახარჯული რაოდენობა უნდა იყოს მითითებული",
        },
        { status: 400 },
      );
    }

    if (!validateSpaces(formData.spaces)) {
      return NextResponse.json(
        { error: "მინიმუმ ერთი სივრცე უნდა იყოს მონიშნული" },
        { status: 400 },
      );
    }

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
