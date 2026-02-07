import { UiTableCell } from "@/types";
import { PestInput } from "./PestInput";

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
};

export const Table = ({
  headers,
  rows,
  onCheckboxChange,
  onInputTextChange,
  onInventoryTextChange,
  onPestTextChange,
}: TableProps) => {
  return (
    <table className="border border-collapse text-xs">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => {
              if (cell.type === "text") {
                return <td key={cellIndex}>{cell.text}</td>;
              }
              if (cell.type === "inputText") {
                return (
                  <td key={cellIndex}>
                    <input
                      className="w-full min-w-0"
                      type="text"
                      value={cell.value}
                      onChange={(e) =>
                        onInputTextChange?.(cell.materialName, e.target.value)
                      }
                    />
                  </td>
                );
              }
              if (cell.type === "inventoryInputText") {
                return (
                  <td key={cellIndex}>
                    <input
                      type="text"
                      className="w-full min-w-0"
                      value={cell.value}
                      onChange={(e) =>
                        onInventoryTextChange?.(
                          cell.rowIndex,
                          cell.field,
                          e.target.value,
                        )
                      }
                    />
                  </td>
                );
              }
              if (cell.type === "pestInputText") {
                return (
                  <td key={cellIndex}>
                    <PestInput
                      key={cellIndex}
                      value={cell.text}
                      rowIndex={rowIndex}
                      onChange={onPestTextChange}
                    />
                  </td>
                );
              }

              return (
                <td key={cellIndex}>
                  <input
                    type="checkbox"
                    className="w-full min-w-0"
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
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
