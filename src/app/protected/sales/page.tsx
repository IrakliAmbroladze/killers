import Link from "next/link";

const Sales = async () => {
  return (
    <div className="w-full text-center mt-20">
      <ul className="space-y-4 flex-1 sm:px-5 pt-5 sm:pt-0">
        <Link
          className="hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out bg-gray-300 text-black py-3 px-20 rounded-lg cursor-pointer"
          href="./sales/create-invoice"
        >
          create-invoice
        </Link>
      </ul>
    </div>
  );
};

export default Sales;
