import { PDFDrawer } from "../classes/PDFDrawer";
import { MARGIN_X, PAGE_WIDTH } from "../constants/pdfPageDimensions";
import { Cursor } from "../types/Cursor";

type BaseDraw = {
  drawer: PDFDrawer;
  cursor: Cursor;
};

type DrawDocTitle = BaseDraw & {
  title: string;
};

export const drawDocTitle = ({ drawer, title, cursor }: DrawDocTitle) => {
  const TEXT_HEIGHT = 14;
  cursor.move(TEXT_HEIGHT + 5);
  drawer.drawText(title, PAGE_WIDTH / 3, cursor.y, {
    size: TEXT_HEIGHT,
    bold: true,
    align: "center",
    maxWidth: 0,
  });
};

type DrawDate = BaseDraw & {
  date: string;
};

export const drawDate = ({ drawer, date, cursor }: DrawDate) => {
  drawer.drawText(`${date} (წწ.თ.დ)`, MARGIN_X, cursor.y, {
    size: 10,
  });
  cursor.move(25);
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
  const introText = `ერთი მხრივ "${customerName}" (ს/კ ${customerId}; შემდგომში "დამკვეთი") და მეორე მხრივ "შპს ქილ" (ს/კ 405049923; შემდგომში "შემსრულებელი") ვადასტურებთ, რომ შემსრულებელმა მიაწოდა, ხოლო დამკვეთმა მიიღო შემდეგი (მარკირებული/აღნიშნული) სახის მომსახურება:`;

  const textHeight = drawer.drawParagraph(
    introText,
    MARGIN_X,
    cursor.y,
    PAGE_WIDTH - MARGIN_X * 2,
    { size: 10 },
  );
  cursor.move(textHeight + 15);
};
