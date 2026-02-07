import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const PestInput = ({
  value,
  rowIndex,
  onChange,
}: {
  value: string;
  rowIndex: number;
  onChange?: (i: number, v: string) => void;
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const debounced = useDebouncedCallback(
    (v: string) => onChange?.(rowIndex, v),
    500,
  );

  return (
    <input
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
