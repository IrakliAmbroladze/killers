import { useMemo, useState } from "react";
import { AcceptanceFormData, HandleServicesChange, UiTableCell } from "@/types";

export function useAcceptanceForm(initialData: AcceptanceFormData) {
  const [formData, setFormData] = useState<AcceptanceFormData>(initialData);
  console.log("initial data is: ", initialData);

  const handleProcedureTimeChange = (
    field: "startTime" | "endTime",
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      startTime: field === "startTime" ? value : prev.startTime,
      endTime: field === "endTime" ? value : prev.endTime,
    }));
  };

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

  const handleMaterialEventChange = (materialName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.map((product) =>
        product.name === materialName ? { ...product, used: value } : product,
      ),
    }));
  };

  const pestRows: UiTableCell[][] = useMemo(
    () =>
      formData.pests.map((pest) => [
        { type: "text", text: pest.name },
        {
          type: "checkbox",
          checked: pest.monitor,
          pestName: pest.name,
          field: "monitor",
        },
        {
          type: "checkbox",
          checked: pest.spray,
          pestName: pest.name,
          field: "spray",
        },
        {
          type: "checkbox",
          checked: pest.gel,
          pestName: pest.name,
          field: "gel",
        },
      ]),
    [formData.pests],
  );

  const materialRows: UiTableCell[][] = useMemo(
    () =>
      formData.products.map((material) => [
        { type: "text", text: material.name },
        { type: "text", text: material.dosage },
        {
          type: "inputText",
          materialName: material.name,
          value: material.used,
        },
      ]),
    [formData.products],
  );

  const inventoryRows: UiTableCell[][] = useMemo(
    () =>
      formData.inventory.map((item, rowIndex) => [
        {
          type: "inventoryInputText",
          rowIndex,
          field: "name",
          value: item.name,
        },
        {
          type: "inventoryInputText",
          rowIndex,
          field: "price",
          value: item.price,
        },
        {
          type: "inventoryInputText",
          rowIndex,
          field: "quantity",
          value: item.quantity,
        },
      ]),
    [formData.inventory],
  );

  return {
    formData,
    setFormData,
    handleServicesChange,
    handleSoldInventoryChange,
    handlePestEventChange,
    handleMaterialEventChange,
    pestRows,
    materialRows,
    inventoryRows,
    handleSpaceChange,
    handleProcedureTimeChange,
  };
}
