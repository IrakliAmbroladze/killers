import React, { useState } from "react";

interface DropDownProps {
  list: string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DropDown = ({ list, onChange }: DropDownProps) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      onChange?.(e); // call parent callback
      setSelectedValue(""); // reset back to default
    }
  };

  return (
    <select
      value={selectedValue}
      onChange={handleChange}
      className="text-[10px]"
    >
      <option value="">ტექნიკ.</option>
      {list.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
