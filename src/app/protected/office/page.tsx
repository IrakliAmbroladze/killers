import OfficeTable from "@/features/office-table/OfficeTable";
import Link from "next/link";

const Office = () => {
  return (
    <>
      <Link href="./office/create-invoice">create-invoice</Link>
      <OfficeTable />;
    </>
  );
};

export default Office;
