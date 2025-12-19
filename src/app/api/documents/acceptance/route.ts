// src/app/api/documents/acceptance/route.ts
import { NextResponse } from "next/server";
import { PDFDocument, rgb, PDFPage, PDFFont } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "node:fs";
import path from "node:path";

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN_X = 40;
const MARGIN_Y = 40;

interface FormData {
  date: string;
  services: {
    disinsection: boolean;
    deratization: boolean;
    disinfection: boolean;
    subcontractorPrevention: boolean;
  };
  pests: Array<{
    name: string;
    checked: boolean;
    monitor: string;
    spray: string;
    gel: string;
  }>;
  products: Array<{
    name: string;
    checked: boolean;
    dosage: string;
    used: string;
  }>;
  inventory: Array<{
    name: string;
    price: string;
    quantity: string;
  }>;
  spaces: { [key: string]: boolean };
  startTime: string;
  endTime: string;
  address: string;
  customer: {
    name: string;
    personalNumber: string;
    signature: string;
  };
  executor: {
    signature: string;
  };
}

export async function POST(req: Request) {
  try {
    const formData: FormData = await req.json();

    const pdf = await PDFDocument.create();
    pdf.registerFontkit(fontkit);

    // Load fonts
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

    let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    let cursorY = PAGE_HEIGHT - MARGIN_Y;

    // Helper class for drawing
    class PDFDrawer {
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
        // Draw box
        this.page.drawRectangle({
          x,
          y: y - size,
          width: size,
          height: size,
          borderWidth: 1,
          borderColor: rgb(0, 0, 0),
          color: rgb(1, 1, 1),
        });

        // Draw checkmark
        if (checked) {
          this.page.drawText("✓", {
            x: x + 1,
            y: y - size + 1,
            size: size,
            font: this.font,
            color: rgb(0, 0, 0),
          });
        }
      }

      drawTable(
        x: number,
        y: number,
        data: {
          headers: Array<{
            text: string;
            width: number;
            rowspan?: number;
            colspan?: number;
          }>;
          rows: Array<Array<{ text: string; colspan?: number }>>;
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

            this.drawText(cell.text, currentX + 4, currentY - rowHeight + 6, {
              size: fontSize,
            });

            currentX += cellWidth;
          });

          currentY -= rowHeight;
        });

        return y - currentY;
      }
    }

    const drawer = new PDFDrawer(pdf, page, font, boldFont);

    // === HEADER ===
    // Logo would go here if you want to embed it
    cursorY -= 20;

    drawer.drawText("მიღება-ჩაბარების აქტი", PAGE_WIDTH / 2, cursorY, {
      size: 16,
      bold: true,
      align: "center",
      maxWidth: 0,
    });
    cursorY -= 30;

    drawer.drawText(`თარიღი: ${formData.date}`, MARGIN_X, cursorY, {
      size: 10,
    });
    cursorY -= 25;

    // === INTRODUCTORY TEXT ===
    const introText = `ერთი მხრივ "შპს იოლო-18" (ს/კ 405308821; შემდგომში "დამკვეთი") და მეორე მხრივ შპს "ქილ" (ს/კ 405049923; შემდგომში "შემსრულებელი") ვადასტურებთ, რომ შემსრულებელმა მიაწოდა, ხოლო დამკვეთმა მიიღო შემდეგი (მარკირებული/აღნიშნული) სახის მომსახურება:`;

    const textHeight = drawer.drawParagraph(
      introText,
      MARGIN_X,
      cursorY,
      PAGE_WIDTH - MARGIN_X * 2,
      { size: 10 },
    );
    cursorY -= textHeight + 15;

    // === SERVICE CHECKBOXES ===
    const services = [
      { label: "დეზინსექცია", checked: formData.services.disinsection },
      { label: "დერატიზაცია", checked: formData.services.deratization },
      { label: "დეზინფექცია", checked: formData.services.disinfection },
      {
        label: "ქვეწარმავლების პრევენცია",
        checked: formData.services.subcontractorPrevention,
      },
    ];

    const colWidth = (PAGE_WIDTH - MARGIN_X * 2) / 2;
    services.forEach((service, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const xPos = MARGIN_X + col * colWidth;
      const yPos = cursorY - row * 20;

      drawer.drawCheckbox(xPos, yPos, service.checked, 10);
      drawer.drawText(service.label, xPos + 15, yPos - 10, { size: 10 });
    });

    cursorY -= Math.ceil(services.length / 2) * 20 + 15;

    // === MAIN TABLE ===
    drawer.drawText(
      "ტერიტორიაზე ჩატარებული სამუშაოები და სამიზნე მავნებლები:",
      MARGIN_X,
      cursorY,
      { size: 11, bold: true },
    );
    cursorY -= 20;

    // Complex table structure from your HTML
    const tableData = {
      headers: [
        { text: "მავნებელი", width: 100 },
        { text: "მონიტორი", width: 60 },
        { text: "სპრეი", width: 60 },
        { text: "გელი", width: 60 },
        { text: "დასახელება", width: 120 },
        { text: "დოზირება", width: 50 },
        { text: "გახარჯ", width: 45 },
      ],
      rows: formData.pests.map((pest) => [
        { text: pest.name },
        { text: pest.monitor },
        { text: pest.spray },
        { text: pest.gel },
        { text: "" },
        { text: "" },
        { text: "" },
      ]),
    };

    const tableHeight = drawer.drawTable(MARGIN_X, cursorY, tableData, {
      fontSize: 8,
      rowHeight: 18,
    });
    cursorY -= tableHeight + 20;

    // Check if we need a new page
    if (cursorY < 250) {
      page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      cursorY = PAGE_HEIGHT - MARGIN_Y;
    }

    // === SPACES INSPECTED ===
    drawer.drawText(
      "დეტალურად დათვალიერდა და საჭიროებისამებრ დამუშავდა შემდეგი სივრცეები:",
      MARGIN_X,
      cursorY,
      { size: 10, bold: true },
    );
    cursorY -= 20;

    const spacesList = [
      "მიმღები",
      "სასტუმრო ოთახი",
      "სამზარეულო",
      "ოფისი",
      "დერეფანი",
      "რესტორანი",
      "ბარი",
      "ტერასა",
      "სველი წერტილები",
      "საწყობი",
      "საერთო სივრცე",
      "სხვენი",
      "სარდაფი",
      "მარანი",
      "ტექნიკური ოთახი",
      "საწარმო",
      "მომარაგების ოთახი",
      "ნაგავსაყრელი",
      "გარე ტერიტორია",
    ];

    const spaceCols = 5;
    const spaceColWidth = (PAGE_WIDTH - MARGIN_X * 2) / spaceCols;
    spacesList.forEach((space, index) => {
      const col = index % spaceCols;
      const row = Math.floor(index / spaceCols);
      const xPos = MARGIN_X + col * spaceColWidth;
      const yPos = cursorY - row * 18;

      drawer.drawCheckbox(xPos, yPos, formData.spaces[space] || false, 8);
      drawer.drawText(space, xPos + 12, yPos - 8, { size: 7 });
    });

    cursorY -= Math.ceil(spacesList.length / spaceCols) * 18 + 20;

    // === TIME AND ADDRESS ===
    drawer.drawText("დაწყების დრო:", MARGIN_X, cursorY, {
      size: 9,
      bold: true,
    });
    drawer.drawText(formData.startTime, MARGIN_X + 150, cursorY, { size: 9 });
    cursorY -= 18;

    drawer.drawText("დასრულების დრო:", MARGIN_X, cursorY, {
      size: 9,
      bold: true,
    });
    drawer.drawText(formData.endTime, MARGIN_X + 150, cursorY, { size: 9 });
    cursorY -= 18;

    drawer.drawText("ობიექტის მისამართი:", MARGIN_X, cursorY, {
      size: 9,
      bold: true,
    });
    cursorY -= 15;
    drawer.drawText(formData.address, MARGIN_X, cursorY, { size: 9 });
    cursorY -= 30;

    // === SIGNATURES ===
    if (cursorY < 200) {
      page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      cursorY = PAGE_HEIGHT - MARGIN_Y;
    }

    drawer.drawText("დამკვეთის წარმომადგენელი", MARGIN_X, cursorY, {
      size: 11,
      bold: true,
    });
    drawer.drawText("შემსრულებელი", PAGE_WIDTH / 2 + 50, cursorY, {
      size: 11,
      bold: true,
    });
    cursorY -= 20;

    // Customer info
    drawer.drawText(
      `სახელი, გვარი: ${formData.customer.name}`,
      MARGIN_X,
      cursorY,
      {
        size: 9,
      },
    );
    cursorY -= 15;
    drawer.drawText(
      `პირადი ნომერი: ${formData.customer.personalNumber}`,
      MARGIN_X,
      cursorY,
      { size: 9 },
    );
    cursorY -= 20;

    drawer.drawText("ხელმოწერა", MARGIN_X, cursorY, { size: 9 });
    drawer.drawText("ხელმოწერა", PAGE_WIDTH / 2 + 50, cursorY, { size: 9 });
    cursorY -= 10;

    // Embed signatures
    if (formData.customer.signature && formData.executor.signature) {
      const customerPngBytes = Uint8Array.from(
        atob(
          formData.customer.signature.replace(/^data:image\/png;base64,/, ""),
        ),
        (c) => c.charCodeAt(0),
      );
      const executorPngBytes = Uint8Array.from(
        atob(
          formData.executor.signature.replace(/^data:image\/png;base64,/, ""),
        ),
        (c) => c.charCodeAt(0),
      );

      const customerImg = await pdf.embedPng(customerPngBytes);
      const executorImg = await pdf.embedPng(executorPngBytes);

      const sigWidth = 150;
      const sigHeight = 75;

      page.drawImage(customerImg, {
        x: MARGIN_X,
        y: cursorY - sigHeight,
        width: sigWidth,
        height: sigHeight,
      });

      page.drawImage(executorImg, {
        x: PAGE_WIDTH / 2 + 50,
        y: cursorY - sigHeight,
        width: sigWidth,
        height: sigHeight,
      });
    }

    // === SAVE PDF ===
    const pdfBytes = await pdf.save();

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
