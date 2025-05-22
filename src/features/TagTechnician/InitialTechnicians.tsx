import DropDown from "@/components/ui/DropDown";
import React from "react";

interface InitialTechniciansProps {
  selectedTechnicians: string[];
  displayNames: string[];
  onTechnicianSelect: (name: string) => void;
}

const InitialTechnicians = ({
  selectedTechnicians,
  displayNames,
  onTechnicianSelect,
}: InitialTechniciansProps) => {
  return (
    <>
      {selectedTechnicians.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedTechnicians.map((name, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-200 dark:bg-blue-700 rounded-full text-sm "
            >
              {name}
            </span>
          ))}
        </div>
      )}
      <DropDown
        list={displayNames}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const selected = e.target.value;
          if (selected) onTechnicianSelect(selected);
        }}
      />
    </>
  );
};

export default InitialTechnicians;
