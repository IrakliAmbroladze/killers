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
    checked: boolean,
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

    if (checked) {
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

      this.drawText(header.text, currentX + 4, currentY - rowHeight + 6, {
        size: fontSize,
        bold: headerBold,
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

        switch (cell.type) {
          case "text":
            this.drawText(cell.text, currentX + 4, currentY - rowHeight + 6, {
              size: fontSize,
            });
            break;

          case "checkbox":
            this.drawCheckbox(
              currentX + cellWidth / 2 - 4,
              currentY - rowHeight / 2 - 4,
              cell.checked,
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
    options?: {
      width?: number;
      height?: number;
    },
  ): number {
    const width = options?.width ?? image.width;
    const height = options?.height ?? image.height;

    this.page.drawImage(image, {
      x,
      y,
      width,
      height,
    });

    return height;
  }
}
