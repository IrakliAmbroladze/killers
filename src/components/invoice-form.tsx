"use client";
import { useState } from "react";

export default function InvoiceForm() {
  const initialFormData = {
    date: "",
    customer: "",
    identity: "",
    address: "",
    payment: "გადარიცხვა",
    items: "",
    total: "",
    provider: "405049923 LTD KILL (VAT)",
    seller: "",
    telephone: "",
    email: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    setMessage("Submitting...");
    console.log(formData);
    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message || "Invoice submitted successfully!");
      setFormData(initialFormData);
    } catch (error) {
      console.error(error);
      setMessage("Error submitting invoice.");
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
              name="telephone"
              placeholder="+995 555 ..."
              value={formData.telephone}
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
          </div>
          <div className="space-y-4">
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
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Submit Invoice
        </button>
      </form>
      {message && <p className="mt-3 text-center text-green-500">{message}</p>}
    </div>
  );
}
