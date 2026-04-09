import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import { PdfTableCell, TableHeaderCell } from "@/pdf/types/Table";

type BaseMonitorRow = {
  id: string;
  blank: string;
  plate_was_changed: boolean;
};

type ColumnDef<T> = {
  header: TableHeaderCell;
  render: (row: T) => PdfTableCell;
};

type DrawCapturedTableProps<T extends BaseMonitorRow> = {
  title: string;
  monitorData: T[];
  columns: ColumnDef<T>[];
  drawer: PDFDrawer;
  x: number;
  y: number;
};

export const drawCapturedTable = <T extends BaseMonitorRow>({
  title,
  monitorData,
  columns,
  drawer,
  x,
  y,
}: DrawCapturedTableProps<T>) => {
  console.log(title);
  drawer.drawTable(x, y, {
    headers: columns.map((col) => col.header),
    rows: monitorData.map((row) => columns.map((col) => col.render(row))),
  });
};
