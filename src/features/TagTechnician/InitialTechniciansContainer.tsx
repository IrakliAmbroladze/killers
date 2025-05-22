import React from "react";
import InitialTechnicians from "./InitialTechnicians";
import { useTechniciansAndManagersDisplayNames } from "@/hooks/useTechniciansAndManagersDisplayNames";

interface InitialTechniciansContainerProps {
  initialTechnicians: string[];
}

const InitialTechniciansContainer = ({
  initialTechnicians,
}: InitialTechniciansContainerProps) => {
  const [selectedTechnicians, setSelectedTechnicians] =
    React.useState<string[]>(initialTechnicians);

  const displayNames = useTechniciansAndManagersDisplayNames();

  const handleTechnicianSelect = (name: string) => {
    if (selectedTechnicians.includes(name)) {
      alert("ეს ტექნიკოსი უკვე მონიშნულია");
      return;
    }
    setSelectedTechnicians((prev) => [...prev, name]);
  };

  return (
    <InitialTechnicians
      selectedTechnicians={selectedTechnicians}
      displayNames={displayNames}
      onTechnicianSelect={handleTechnicianSelect}
    />
  );
};

export default InitialTechniciansContainer;
