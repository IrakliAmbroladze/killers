import { Check, Square } from "lucide-react";
import React from "react";

export const CheckBox = ({
  name = "",
  checked = false,
  onChange = () => {},
  children = "",
}: {
  name?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}) => {
  return (
    <label className="cursor-pointer select-none flex justify-start items-center">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="opacity-0"
      />
      {checked ? (
        <Check size={32} className="ml-[-13px] mr-2" />
      ) : (
        <Square size={32} className="ml-[-13px] mr-2" />
      )}
      {children}
    </label>
  );
};
