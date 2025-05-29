import DropDown from "@/components/ui/DropDown";
import React from "react";

interface InitialTechniciansProps {
  selectedTechnicians: string[];
  displayNames: string[];
  onTechnicianSelect: (name: string) => void;
  onTechnicianDelete: (name: string) => void;
}

const InitialTechnicians = ({
  selectedTechnicians,
  displayNames,
  onTechnicianSelect,
  onTechnicianDelete,
}: InitialTechniciansProps) => {
  return (
    <div className="flex">
      <DropDown
        list={displayNames}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const selected = e.target.value;
          if (selected) onTechnicianSelect(selected);
        }}
      />
      {selectedTechnicians.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedTechnicians.map((name, index) => (
            <span
              key={index}
              className="px-0.5 py-0.5 bg-blue-200 dark:bg-blue-700 rounded-md text-xs "
            >
              {name} <button onClick={() => onTechnicianDelete(name)}>X</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default InitialTechnicians;
