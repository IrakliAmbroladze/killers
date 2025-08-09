import { Customer } from "@/types";

export const useNewCustomerForm = ({
  setFormData,
}: {
  setFormData: React.Dispatch<React.SetStateAction<Customer>>;
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return {
    handleChange,
  };
};
