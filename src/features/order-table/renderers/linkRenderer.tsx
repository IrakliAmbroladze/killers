import type { ICellRendererParams } from "ag-grid-community";
import type { Sheets_Invoice } from "@/types/invoices";

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

  const open = async () => {
    const win = window.open("", "_blank");
    try {
      const res = await fetch(`/api/document-url?orderId=${orderId}`);
      if (!res.ok) throw new Error(`document-url failed (${res.status})`);
      const { url } = await res.json();
      if (win) win.location.href = url;
    } catch (e) {
      console.error(e);
      win?.close();
    }
  };

  return (
    <button type="button" onClick={open} className="cursor-pointer">
      📄
    </button>
  );
};
