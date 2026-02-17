"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const MaterialInput = ({
  value,
  name,
  onChange,
}: {
  value: string;
  name: string;
  onChange?: (n: string, v: string) => void;
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const debounced = useDebouncedCallback(
    (v: string) => onChange?.(name, v),
    500,
  );

  return (
    <input
      className="w-full min-w-0"
      type="text"
      value={localValue}
      onChange={(e) => {
        const v = e.target.value;
        setLocalValue(v);
        debounced(v);
      }}
    />
  );
};
