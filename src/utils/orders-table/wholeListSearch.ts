import { Sheets_Invoice } from "@/types/invoices";

export const wholeListSearch = (list: Sheets_Invoice[], serchTerm: string) => {
  return list.filter((itemObj) =>
    Object.values(itemObj)
      .filter((val) => typeof val === "string" || typeof val === "number")
      .some((val) =>
        val?.toString().toLowerCase().includes(serchTerm.toLowerCase())
      )
  );
};
