import { PDFDrawer } from "../classes/PDFDrawer";
import { MARGIN_X, PAGE_WIDTH } from "../constants/pdfPageDimensions";
import { Cursor } from "../types/Cursor";

type BaseDraw = {
  drawer: PDFDrawer;
  cursor: Cursor;
};

type DrawDocTitle = BaseDraw & {
  title: string;
  font_size: number;
};

export const drawDocTitle = ({
  drawer,
  title,
  cursor,
  font_size,
}: DrawDocTitle) => {
  cursor.move(font_size);
  drawer.drawText(title, 0, cursor.y, {
    size: font_size,
    bold: true,
    align: "center",
    maxWidth: PAGE_WIDTH,
  });

  cursor.move(30);
};

type DrawDate = BaseDraw & {
  date: string;
};

export const drawDate = ({ drawer, date, cursor }: DrawDate) => {
  drawer.drawText(
    `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`,
    MARGIN_X,
    cursor.y + 15,
    {
      size: 10,
      align: "right",
      maxWidth: PAGE_WIDTH - MARGIN_X * 2,
    },
  );
  cursor.move(15);
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
