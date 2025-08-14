import { addOrders, fetchCustomers } from "@/lib";
import { Order, Customer } from "@/types";
// import { insertOrder } from "@/lib";
import { useDebouncedCallback } from "use-debounce";

export const useNewOrderForm = ({
  formData,
  setFormData,
  searchCustomers,
  setCustomer,
  closeSearch,
  initialData,
}: {
  formData: Partial<Order>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Order>>>;
  searchCustomers: (term: string) => void;
  setCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
  closeSearch: () => void;
  initialData: Partial<Order>;
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const debouncedSearch = useDebouncedCallback(async (value: string) => {
    if (!value.trim()) {
      setCustomer(null);
      return;
    }
    searchCustomers(value);
    const res = await fetchCustomers(value, "exact");
    setCustomer(res?.[0] ?? null);
  }, 500);

  const handleCustomerInput = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleChange(e);
    debouncedSearch(e.target.value);
  };

  const handleCustomerBlur = () => {
    debouncedSearch.flush();
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    if (!formData.customer_id) {
      alert("Please select a customer");
      return;
    }

    const res = await fetchCustomers(formData.customer_id, "exact");
    if (!res?.length) {
      alert("Customer does not exist");
      return;
    }
    setFormData(initialData);
    try {
      const response = await addOrders([
        { ...formData, created_at: new Date().toISOString() },
      ]);
      if (response.status == "OK") {
        alert(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error inserting orders", error);
      alert("❌ დაფიქსირდა შეცდომა შეკვეთის დამატებისას.");
    }
  };

  const handleSelectCustomer = (cust: Customer) => {
    setFormData((prev) => ({ ...prev, customer_id: cust.id }));
    setCustomer(cust);
    closeSearch();
  };

  return {
    handleChange,
    handleCustomerInput,
    handleSelectCustomer,
    handleSubmit,
    handleCustomerBlur,
  };
};
