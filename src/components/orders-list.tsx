import { Sheets_Invoice } from "@/types/invoices";
import React from "react";

const OrdersList = ({ invoices }: { invoices: Sheets_Invoice[] }) => {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {[...invoices].reverse().map((invoice, index) => (
        <li
          key={index}
          className="p-4 bg-white shadow-md rounded-xl border border-gray-200 hover:bg-gray-50 hover:cursor-pointer font-semibold text-lg text-gray-800 "
        >
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
          </div>
          {/* <div className="font-semibold text-lg text-gray-800">
                Invoice #: {invoice.id}
                </div>
                <div className="text-gray-500 text-sm">Date: {invoice.date}</div>
              <div className="mt-2 text-gray-700">
                <span className="font-medium">Identity:</span>{" "}
                {invoice.customers.identity}
              </div>
              <div className="text-gray-700">
                <span className="font-medium">Customer:</span>{" "}
                {invoice.customers.name}
              </div>
              <div className="text-gray-700">
                <span className="font-medium">Product:</span>{" "}
                {invoice.products.name}
              </div>
              <div className="text-gray-700">
                <span className="font-medium">Price:</span>
                {(invoice.products.price / 100).toFixed(2)} ₾
              </div>
              <div className="text-gray-700">
                <span className="font-medium">Quantity:</span>{" "}
                {invoice.quantity}
              </div> */}
        </li>
      ))}
    </div>
  );
};

export default OrdersList;
