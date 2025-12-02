"use client";

import { editCustomer } from "@/lib/editCustomer";
import { Customer } from "@/types";
import { useState } from "react";

export const ContractorStatus = ({ customer }: { customer: Customer }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [checkStatus, setCheckStatus] = useState<boolean>(
    customer.contractor ?? false,
  );
  const handleClick = async (testCustomer: Customer) => {
    const previousValue = checkStatus;
    setCheckStatus((prev) => !prev);
    setIsUpdating(true);
    try {
      const response = await editCustomer(testCustomer);
      if (response.status !== "OK") {
        throw new Error("Update failed");
      }
    } catch (error) {
      setCheckStatus(previousValue);

      console.error("Update failed:", error);
      alert("❌ დაფიქსირდა შეცდომა");
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <label className="flex w-full justify-around" htmlFor={customer.id}>
      <input
        id={customer.id}
        type="checkbox"
        checked={checkStatus}
        disabled={isUpdating}
        onChange={(e) =>
          handleClick({ ...customer, contractor: e.target.checked })
        }
      />

      {checkStatus ? "Yes" : "No"}
    </label>
  );
};
