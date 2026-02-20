import { useCallback, useState } from "react";
import { AcceptanceFormData, HandleServicesChange } from "@/types";

export function useAcceptanceForm(initialData: AcceptanceFormData) {
  const [formData, setFormData] = useState<AcceptanceFormData>(initialData);

  const handleProcedureTimeChange = (
    field: "startTime" | "endTime" | "name" | "personalNumber",
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      startTime: field === "startTime" ? value : prev.startTime,
      endTime: field === "endTime" ? value : prev.endTime,
      customer: {
        ...prev.customer,
        representative: {
          name: field === "name" ? value : prev.customer.representative.name,
          id:
            field === "personalNumber"
              ? value
              : prev.customer.representative.id,
        },
      },
    }));
  };

  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLDataElement>) => {
      const { value } = e.target;
      setFormData((prev) => ({
        ...prev,
        date: value,
      }));
    },
    [],
  );

  const handleSpaceChange = (area: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      spaces: {
        ...prev.spaces,
        [area]: checked,
      },
    }));
  };

  const handleServicesChange: HandleServicesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [name]: checked,
      },
    }));
  };

  const handleSoldInventoryChange = (
    rowIndex: number,
    field: "name" | "price" | "quantity",
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      inventory: prev.inventory.map((item, index) =>
        index === rowIndex ? { ...item, [field]: value } : item,
      ),
    }));
  };
  const handleFlyingPestMonitorChange = (
    rowIndex: number,
    field: "id" | "fly" | "kinkla" | "blank" | "plate_was_changed",
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      flying_pest_monitor: prev.flying_pest_monitor.map((item, index) =>
        index === rowIndex ? { ...item, [field]: value } : item,
      ),
    }));
  };
  const handlePestEventChange = (
    pestName: string,
    field: "monitor" | "spray" | "gel",
    checked: boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      pests: prev.pests.map((pest) =>
        pest.name === pestName ? { ...pest, [field]: checked } : pest,
      ),
    }));
  };

  const handlePestTextChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      pests: prev.pests.toSpliced(index, 1, {
        name: value,
        checked: false,
        monitor: false,
        spray: false,
        gel: false,
      }),
    }));
  };
  const handleMaterialEventChange = (materialName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.map((product) =>
        product.name === materialName ? { ...product, used: value } : product,
      ),
    }));
  };

  const handleCrawlingPestMonitorChange = (
    rowIndex: number,
    field: "id" | "ant" | "cockroach" | "blank" | "plate_was_changed",
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      crawling_pest_monitor: prev.crawling_pest_monitor.map((item, index) =>
        index === rowIndex ? { ...item, [field]: value } : item,
      ),
    }));
  };
  const handleRodentMonitorChange = (
    rowIndex: number,
    field: "id" | "captured" | "plate_was_changed" | "chemical_was_added",
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      rodent_monitor: prev.rodent_monitor.map((item, index) =>
        index === rowIndex ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const handleCriteriaChange = (name: string, value: boolean | null) => {
    console.log(name, value);
    setFormData((prev) => ({
      ...prev,
      criteria: {
        ...prev.criteria,
        [name]: value,
      },
    }));
  };

  return {
    handlePestTextChange,
    formData,
    setFormData,
    handleServicesChange,
    handleSoldInventoryChange,
    handlePestEventChange,
    handleMaterialEventChange,
    handleSpaceChange,
    handleProcedureTimeChange,
    handleDateChange,
    handleFlyingPestMonitorChange,
    handleCrawlingPestMonitorChange,
    handleRodentMonitorChange,
    handleCriteriaChange,
  };
}
