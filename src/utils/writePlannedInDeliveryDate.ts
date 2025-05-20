import { Sheets_Invoice } from "@/types/invoices";

export const writePlannedInDeliveryDate = (order: Sheets_Invoice) => {
  let newOrderContent = {};
  if (order.delivery_date === "") {
    newOrderContent = { ...order, delivery_date: "planned" };
    console.log(newOrderContent);
  } else if (order.delivery_date === "planned") {
    newOrderContent = { ...order, delivery_date: "" };
    console.log(newOrderContent);
  }
};
