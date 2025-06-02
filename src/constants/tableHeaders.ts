import { TableHeaders } from "@/types/orders-table/TableHeaders";

export const tableHeaders: TableHeaders[] = [
  { display: "Date", value: "date", hidden: false },
  { display: "Customer", value: "customer", hidden: false },
  { display: "Identity", value: "identity", hidden: false },
  { display: "Address", value: "address", hidden: false },
  { display: "Payment", value: "payment", hidden: true },
  { display: "Items", value: "items", hidden: false },
  { display: "Total", value: "total", hidden: false },
  { display: "Provider", value: "provider", hidden: false },
  { display: "Seller", value: "seller", hidden: false },
  { display: "Phone", value: "phone", hidden: true },
  { display: "E-mail", value: "email", hidden: true },
  { display: "Delivery", value: "delivery_date", hidden: false },
  { display: "Tech.", value: "technician", hidden: false },
  { display: "Doc.", value: "document", hidden: false },
  { display: "Order_Id", value: "order_id", hidden: true },
  { display: "Plan_Time", value: "plan_time", hidden: true },
];
