import type { ICellRendererParams } from "ag-grid-community";
import type { Sheets_Invoice } from "@/types/invoices";
import { openAcceptanceDocument } from "@/utils/openAcceptanceDocument";

export const documentLinkRenderer = (
  props: ICellRendererParams<Sheets_Invoice & { id: string }>,
) => {
  const value: string | undefined = props.value;
  if (!value) return null;

  if (value.startsWith("http")) {
    return (
      <a href={value} target="_blank" rel="noopener noreferrer">
        📄
      </a>
    );
  }

  const orderId = props.data?.id;
  if (!orderId) return null;

  return (
    <button
      type="button"
      onClick={() => openAcceptanceDocument({ orderId })}
      className="cursor-pointer"
    >
      📄
    </button>
  );
};
