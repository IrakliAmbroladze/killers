import React from "react";
import InitialTechnicians from "./InitialTechnicians";
import { useTechniciansAndManagersDisplayNames } from "@/hooks/useTechniciansAndManagersDisplayNames";
import { OrderExtended } from "@/types";
import { normalizeOrder } from "../order-table/utils/normalize";
import { editOrder } from "@/lib";
import { proceduresPathName } from "@/app/protected/procedures/constants/proceduresPathName";
import { useOrderModal } from "@/hooks/useOrderModal";

interface InitialTechniciansContainerProps {
  initialTechnicians: string[];
  order: OrderExtended;
  isInModal?: boolean;
}

const InitialTechniciansContainer = ({
  initialTechnicians,
  order,
  isInModal = false,
}: InitialTechniciansContainerProps) => {
  const { refreshOrder } = useOrderModal();

  const selectedTechnicians = initialTechnicians;

  const displayNames = useTechniciansAndManagersDisplayNames();

  const handleTechnicianSelect = async (name: string) => {
    if (selectedTechnicians.includes(name)) {
      alert("ეს ტექნიკოსი უკვე მონიშნულია");
      return;
    }
    const updatedTechnicians = [...selectedTechnicians, name];
    const newdata = updatedTechnicians.join(" ");
    const updatedOrder = normalizeOrder({
      ...order,
      technician: newdata,
    });

    const result = await editOrder(updatedOrder, proceduresPathName);

    if (result.status === "OK" && isInModal) {
      await refreshOrder(order.id); // fetch updated order and update context
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
    const updatedOrder = normalizeOrder({
      ...order,
      technician: newdata,
    });
    const result = await editOrder(updatedOrder, proceduresPathName);

    if (result.status === "OK" && isInModal) {
      await refreshOrder(order.id); // fetch updated order and update context
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
