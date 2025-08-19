import type { ICellRendererParams } from "ag-grid-community";
import type { Sheets_Invoice } from "@/types/invoices";

export const documentLinkRenderer = (
  props: ICellRendererParams<Sheets_Invoice>
) => {
  const url = props.value;
  if (!url) return null;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      📄
    </a>
  );
};
