import { handleCopyRows, handleDeleteRows } from "@/utils";

export const bulkActionButtons = [
  { action: handleCopyRows, text: "copy selections" },
  { action: handleDeleteRows, text: "delete selections" },
];
