"use client";

import { editCustomer } from "@/lib/editCustomer";
import { Customer } from "@/types";
import { useState } from "react";

export const ContractorStatus = ({ customer }: { customer: Customer }) => {
  const [checkStatus, setCheckStatus] = useState<boolean>(
    customer.contractor ?? false,
  );
  const handleClick = async (testCustomer: Customer) => {
    setCheckStatus((prev) => !prev);
    await editCustomer(testCustomer);
  };
  return (
    <label className="flex w-full justify-around" htmlFor={customer.id}>
      <input
        id={customer.id}
        type="checkbox"
        checked={checkStatus}
        onChange={(e) =>
          handleClick({ ...customer, contractor: e.target.checked })
        }
      />

      {checkStatus ? "Yes" : "No"}
    </label>
  );
};
