"use client";
import { useState } from "react";

export default function InvoiceForm() {
  const [formData, setFormData] = useState({
    date: "",
    customer: "",
    items: "",
    total: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Submitting...");

    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message || "Invoice submitted successfully!");
      setFormData({ date: "", customer: "", items: "", total: "" });
    } catch (error) {
      console.error(error);
      setMessage("Error submitting invoice.");
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Invoice Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          name="items"
          placeholder="Items"
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Submit Invoice
        </button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
}
