"use client";
import { Sheets_Invoice } from "@/types/invoices";
import { JSX, useState } from "react";

const dropdownOptions = [
  "",
  "Oto",
  "GioNew",
  "Dato",
  "GioJoji",
  "Oto GioNew",
  "Oto Dato",
  "Oto GioJoji",
  "GioNew Dato",
  "GioNew GioJoji",
  "Dato GioJoji",
  "Oto GioNew Dato",
  "Oto GioNew GioJoji",
  "Oto Dato GioJoji",
  "GioNew Dato GioJoji",
  "Oto GioNew Dato GioJoji",
];

export default function InvoiceForm({
  initialFormData,
  status,
  updateInvoice,
  index,
}: {
  initialFormData: Sheets_Invoice;
  status: string;
  updateInvoice?: (updatedInvoice: Sheets_Invoice, index: number) => void;
  index?: number;
}): JSX.Element {
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message || `Invoice ${status}ed successfully!`);
      if (status === "add") {
        setFormData(initialFormData);
      }

      setTimeout(() => setMessage(""), 2500);
      if (status === "update") {
        if (updateInvoice) {
          if (index !== undefined) {
            updateInvoice(formData, index);
          }
        }
      }
    } catch (error) {
      console.error(error);
      setMessage("Error submitting invoice.");
      setTimeout(() => setMessage(""), 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Invoice Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4">
          <div className="space-y-4">
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              name="customer"
              placeholder="Customer Name"
              value={formData.customer}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              name="identity"
              placeholder="Customer ID"
              value={formData.identity}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              name="phone"
              placeholder="+995 555 ..."
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />

            <input
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="address"
              placeholder="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <select
              name="payment"
              defaultValue="გადარიცხვა"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="გადარიცხვა">გადარიცხვა</option>
              <option value="ხელზე">ხელზე</option>
            </select>
          </div>
          <div className="space-y-4">
            <input
              name="items"
              placeholder="items"
              value={formData.items}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              name="total"
              type="number"
              placeholder="Total Amount"
              value={formData.total}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <select
              name="provider"
              defaultValue="405049923 LTD KILL (VAT)"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="405049923 LTD KILL (VAT)">
                405049923 LTD KILL (VAT)
              </option>
              <option value="405140217 LTD KILLER">405140217 LTD KILLER</option>
            </select>
            <input
              name="seller"
              placeholder="seller"
              value={formData.seller}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <div className="flex">
              <label htmlFor="delivery-date">delivery date</label>
              <input
                name="delivery_date"
                type="date"
                value={formData.delivery_date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex">
              <label htmlFor="technician">Tech.</label>
              <select
                name="technician"
                value={formData.technician}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                {dropdownOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <input
              name="document"
              placeholder="document"
              value={formData.document}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting ? "bg-gray-300" : "bg-blue-500"
          } text-white p-2 rounded cursor-pointer `}
        >
          {isSubmitting ? "Submitting..." : "Submit Invoice"}
        </button>
      </form>
      {message && (
        <p className="mt-3 text-center text-green-500">
          {JSON.parse(message).message}
        </p>
      )}
    </div>
  );
}
