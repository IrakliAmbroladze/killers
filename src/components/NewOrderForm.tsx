"use client";
import { useState } from "react";
import { useNewOrderForm, useCustomerSearch } from "@/hooks";
import type { Order, Customer } from "@/types";
import { CustomerSearchModal } from "./CustomerSearchModal";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { newCustomerPathName } from "@/app/protected/orders/constants/ordersPathName";
import { items } from "@/constants";

export const NewOrderForm = ({ user }: { user: User | null }) => {
  const [isItemsDropdown, setIsItemsDropdown] = useState(true);
  const initialData = {
    customer_id: "",
    address: "",
    payment_type_id: 1,
    items: "",
    price: 0,
    provider_id: 1,
    seller_id: user?.id,
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
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-6 sm:p-8 border border-zinc-100 dark:border-zinc-800 transition-all">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-100 dark:border-zinc-800">
        ახალი ინვოისი
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div className="relative">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="text"
                name="customer_id"
                placeholder="ს/კ ან სახელი"
                onChange={handleCustomerInput}
                onBlur={handleCustomerBlur}
                required
                className="flex-1 px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 dark:text-zinc-100 placeholder:text-zinc-400 transition-all"
                value={formData.customer_id ?? ""}
              />
              <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 min-h-[38px] flex items-center">
                {formData.customer_id ? (
                  customer ? (
                    <span className="inline-flex items-center px-3 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-semibold">
                      {customer.name}
                    </span>
                  ) : (
                    <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 p-2 rounded-lg text-xs">
                      <span className="text-amber-800 dark:text-amber-300">
                        მომხმარებელი არ არსებობს
                      </span>
                      <Link
                        href={newCustomerPathName}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium active:scale-95 px-3 py-1.5 rounded-md transition-all shadow-sm"
                      >
                        დაამატე ახალი
                      </Link>
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>

            {isOpen && (
              <CustomerSearchModal
                results={searchResults}
                onSelect={handleSelectCustomer}
              />
            )}
          </div>

          <div>
            <input
              name="address"
              placeholder="მისამართი"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 dark:text-zinc-100 placeholder:text-zinc-400 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="phone"
              placeholder="+995 555 ..."
              value={formData.phone ?? ""}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 dark:text-zinc-100 placeholder:text-zinc-400 transition-all"
            />
            <input
              name="email"
              placeholder="email"
              value={formData.email ?? ""}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 dark:text-zinc-100 placeholder:text-zinc-400 transition-all"
            />
          </div>

          <div>
            <select
              itemType="number"
              name="payment_type_id"
              defaultValue={formData.payment_type_id}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 dark:text-zinc-100 transition-all cursor-pointer"
            >
              <option value="1">გადარიცხვა</option>
              <option value="2">ხელზე</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            {isItemsDropdown ? (
              <select
                name="items"
                onChange={handleChange}
                defaultValue=""
                required
                className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 dark:text-zinc-100 transition-all cursor-pointer"
              >
                <option value="" disabled hidden>
                  items
                </option>
                {items.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            ) : (
              <input
                name="items"
                placeholder="items"
                value={formData.items ?? ""}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 dark:text-zinc-100 placeholder:text-zinc-400 transition-all"
              />
            )}
            <button
              type="button"
              onClick={() => setIsItemsDropdown((prev) => !prev)}
              className="px-4 py-2.5 text-xs font-semibold whitespace-nowrap bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 rounded-lg transition-all active:scale-95 cursor-pointer"
            >
              {isItemsDropdown ? "manual" : "dropdown"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="price"
              type="number"
              placeholder="Total Amount"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 dark:text-zinc-100 placeholder:text-zinc-400 transition-all"
            />
            <select
              name="provider_id"
              defaultValue={formData.provider_id}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 dark:text-zinc-100 transition-all cursor-pointer"
            >
              <option value="1">405049923 LTD KILL (VAT)</option>
              <option value="2">405140217 LTD KILLER</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <label
              htmlFor="delivery-date"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              ჩაბარების თარიღი:
            </label>
            <input
              name="delivery_date"
              type="date"
              value={formData.delivery_date ?? ""}
              onChange={handleChange}
              className="px-3 py-1.5 text-sm border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold text-sm rounded-xl active:scale-[0.98] transition-all shadow-md cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
