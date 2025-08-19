import React from "react";
import { Customer } from "@/types";

type Props = {
  results: Customer[];
  onSelect: (customer: Customer) => void;
};

export const CustomerSearchModal: React.FC<Props> = ({ results, onSelect }) => {
  if (!results.length) return null;

  return (
    <div className="absolute bg-white shadow-lg border rounded w-64 max-h-60 overflow-y-auto z-50">
      {results.map((customer) => (
        <div
          key={customer.id}
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(customer)}
        >
          <strong>{customer.id}</strong> - {customer.name}
        </div>
      ))}
    </div>
  );
};
