import type { OrderExtended } from "@/types";

export const alertsForSelectedRows = (rs: OrderExtended[]) => {
  if (rs.length === 0) {
    alert("მონიშნე დასაკოპირებელი მინიმუმ ერთი შეკვეთა.");
    return false;
  }
  if (rs.length > 1) {
    const input = prompt(
      "შეიყვანე შეკვეთის მიღების თარიღი (მაგ: 202505):",
      rs[0].created_at ?? ""
    );
    if (!input) {
      alert("შეკვეთის აღების თარიღი არ მიგითითებია");
      return false;
    }
  }
  return true;
};
