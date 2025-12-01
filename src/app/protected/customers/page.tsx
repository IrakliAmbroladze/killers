import CustomersTable from "@/components/CustomersTable";
import { getCustomers } from "@/lib";
import type { Customer } from "@/types";

export default async function Customers() {
  const { customers }: { customers: Customer[] } = await getCustomers();
  console.log("customers", customers);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Customers</h1>
      <CustomersTable data={customers} />
    </div>
  );
}
