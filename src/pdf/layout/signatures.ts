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
  cursor.move(10);
  const cursor_x = PAGE_WIDTH / 2 + 120;
  const line_y = 12.5;
  drawer.drawText("დამკვეთის წარმომადგენელი", MARGIN_X, cursor.y, {
    size: 10,
    bold: true,
  });
  drawer.drawText("შემსრულებელი", cursor_x, cursor.y, {
    size: 10,
    bold: true,
  });
  cursor.move(line_y);

  // Customer info
  drawer.drawText(
    `სახელი, გვარი: ${formData.customer.representative.name}`,
    MARGIN_X,
    cursor.y,
    {
      size: 9,
    },
  );
  drawer.drawText("შპს ქილ", cursor_x, cursor.y, { size: 9 });
  cursor.move(line_y);
  drawer.drawText(
    `პირადი ნომერი: ${formData.customer.representative.id}`,
    MARGIN_X,
    cursor.y,
    { size: 9 },
  );
  drawer.drawText("ს/კ: 405049923", cursor_x, cursor.y, { size: 9 });
  cursor.move(line_y);

  drawer.drawText("ხელმოწერა", MARGIN_X, cursor.y, { size: 9 });
  drawer.drawText("ხელმოწერა", cursor_x, cursor.y, {
    size: 9,
  });
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
      x: cursor_x - 50,
      y: cursor.y - sigHeight,
      width: sigWidth,
      height: sigHeight,
    });
  }
};
