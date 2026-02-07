import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  value: string;
  field: "startTime" | "endTime" | "name" | "personalNumber";
  onChange: (
    field: "startTime" | "endTime" | "name" | "personalNumber",
    value: string,
  ) => void;
};

export const TimeInput = ({ value, onChange, field }: Props) => {
  const [localValue, setLocalValue] = useState(value);
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  const debounced = useDebouncedCallback(
    (value: string) => onChange(field, value),
    500,
  );

  return (
    <input
      className="w-44 border rounded-md px-2 text-center"
      type="text"
      value={localValue}
      onChange={(e) => {
        const { value } = e.target;
        setLocalValue(value);
        debounced(value);
      }}
    />
  );
};
