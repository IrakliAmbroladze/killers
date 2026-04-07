import { PDFDrawer } from "@/pdf/classes/PDFDrawer";
import { MARGIN_X, PAGE_WIDTH } from "@/pdf/constants/pdfPageDimensions";
import { Cursor } from "@/pdf/types/Cursor";
import { AcceptanceFormData } from "@/types";
import { drawInpectionTable } from "./OutdoorInspectionTable";
import {
  inspectionKitchen,
  inspectionOutdoor,
  kitchenCheckboxes,
  outdoorCheckboxes,
} from "./constants/inspection-table";

type drawInpectionAreaTableProps = {
  drawer: PDFDrawer;
  cursor: Cursor;
  formData: AcceptanceFormData;
};

export const drawInpectionAreaTable = ({
  drawer,
  cursor,
  formData,
}: drawInpectionAreaTableProps) => {
  const FIRST_COLUMN_WIDTH = 20;
  const SECOND_COLUMN_WIDTH = PAGE_WIDTH - MARGIN_X * 2 - FIRST_COLUMN_WIDTH;

  drawInpectionTable({
    drawer,
    x: MARGIN_X,
    y: cursor.y,
    formData,
    FIRST_COLUMN_WIDTH,
    SECOND_COLUMN_WIDTH,
    title: "გარე ტერიტორია",
    areas: inspectionOutdoor,
    checkboxes: outdoorCheckboxes,
  });

  drawInpectionTable({
    drawer,
    x: MARGIN_X,
    y: cursor.y - 145,
    formData,
    FIRST_COLUMN_WIDTH,
    SECOND_COLUMN_WIDTH,
    title: "სამზარეულო",
    areas: inspectionKitchen,
    checkboxes: kitchenCheckboxes,
    rowNumber: 7,
  });
};
