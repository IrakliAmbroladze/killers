import type { Order } from "@/types";

export const updateOrder = async (updatedOrder: Order) => {
  const response = await fetch("/api/orders/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ updatedOrder }),
  });
  const responseObj: { success: boolean; data: Order; error: Error } =
    await response.json();
  console.log("response is: ", responseObj);
  if (responseObj.success) {
    alert(
      `✅ მონაცემები შენახულია წარმატებით: \n ს/კ: ${
        responseObj.data.customer_id
      } \n მისამართ: ${responseObj.data.address} \n პროდუქტი: ${
        responseObj.data.items
      } \n ფასი: ${responseObj.data.price / 100} `
    );
  } else {
    alert(
      `❌ მონაცემების შენახვისას დაფიქსირდა შეცდომა \n ${responseObj.error}`
    );
  }
};
