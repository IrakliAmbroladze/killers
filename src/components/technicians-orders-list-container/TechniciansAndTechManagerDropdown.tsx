"use client";
import React from "react";
import DropDown from "@/components/ui/DropDown";
import { useTechniciansAndManagersDisplayNames } from "@/hooks/useTechniciansAndManagersDisplayNames";

interface Props {
  onSelect: (name: string) => void;
}

const TechniciansAndTechManagerDropdown = ({ onSelect }: Props) => {
  const displayNames = useTechniciansAndManagersDisplayNames();

  return (
    <DropDown
      list={displayNames}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        if (selected) onSelect(selected);
      }}
    />
  );
};

export default TechniciansAndTechManagerDropdown;
