import { PDFDocument, PDFPage } from "pdf-lib";
import { PDFDrawer } from "../classes/PDFDrawer";
import { MARGIN_X, PAGE_WIDTH } from "../constants/pdfPageDimensions";
import { Cursor } from "../types/Cursor";
import { AcceptanceFormData } from "@/types";

type DrawSignaturesProps = {
  drawer: PDFDrawer;
  cursor: Cursor;
  pdf: PDFDocument;
  formData: AcceptanceFormData;
  page: PDFPage;
};

export const drawSignatures = async ({
  drawer,
  cursor,
  pdf,
  formData,
  page,
}: DrawSignaturesProps) => {
  // === SIGNATURES ===
  /* if (cursorY < 200) {
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    cursorY = PAGE_HEIGHT - MARGIN_Y;
  }*/

  drawer.drawText("დამკვეთის წარმომადგენელი", MARGIN_X, cursor.y, {
    size: 11,
    bold: true,
  });
  drawer.drawText("შემსრულებელი", PAGE_WIDTH / 2 + 50, cursor.y, {
    size: 11,
    bold: true,
  });
  cursor.move(20);

  // Customer info
  drawer.drawText(
    `სახელი, გვარი: ${formData.customer.name}`,
    MARGIN_X,
    cursor.y,
    {
      size: 9,
    },
  );
  cursor.move(15);
  drawer.drawText(
    `პირადი ნომერი: ${formData.customer.personalNumber}`,
    MARGIN_X,
    cursor.y,
    { size: 9 },
  );
  cursor.move(20);

  drawer.drawText("ხელმოწერა", MARGIN_X, cursor.y, { size: 9 });
  drawer.drawText("ხელმოწერა", PAGE_WIDTH / 2 + 50, cursor.y, { size: 9 });
  if (formData.customer.signature && formData.executor.signature) {
    const customerPngBytes = Uint8Array.from(
      atob(formData.customer.signature.replace(/^data:image\/png;base64,/, "")),
      (c) => c.charCodeAt(0),
    );
    const executorPngBytes = Uint8Array.from(
      atob(formData.executor.signature.replace(/^data:image\/png;base64,/, "")),
      (c) => c.charCodeAt(0),
    );
    cursor.move(10);
    const customerImg = await pdf.embedPng(customerPngBytes);
    const executorImg = await pdf.embedPng(executorPngBytes);

    const sigWidth = 150;
    const sigHeight = 75;

    page.drawImage(customerImg, {
      x: MARGIN_X,
      y: cursor.y - sigHeight,
      width: sigWidth,
      height: sigHeight,
    });

    page.drawImage(executorImg, {
      x: PAGE_WIDTH / 2 + 50,
      y: cursor.y - sigHeight,
      width: sigWidth,
      height: sigHeight,
    });
  }
};
