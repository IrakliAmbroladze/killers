import { PDFDocument, PDFFont, PDFImage, PDFPage, rgb } from "pdf-lib";
import { PdfTableCell, TableHeaderCell } from "../types/Table";

export class PDFDrawer {
  constructor(
    private pdf: PDFDocument,
    private page: PDFPage,
    private font: PDFFont,
    private boldFont: PDFFont,
  ) {}

  drawText(
    text: string,
    x: number,
    y: number,
    options: {
      size?: number;
      bold?: boolean;
      color?: [number, number, number];
      align?: "left" | "center" | "right";
      maxWidth?: number;
    } = {},
  ): number {
    const {
      size = 10,
      bold = false,
      color = [0, 0, 0],
      align = "left",
      maxWidth,
    } = options;

    const activeFont = bold ? this.boldFont : this.font;
    let finalX = x;

    if (align === "center" && maxWidth) {
      const textWidth = activeFont.widthOfTextAtSize(text, size);
      finalX = x + (maxWidth - textWidth) / 2;
    } else if (align === "right" && maxWidth) {
      const textWidth = activeFont.widthOfTextAtSize(text, size);
      finalX = x + maxWidth - textWidth;
    }

    this.page.drawText(text, {
      x: finalX,
      y,
      size,
      font: activeFont,
      color: rgb(color[0], color[1], color[2]),
    });

    return activeFont.heightAtSize(size);
  }

  drawParagraph(
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    options: { size?: number; bold?: boolean; lineHeight?: number } = {},
  ): number {
    const { size = 10, bold = false, lineHeight = 1.4 } = options;
    const activeFont = bold ? this.boldFont : this.font;
    const words = text.split(" ");
    let line = "";
    let currentY = y;
    let linesDrawn = 0;

    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      const lineWidth = activeFont.widthOfTextAtSize(testLine, size);

      if (lineWidth > maxWidth && line) {
        this.drawText(line, x, currentY, { size, bold });
        currentY -= size * lineHeight;
        linesDrawn++;
        line = word;
      } else {
        line = testLine;
      }
    }

    if (line) {
      this.drawText(line, x, currentY, { size, bold });
      linesDrawn++;
    }

    return linesDrawn * size * lineHeight;
  }

  drawCheckbox(
    x: number,
    y: number,
    state: "checked" | "crossed" | "NA" | "blank",
    size: number = 10,
  ): void {
    this.page.drawRectangle({
      x,
      y,
      width: size,
      height: size,
      borderWidth: 0.5,
      borderColor: rgb(0, 0, 0),
      color: rgb(1, 1, 1),
    });

    if (state === "checked") {
      this.page.drawLine({
        start: { x: x + 1, y: y + size / 2 },
        end: { x: x + size / 2, y },
        thickness: 1,
        color: rgb(0, 0, 0),
      });

      this.page.drawLine({
        start: { x: x + size / 2, y },
        end: { x: x + size - 1, y: y + size - 1 },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
    }
  }

  drawTable(
    x: number,
    y: number,
    data: {
      headers: TableHeaderCell[];
      rows: PdfTableCell[][];
    },
    options: {
      fontSize?: number;
      rowHeight?: number;
      headerBold?: boolean;
    } = {},
  ): number {
    const { fontSize = 9, rowHeight = 20, headerBold = true } = options;
    let currentY = y;
    let currentX = x;
    const marginLeft: number = 2;
    const marginRight: number = 2;

    // Draw headers
    data.headers.forEach((header) => {
      const cellWidth = header.width * (header.colspan || 1);

      this.page.drawRectangle({
        x: currentX,
        y: currentY - rowHeight,
        width: cellWidth,
        height: rowHeight,
        borderWidth: 0.5,
        borderColor: rgb(0, 0, 0),
      });
      const headerX =
        header.align === "left"
          ? currentX + marginLeft
          : header.align === "right"
            ? currentX - marginRight
            : currentX;

      this.drawText(header.text, headerX, currentY - rowHeight + 6, {
        size: fontSize,
        bold: headerBold,
        maxWidth: header.width,
        align: header.align || "left",
      });

      currentX += cellWidth;
    });

    currentY -= rowHeight;

    // Draw rows
    data.rows.forEach((row) => {
      currentX = x;

      row.forEach((cell, cellIndex) => {
        const cellWidth =
          data.headers[cellIndex]?.width * (cell.colspan || 1) ||
          data.headers[cellIndex]?.width;

        this.page.drawRectangle({
          x: currentX,
          y: currentY - rowHeight,
          width: cellWidth,
          height: rowHeight,
          borderWidth: 0.5,
          borderColor: rgb(0, 0, 0),
        });

        /*     this.drawText(cell.text, currentX + 4, currentY - rowHeight + 6, {
          size: fontSize,
        });*/

        const rowX =
          cell.align === "left"
            ? currentX + marginLeft
            : cell.align === "right"
              ? currentX - marginRight
              : currentX;
        switch (cell.type) {
          case "text":
            this.drawText(cell.text, rowX, currentY - rowHeight + 6, {
              size: fontSize,
              maxWidth: cellWidth,
              align: cell.align || "left",
            });
            break;

          case "checkbox":
            this.drawCheckbox(
              currentX + cellWidth / 2 - 4,
              currentY - rowHeight / 2 - 4,
              cell.checked ? "checked" : "blank",
              8,
            );
            break;
        }
        currentX += cellWidth;
      });

      currentY -= rowHeight;
    });

    return y - currentY;
  }

  drawImage(
    image: PDFImage,
    x: number,
    y: number,
    options?: { width?: number; height?: number },
  ): number {
    let width = options?.width;
    let height = options?.height;

    if (width && !height) {
      height = (image.height / image.width) * width;
    }

    if (height && !width) {
      width = (image.width / image.height) * height;
    }

    width ??= image.width;
    height ??= image.height;

    this.page.drawImage(image, { x, y, width, height });
    return height;
  }
}
