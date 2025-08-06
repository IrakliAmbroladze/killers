import { Customer } from "@/types/Customer";

export const fetchCustomers = async (id: string) => {
  console.log(" start of fetchCustomers ");
  const response = await fetch(
    `/api/orders/fetchCustomers?id=${encodeURIComponent(id)}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const responseObj: {
    success: boolean;
    data: Customer[];
    error?: string;
  } = await response.json();
  if (responseObj.success) {
    return responseObj;
  } else {
    alert(`❌ შეცდომა: \n ${responseObj.error}`);
  }
};
