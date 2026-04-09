import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import { MARGIN_X } from "@/pdf/constants/pdfPageDimensions";
import { Cursor } from "@/pdf/types/Cursor";
import { AcceptanceFormData } from "@/types";
import { drawCapturedTable } from "./drawCapturedTable";

type drawCapturedInsectsTableProps = {
  drawer: PDFDrawer;
  cursor: Cursor;
  formData: AcceptanceFormData;
};

export const drawCapturedInsectsTable = ({
  drawer,
  cursor,
  formData,
}: drawCapturedInsectsTableProps) => {
  drawCapturedTable({
    title: "მფრინავი მავნებლის მონიტორი",
    monitorData: formData.flying_pest_monitor,
    drawer,
    x: MARGIN_X - 20,
    y: cursor.y,
    columns: [
      {
        header: { text: "N", width: 50, align: "center" },
        render: (row) => ({ type: "text", text: row.id, align: "center" }),
      },
      {
        header: { text: "ბუზი", width: 50, align: "center" },
        render: (row) => ({ type: "text", text: row.fly, align: "center" }),
      },
      {
        header: { text: "ქინქლა", width: 50, align: "center" },
        render: (row) => ({ type: "text", text: row.kinkla, align: "center" }),
      },
      {
        header: { text: "ფირფიტა", width: 50, align: "center" },
        render: (row) => ({ type: "checkbox", checked: row.plate_was_changed }),
      },
    ],
  });

  drawCapturedTable({
    title: "მползავი მავნებლის მონიტორი",
    monitorData: formData.crawling_pest_monitor,
    drawer,
    x: MARGIN_X + 210,
    y: cursor.y,
    columns: [
      {
        header: { text: "N", width: 50, align: "center" },
        render: (row) => ({ type: "text", text: row.id, align: "center" }),
      },
      {
        header: { text: "ჭიანჭველა", width: 100, align: "center" },
        render: (row) => ({ type: "text", text: row.ant, align: "center" }),
      },
      {
        header: { text: "ტარაკანი", width: 100, align: "center" },
        render: (row) => ({
          type: "text",
          text: row.cockroach,
          align: "center",
        }),
      },
      {
        header: { text: "შეიცვალა ფირფიტა", width: 120, align: "center" },
        render: (row) => ({ type: "checkbox", checked: row.plate_was_changed }),
      },
    ],
  });
};
