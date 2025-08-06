import { Customer } from "@/types/Customer";

export const fetchCustomer = async (id: string) => {
  console.log("start of fetchCustomer ");
  const response = await fetch("/api/orders/fetchCustomer", {
    method: "GET",
    headers: { "Content-Type": "application/json", id },
  });
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
