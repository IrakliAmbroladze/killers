"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const InventoryInput = ({
  value,
  rowIndex,
  field,
  onChange,
}: {
  value: string;
  rowIndex: number;
  field: "name" | "price" | "quantity";
  onChange?: (i: number, f: "name" | "price" | "quantity", v: string) => void;
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const debounced = useDebouncedCallback(
    (v: string) => onChange?.(rowIndex, field, v),
    500,
  );

  return (
    <input
      type="text"
      className="w-full min-w-0"
      value={localValue}
      onChange={(e) => {
        const v = e.target.value;
        setLocalValue(v);
        debounced(v);
      }}
    />
  );
};
