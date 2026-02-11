import { useState } from "react";

export const Documents = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [selectedInspectionDocument, setSelectedInspectionDocument] =
    useState("default");

  const inspection_doc_options = [
    { value: "default", label: "default" },
    { value: "unplanned", label: "unplanned" },
    { value: "follow_up", label: "follow_up" },
  ];

  return (
    <div className="text-sm flex gap-5">
      <div>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          მიღება-ჩაბარება
        </label>
      </div>
      <div>
        <label htmlFor="inspection-document">ინსპექტ: </label>
        <select
          id="fruit-select"
          value={selectedInspectionDocument}
          onChange={(e) => setSelectedInspectionDocument(e.target.value)}
        >
          {inspection_doc_options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
