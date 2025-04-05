import { Sheets_Invoice } from "@/types/invoices";
import React from "react";

const Cart = ({ invoice }: { invoice: Sheets_Invoice }) => {
  return (
    <div className="flex flex-col">
      <div>date: {invoice.date}</div>
      <div>customer: {invoice.customer}</div>
      <div>ID: {invoice.identity}</div>
      <div>phone: {invoice.phone}</div>
      <div>address: {invoice.address}</div>
      <div>provider: {invoice.provider}</div>
      <div>email: {invoice.email}</div>
      <div>payment: {invoice.payment}</div>
      <div>items: {invoice.items}</div>
      <div>total: {invoice.total}</div>
      <div>seller: {invoice.seller}</div>
      <div>delivery_date: {invoice.delivery_date}</div>
      <div>technician: {invoice.technician}</div>
      <div>
        {invoice.document && (
          <>
            document:{" "}
            <a
              href={invoice.document}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-words"
            >
              📄 View document
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
