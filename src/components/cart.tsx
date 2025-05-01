import { Sheets_Invoice } from "@/types/invoices";

const Cart = ({ invoice }: { invoice: Sheets_Invoice }) => {
  const tableDate =
    invoice.date.length > 6
      ? invoice.date.slice(0, 4) + invoice.date.slice(5, 7)
      : invoice.date;
  return (
    <>
      <td className="p-1 ">{tableDate}</td>
      <td className="p-1 ">{invoice.customer}</td>
      <td className="p-1 hidden lg:table-cell">{invoice.identity}</td>
      <td className="p-1 ">{invoice.address}</td>
      <td className="p-1 hidden lg:table-cell">{invoice.items}</td>
      <td className="p-1 hidden lg:table-cell">{invoice.total}</td>
      <td className="p-1 hidden lg:table-cell">{invoice.provider}</td>
      <td className="p-1 hidden lg:table-cell">{invoice.seller}</td>
      <td className="p-1 hidden lg:table-cell">{invoice.delivery_date}</td>
      <td className="p-1 ">{invoice.technician}</td>
      <td className="p-1 ">
        {invoice.document && (
          <a
            href={invoice.document}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            📄
          </a>
        )}
      </td>
    </>
  );
};

export default Cart;
