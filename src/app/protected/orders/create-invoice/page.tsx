import OrderForm from "@/components/OrderForm";
import { Sheets_Invoice } from "@/types/invoices";
import Link from "next/link";
import React from "react";

const CreateInvoice = () => {
  const initialFormData: Sheets_Invoice = {
    date: "",
    customer: "",
    identity: "",
    address: "",
    payment: "გადარიცხვა",
    items: "",
    total: "",
    provider: "405049923 LTD KILL (VAT)",
    seller: "",
    phone: "",
    email: "",
    delivery_date: "",
    plan_time: "",
    approve: "",
    order_id: "",
  };
  return (
    <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center max-h-[80vh] w-[90%] md:w-[50%] overflow-y-auto">
        <div className="flex justify-end">
          <Link href="./" className="font-semibold cursor-pointer">
            X
          </Link>
        </div>
        <OrderForm
          title={"Create an Order"}
          initialFormData={initialFormData}
          status="add"
        />
      </div>
    </div>
  );
};

export default CreateInvoice;
