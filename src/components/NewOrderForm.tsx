"use client";
import { useState } from "react";
import { useNewOrderForm, useCustomerSearch } from "@/hooks";
import type { Order, Customer } from "@/types";
import { CustomerSearchModal } from "./CustomerSearchModal";

export const NewOrderForm = () => {
  const initialData = {
    customer_id: "",
    address: "",
    payment_type_id: 1,
    items: "",
    price: 0,
    provider_id: 1,
    seller_id: "f542028a-d20e-4491-a0ec-de6628764736",
    delivery_date: null,
  };

  const [formData, setFormData] = useState<Partial<Order>>(initialData);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const { searchResults, isOpen, searchCustomers, closeSearch } =
    useCustomerSearch();
  const {
    handleSubmit,
    handleChange,
    handleCustomerInput,
    handleSelectCustomer,
    handleCustomerBlur,
  } = useNewOrderForm({
    formData,
    setFormData,
    searchCustomers,
    setCustomer,
    closeSearch,
    initialData,
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">ახალი ინვოისი</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="space-y-1">
            <div className="flex w-full">
              <input
                type="text"
                name="customer_id"
                placeholder="ს/კ ან სახელი"
                onChange={handleCustomerInput}
                onBlur={handleCustomerBlur}
                required
                className="p-1 border rounded"
                value={formData.customer_id ?? ""}
              />
              <div className="p-1">
                {formData.customer_id
                  ? customer
                    ? customer.name
                    : "მომხმარებელი არ არსებობს"
                  : ""}
              </div>
            </div>
            {isOpen && (
              <CustomerSearchModal
                results={searchResults}
                onSelect={handleSelectCustomer}
              />
            )}
            <input
              name="address"
              placeholder="მისამართი"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-1 border rounded"
            />

            <input
              name="phone"
              placeholder="+995 555 ..."
              value={formData.phone ?? ""}
              onChange={handleChange}
              className="w-full p-1 border rounded"
            />
            <input
              name="email"
              placeholder="email"
              value={formData.email ?? ""}
              onChange={handleChange}
              className="w-full p-1 border rounded"
            />
            <select
              itemType="number"
              name="payment_type_id"
              defaultValue={formData.payment_type_id}
              onChange={handleChange}
              required
              className="w-full p-1 border rounded"
            >
              <option value="1">გადარიცხვა</option>
              <option value="2">ხელზე</option>
            </select>
            <input
              name="items"
              placeholder="items"
              value={formData.items ?? ""}
              onChange={handleChange}
              required
              className="w-full p-1 border rounded"
            />
            <input
              name="price"
              type="number"
              placeholder="Total Amount"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-1 border rounded"
            />
            <select
              name="provider_id"
              defaultValue={formData.provider_id}
              onChange={handleChange}
              required
              className="w-full p-1 border rounded"
            >
              <option value="1">405049923 LTD KILL (VAT)</option>
              <option value="2">405140217 LTD KILLER</option>
            </select>

            <div className="flex">
              <label htmlFor="delivery-date">ჩაბარების თარიღი: </label>
              <input
                name="delivery_date"
                type="date"
                value={formData.delivery_date ?? ""}
                onChange={handleChange}
                className=" p-1 border rounded dark:bg-black dark:text-white"
              />
            </div>
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
