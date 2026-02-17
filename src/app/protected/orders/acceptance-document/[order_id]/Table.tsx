import { UiTableCell } from "@/types";
import { PestInput } from "./PestInput";
import { MaterialInput } from "./MaterialInput";
import { InventoryInput } from "./InventoryInput";
import { CheckBox } from "@/components/atoms/CheckBox";

type TableProps = {
  headers: string[];
  rows: UiTableCell[][];
  onCheckboxChange?: (
    pestName: string,
    field: "monitor" | "spray" | "gel",
    checked: boolean,
  ) => void;
  onInputTextChange?: (materialName: string, value: string) => void;
  onPestTextChange?: (index: number, text: string) => void;
  onInventoryTextChange?: (
    rowIndex: number,
    field: "name" | "price" | "quantity",
    value: string,
  ) => void;
  columns_number?: number;
};

export const Table = ({
  headers,
  rows,
  onCheckboxChange,
  onInputTextChange,
  onInventoryTextChange,
  onPestTextChange,
  columns_number = 3,
}: TableProps) => {
  const styleCellLeft = "border p-2.5 flex items-center h-full";
  const styleCellCenter = `${styleCellLeft} justify-center`;
  return (
    <div
      className={`border border-collapse text-xs grid ${columns_number === 4 ? "grid-cols-4" : "grid-cols-3"} items-center justify-center`}
    >
      {headers.map((header) => (
        <div key={header} className={styleCellCenter}>
          {header}
        </div>
      ))}

      {rows.map((row, rowIndex) => (
        <>
          {row.map((cell, cellIndex) => {
            if (cell.type === "text") {
              return (
                <div
                  key={cellIndex}
                  className={
                    cell.text === "-" || cell.text.includes("/")
                      ? styleCellCenter
                      : styleCellLeft
                  }
                >
                  {cell.text}
                </div>
              );
            }
            if (cell.type === "inputText") {
              return (
                <div key={cellIndex} className={styleCellLeft}>
                  <MaterialInput
                    value={cell.value}
                    name={cell.materialName}
                    onChange={onInputTextChange}
                  />
                </div>
              );
            }
            if (cell.type === "inventoryInputText") {
              return (
                <div key={cellIndex} className={styleCellLeft}>
                  <InventoryInput
                    value={cell.value}
                    rowIndex={cell.rowIndex}
                    field={cell.field}
                    onChange={onInventoryTextChange}
                  />
                </div>
              );
            }
            if (cell.type === "pestInputText") {
              return (
                <div key={cellIndex} className={styleCellLeft}>
                  <PestInput
                    key={cellIndex}
                    value={cell.text}
                    rowIndex={rowIndex}
                    onChange={onPestTextChange}
                  />
                </div>
              );
            }

            return (
              <div key={cellIndex} className={styleCellCenter}>
                <CheckBox
                  checked={cell.checked}
                  onChange={(e) => {
                    if (!cell.pestName || !cell.field) return;
                    return onCheckboxChange?.(
                      cell.pestName,
                      cell.field,
                      e.target.checked,
                    );
                  }}
                />
              </div>
            );
          })}
        </>
      ))}
    </div>
  );
};
