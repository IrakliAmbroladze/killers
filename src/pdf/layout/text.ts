import { PDFDrawer } from "../classes/PDFDrawer";
import { MARGIN_X, PAGE_WIDTH } from "../constants/pdfPageDimensions";
import { Cursor } from "../types/Cursor";

type BaseDraw = {
  drawer: PDFDrawer;
  cursor: Cursor;
};

type DrawDate = BaseDraw & {
  date: string;
};

export const drawDate = ({ drawer, date, cursor }: DrawDate) => {
  drawer.drawText(
    `თარიღი: ${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`,
    MARGIN_X,
    cursor.y + 15,
    {
      size: 10,
      align: "right",
      maxWidth: PAGE_WIDTH - MARGIN_X * 2,
    },
  );
};

type DrawIntro = BaseDraw & {
  customerName: string;
  customerId: string;
};

export const drawIntro = ({
  drawer,
  cursor,
  customerName,
  customerId,
}: DrawIntro) => {
  cursor.move(5);
  const introText = `ერთი მხრივ "${customerName}" (ს/კ ${customerId}; შემდგომში "დამკვეთი") და მეორე მხრივ "შპს ქილ" (ს/კ 405049923; შემდგომში "შემსრულებელი") ვადასტურებთ, რომ შემსრულებელმა მიაწოდა, ხოლო დამკვეთმა მიიღო შემდეგი (მარკირებული/აღნიშნული) სახის მომსახურება:`;

  const textHeight = drawer.drawParagraph(
    introText,
    MARGIN_X,
    cursor.y,
    PAGE_WIDTH - MARGIN_X * 2,
    { size: 10 },
  );
  cursor.move(textHeight + 10);
};

type drawInspectionCustomerNameSectionProps = BaseDraw & {
  font_size: number;
  customer_name: string;
};

export const drawInspectionCustomerNameSection = ({
  drawer,
  cursor,
  font_size,
  customer_name,
}: drawInspectionCustomerNameSectionProps) => {
  cursor.move(font_size);
  drawer.drawText(
    `დასახელება: __________${customer_name}__________`,
    MARGIN_X,
    cursor.y,
    {
      size: font_size,
    },
  );
};
