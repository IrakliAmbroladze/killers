"use client";
import { Sheets_Invoice } from "@/types/invoices";
import InvoiceForm from "./invoice-form";

const UpdateModal = ({
  invoice,
  setOpenModalIndex,
  index,
  updateInvoice,
}: {
  invoice: Sheets_Invoice;
  setOpenModalIndex: (index: null) => void;
  index: number;
  updateInvoice: (updatedInvoice: Sheets_Invoice, index: number) => void;
}) => {
  const initialFormData: Sheets_Invoice = {
    row: index + 1,
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
  };

  return (
    <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center max-h-[80vh] w-[90%] md:w-[50%] overflow-y-auto flex flex-col">
        <div className="flex justify-end">
          <button
            onClick={() => setOpenModalIndex(null)}
            className="border px-2.5 cursor-pointer hover:bg-gray-200 rounded-md"
          >
            close
          </button>
        </div>
        <InvoiceForm
          initialFormData={initialFormData}
          status="update"
          index={index}
          updateInvoice={updateInvoice}
        />
      </div>
    </div>
  );
};

export default UpdateModal;
