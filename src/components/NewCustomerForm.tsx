"use client";

import { useState } from "react";
import type { Customer } from "@/types";
import { insertCustomer } from "@/lib";
import { useNewCustomerForm } from "@/hooks";

export const NewCustomerForm = () => {
  const initialData = {
    id: "",
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState<Customer>(initialData);
  const { handleChange } = useNewCustomerForm({ setFormData });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(formData.id && formData.name)) {
      alert("შეიყვანე საიდენტიფიკაციოც და დასახელებაც");
      return;
    }
    setFormData(initialData);
    console.log("Form data:", formData);
    try {
      const res = await insertCustomer([formData]);
      if (res?.success) {
        alert("მომხმარებელი წარმატებით დაემატა");
      }
    } catch (error) {
      console.error("Failed to insert order", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">ახალი ინვოისი</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="space-y-1">
            <input
              type="text"
              name="id"
              placeholder="ს/კ"
              onChange={handleChange}
              required
              className="w-full p-1 border rounded"
              value={formData.id ?? ""}
            />
            <input
              type="text"
              name="name"
              placeholder="დასახელება"
              onChange={handleChange}
              required
              className="w-full p-1 border rounded"
              value={formData.name ?? ""}
            />
            <textarea
              name="description"
              placeholder="აღწერა"
              onChange={handleChange}
              className="w-full p-1 border rounded"
              value={formData.description ?? ""}
            />
          </div>
        </div>
        <button
          type="submit"
          className={`w-full bg-black hover:bg-gray-800 text-white active:scale-95 p-1 rounded cursor-pointer `}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewCustomerForm;
