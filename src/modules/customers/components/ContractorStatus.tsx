"use client";

import { editCustomer } from "@/lib/editCustomer";
import { Customer } from "@/types";
import { useState } from "react";
import Modal from "@/components/ui/modal";

export const ContractorStatus = ({ customer }: { customer: Customer }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [checkStatus, setCheckStatus] = useState<boolean>(
    customer.contractor ?? false,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");

  const updateCustomer = async (testCustomer: Customer) => {
    const previousValue = checkStatus;
    setCheckStatus(testCustomer.contractor ?? false);
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

  const handleChange = (checked: boolean) => {
    if (checkStatus === true && checked === false) {
      setReason("");
      setIsModalOpen(true);
      return;
    }
    updateCustomer({ ...customer, contractor: checked });
  };

  const handleConfirmLeaveReason = async () => {
    if (!reason.trim()) {
      alert("გთხოვთ მიუთითოთ მიზეზი");
      return;
    }
    setIsModalOpen(false);
    await updateCustomer({
      ...customer,
      contractor: false,
      leave_reason: reason.trim(),
    });
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setReason("");
  };

  return (
    <>
      <label className="flex w-full justify-around" htmlFor={customer.id}>
        <input
          id={customer.id}
          type="checkbox"
          checked={checkStatus}
          disabled={isUpdating}
          onChange={(e) => handleChange(e.target.checked)}
        />
        {checkStatus ? "Yes" : "No"}
      </label>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCancelModal}>
          <div className="flex flex-col gap-3 p-4">
            <p>მიუთითე წასვლის მიზეზი:</p>
            <textarea
              className="border rounded p-2 w-full"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 rounded border"
                onClick={handleCancelModal}
                disabled={isUpdating}
              >
                გაუქმება
              </button>
              <button
                className="px-3 py-1 rounded bg-red-600 text-white"
                onClick={handleConfirmLeaveReason}
                disabled={isUpdating}
              >
                დადასტურება
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
