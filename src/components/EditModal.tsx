"use client";
import { Sheets_Invoice } from "@/types/invoices";
import OrderForm from "./OrderForm";

const UpdateModal = ({
  title,
  invoice,
  setOpenModalIndex,
  index,
  status,
}: {
  title: string;
  invoice: Sheets_Invoice;
  setOpenModalIndex: (index: null) => void;
  index: string;
  status: string;
}) => {
  const copyData: Sheets_Invoice = {
    date: new Date().toISOString().split("T")[0],
    customer: invoice.customer,
    identity: invoice.identity,
    address: invoice.address,
    payment: invoice.payment,
    items: invoice.items,
    total: invoice.total,
    provider: invoice.provider,
    seller: invoice.seller,
    phone: invoice.phone,
    email: invoice.email,
    delivery_date: invoice.delivery_date,
    technician: invoice.technician,
    document: invoice.document,
    plan_time: invoice.plan_time,
    approve: invoice.approve,
  };
  const editData: Sheets_Invoice = {
    ...copyData,
    date: `${invoice.date.slice(0, 4)}-${invoice.date.slice(4, 6)}-01`,
    order_id: invoice.order_id,
  };

  const initialFormData: Sheets_Invoice =
    status === "add" ? copyData : editData;

  return (
    <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center">
      <div className=" bg-white text-black p-2 rounded-lg shadow-lg text-center max-h-[80vh] w-[90%] md:w-[50%] overflow-y-auto flex flex-col mt-20">
        <div className="flex justify-end">
          <button
            onClick={() => {
              setOpenModalIndex(null);
            }}
            className="border px-2.5 cursor-pointer hover:bg-gray-200 rounded-md"
          >
            close
          </button>
        </div>
        <OrderForm
          setOpenModalIndex={setOpenModalIndex}
          title={title}
          initialFormData={initialFormData}
          status={status}
          index={index}
        />
      </div>
    </div>
  );
};

export default UpdateModal;
