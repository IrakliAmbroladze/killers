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
    x: MARGIN_X,
    y: cursor.y,
    columns: [
      {
        header: { text: "N", width: 15, align: "center" },
        render: (row) => ({ type: "text", text: row.id, align: "center" }),
      },
      {
        header: { text: "ბუზი", width: 45, align: "center" },
        render: (row) => ({ type: "text", text: row.fly, align: "center" }),
      },
      {
        header: { text: "ქინქლა", width: 40, align: "center" },
        render: (row) => ({ type: "text", text: row.kinkla, align: "center" }),
      },
      {
        header: { text: "", width: 40, align: "center" },
        render: (row) => ({ type: "text", text: row.blank, align: "center" }),
      },
      {
        header: { text: "ფირფიტა", width: 40, align: "center" },
        render: (row) => ({ type: "checkbox", checked: row.plate_was_changed }),
      },
    ],
  });

  drawCapturedTable({
    title: "მხოხავი მავნებლის მონიტორი",
    monitorData: formData.crawling_pest_monitor,
    drawer,
    x: MARGIN_X + 185,
    y: cursor.y,
    columns: [
      {
        header: { text: "N", width: 15, align: "center" },
        render: (row) => ({ type: "text", text: row.id, align: "center" }),
      },
      {
        header: { text: "ჭიანჭველა", width: 45, align: "center" },
        render: (row) => ({ type: "text", text: row.ant, align: "center" }),
      },
      {
        header: { text: "ტარაკანი", width: 40, align: "center" },
        render: (row) => ({
          type: "text",
          text: row.cockroach,
          align: "center",
        }),
      },
      {
        header: { text: "", width: 40, align: "center" },
        render: (row) => ({ type: "text", text: row.blank, align: "center" }),
      },
      {
        header: { text: "ფირფიტა", width: 40, align: "center" },
        render: (row) => ({ type: "checkbox", checked: row.plate_was_changed }),
      },
    ],
  });
  drawCapturedTable({
    title: "მღრღნელის მონიტორი",
    monitorData: formData.crawling_pest_monitor,
    drawer,
    x: MARGIN_X + 370,
    y: cursor.y,
    columns: [
      {
        header: { text: "N", width: 15, align: "center" },
        render: (row) => ({ type: "text", text: row.id, align: "center" }),
      },
      {
        header: { text: "დაჭერილი", width: 45, align: "center" },
        render: (row) => ({ type: "text", text: row.ant, align: "center" }),
      },
      {
        header: { text: "ფირფიტა", width: 40, align: "center" },
        render: (row) => ({
          type: "checkbox",
          checked: row.plate_was_changed,
        }),
      },
      {
        header: { text: "ქიმიკატი", width: 45, align: "center" },
        render: (row) => ({ type: "checkbox", checked: row.plate_was_changed }),
      },
    ],
  });
};
