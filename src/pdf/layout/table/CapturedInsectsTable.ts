import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import { Cursor } from "@/pdf/types/Cursor";
import { AcceptanceFormData } from "@/types";

type drawCapturedInsectsTableProps = {
  drawer: PDFDrawer;
  cursor: Cursor;
  formData: AcceptanceFormData;
};

export const drawCapturedInsectsTable = ({
  drawer,
  cursor,
  formData,
}: drawCapturedInsectsTableProps) => {};
