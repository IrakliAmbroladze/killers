import { Order, Customer } from "@/types";
import { insertOrder } from "@/lib";
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

  const debouncedSearch = useDebouncedCallback((value: string) => {
    searchCustomers(value);
  }, 500);

  const handleCustomerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setFormData(initialData);
    setCustomer(null);
    console.log("Form data:", formData);
    try {
      await insertOrder([formData]);
    } catch (error) {
      console.error("Failed to insert order", error);
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
