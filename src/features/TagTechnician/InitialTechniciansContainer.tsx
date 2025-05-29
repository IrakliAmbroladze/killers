import React from "react";
import InitialTechnicians from "./InitialTechnicians";
import { useTechniciansAndManagersDisplayNames } from "@/hooks/useTechniciansAndManagersDisplayNames";
import { Sheets_Invoice } from "@/types/invoices";
import { useOrders } from "@/hooks/useOrders";

interface InitialTechniciansContainerProps {
  initialTechnicians: string[];
  order: Sheets_Invoice;
}

const InitialTechniciansContainer = ({
  initialTechnicians,
  order,
}: InitialTechniciansContainerProps) => {
  const { updateOrder } = useOrders();

  const selectedTechnicians = initialTechnicians;

  const displayNames = useTechniciansAndManagersDisplayNames();

  const handleTechnicianSelect = async (name: string) => {
    if (selectedTechnicians.includes(name)) {
      alert("ეს ტექნიკოსი უკვე მონიშნულია");
      return;
    }
    const updatedTechnicians = [...selectedTechnicians, name];
    const newdata = updatedTechnicians.join(" ");
    const updatedOrder = {
      ...order,
      technician: newdata,
    };
    updateOrder(updatedOrder);
    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) {
        throw new Error("Failed to update the backend");
      }

      const data = await response.json();
      console.log("Backend update successful:", data);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleTechnicianDelete = async (name: string) => {
    if (!selectedTechnicians.includes(name)) {
      alert("ეს ტექნიკოსი უკვე წაშლილია");
      return;
    }
    const updatedTechnicians = selectedTechnicians.filter(
      (item) => item !== name
    );

    if (updatedTechnicians.length == 0 && order.plan_time) {
      alert(
        "პროცედურაზე, რომელსაც დაგეგმვის თარიღი აქვს, ერთი ტექნიკოსი მაინც უნდა იყოს მონიშნული"
      );
      return;
    }
    const newdata = updatedTechnicians.join(" ");
    const updatedOrder = {
      ...order,
      technician: newdata,
    };
    updateOrder(updatedOrder);
    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) {
        throw new Error("Failed to update the backend");
      }

      const data = await response.json();
      console.log("Backend update successful:", data);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <InitialTechnicians
      selectedTechnicians={selectedTechnicians}
      displayNames={displayNames}
      onTechnicianSelect={handleTechnicianSelect}
      onTechnicianDelete={handleTechnicianDelete}
    />
  );
};

export default InitialTechniciansContainer;
