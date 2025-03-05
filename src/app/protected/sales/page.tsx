"use client";
import React, { useEffect, useState } from "react";
import { Invoice } from "@/types/invoices";
import InvoiceForm from "@/components/invoice-form";

const Sales = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("/api/invoices/fetch-invoices");
        const { data } = await response.json();
        console.log(data);
        setInvoices(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <div>loading. . . </div>
      ) : (
        <ul className="space-y-4 flex-1 sm:px-5 pt-5 sm:pt-0">
          <button
            className="hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out bg-gray-100 p-3 rounded-lg cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            create-invoice
          </button>
          {invoices.map((invoice) => (
            <li
              key={invoice.id}
              className="p-4 bg-white shadow-md rounded-xl border border-gray-200 hover:bg-gray-50 hover:cursor-pointer"
            >
              <div className="font-semibold text-lg text-gray-800">
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
              </div>
            </li>
          ))}
        </ul>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-h-[80vh] w-[90%] md:w-[50%] overflow-y-auto">
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="font-semibold cursor-pointer"
              >
                X
              </button>
            </div>
            <InvoiceForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;
