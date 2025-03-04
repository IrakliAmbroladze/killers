"use client";

import { useState, useEffect } from "react";
import { Customer } from "@/types/customers";

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/api/customers/fetch-customers");

        if (!response.ok) throw new Error("Failed to fetch data");
        const { data } = await response.json();

        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Customers
      </h1>

      {loading ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          Loading...
        </p>
      ) : customers.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          No customers found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">
                  ID
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">
                  Name
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.identity}
                  className="odd:bg-gray-100 dark:odd:bg-gray-800 text-black dark:text-gray-200"
                >
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    {customer.identity}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    {customer.name}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    {customer.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Customers;
