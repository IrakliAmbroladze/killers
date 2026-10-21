import { NextResponse } from "next/server";
import { AcceptanceFormData } from "@/types";
import { buildAcceptancePdf } from "@/pdf/builders/acceptanceBuilder";
import { validateServices } from "@/utils/validateServices";
import { validatePests } from "@/utils/validatePests";
import { validateProducts } from "@/utils/validateProducts";
import { validateSpaces } from "@/utils/validateSpaces";
import { validateCriteria } from "@/utils/validateCriteria";

export async function POST(req: Request) {
  try {
    const formData: AcceptanceFormData = await req.json();
    console.log({ formData });
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
    if (!validateCriteria(formData.criteria)) {
      return NextResponse.json(
        {
          error: "ინსპექტირებაში ყველა კრიტერიუმი უნდა იყოს მონიშნული",
        },
        { status: 400 },
      );
    }
    if (!formData.customer.name.trim()) {
      return NextResponse.json(
        { error: "დამკვეთის სახელი სავალდებულოა" },
        { status: 400 },
      );
    }

    if (!formData.startTime.trim()) {
      return NextResponse.json(
        { error: "დაწყების დრო სავალდებულოა" },
        { status: 400 },
      );
    }

    if (!formData.endTime.trim()) {
      return NextResponse.json(
        { error: "დასრულების დრო სავალდებულოა" },
        { status: 400 },
      );
    }

    if (!formData.comment.trim()) {
      return NextResponse.json(
        { error: "კომენტარი სავალდებულოა" },
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
