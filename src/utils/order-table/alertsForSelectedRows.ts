import { validDateRegex } from "@/constants/regex";
import type { OrderExtended } from "@/types";

export const alertsForSelectedRows = (rs: OrderExtended[]) => {
  if (rs.length > 1) {
    const draftDate = new Date().toISOString().split("T")[0];
    const input = prompt(
      `შეიყვანე შეკვეთის მიღების თარიღი YYYY-MM-DD (მაგ: ${draftDate}):`,
      draftDate ?? ""
    );
    if (!input) {
      alert("შეკვეთის აღების თარიღი არ მიგითითებია");
      return undefined;
    }
    if (!validDateRegex.test(input)) {
      alert("თარიღის ფორმატი უნდა იყოს YYYY-MM-DD");
      return undefined;
    }
    return input;
  }
};
