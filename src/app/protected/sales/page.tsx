"use client";
import React, { useEffect, useState } from "react";
import { Sheets_Invoice } from "@/types/invoices";
import InvoiceForm from "@/components/invoice-form";
import OrdersList from "@/components/orders-list";

const Sales = () => {
  const [invoices, setInvoices] = useState<Sheets_Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("/api/proxy/fetch-data");
        const data = await response.json();
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
            className="hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out bg-gray-300 text-black p-3 rounded-lg cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            create-invoice
          </button>
          <OrdersList invoices={invoices} />
        </ul>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center max-h-[80vh] w-[90%] md:w-[50%] overflow-y-auto">
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
