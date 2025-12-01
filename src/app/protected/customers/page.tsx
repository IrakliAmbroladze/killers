import CustomersTable from "@/components/CustomersTable";
import { getCustomers } from "@/lib";
import type { Customer } from "@/types";

export default async function Customers() {
  const { customers }: { customers: Customer[] } = await getCustomers();
  return (
    <div className="p-6">
      <CustomersTable data={customers} />
    </div>
  );
}
