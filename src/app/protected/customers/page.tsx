import { fetchCustomers } from "@/lib";

export default async function Customers() {
  const customers = await fetchCustomers();
  return <h1>Customers</h1>;
}
