import { Sheets_Invoice } from "@/types/invoices";
import React from "react";

const Cart = ({ invoice }: { invoice: Sheets_Invoice }) => {
  return (
    <>
      <td className="p-2">{invoice.date}</td>
      <td className="p-2">{invoice.customer}</td>
      <td className="p-2">{invoice.identity}</td>
      <td className="p-2">{invoice.phone}</td>
      <td className="p-2">{invoice.items}</td>
      <td className="p-2">{invoice.seller}</td>
      <td className="p-2">{invoice.delivery_date}</td>
      <td className="p-2">{invoice.technician}</td>
      <td className="p-2">
        {invoice.document && (
          <a
            href={invoice.document}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            📄
          </a>
        )}
      </td>
    </>
  );
};

export default Cart;
