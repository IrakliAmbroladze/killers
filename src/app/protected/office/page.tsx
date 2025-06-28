import OfficeTable from "@/features/office-table/components/OfficeTable";
import Link from "next/link";

const Office = () => {
  return (
    <div className="flex flex-col">
      <Link href="./office/create-invoice">create-invoice</Link>
      <OfficeTable />
    </div>
  );
};

export default Office;
