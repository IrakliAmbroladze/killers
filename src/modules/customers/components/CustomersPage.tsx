import { getCustomers } from "../server";
import { Customer } from "../types";
import CustomersTable from "./CustomersTable";

export default async function CustomersPage() {
  const { customers }: { customers: Customer[] } = await getCustomers();
  return (
    <div className="p-6">
      <CustomersTable data={customers} />
    </div>
  );
}
