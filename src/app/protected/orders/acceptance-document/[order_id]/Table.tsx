import { TableCell } from "@/pdf/types/Table";

type TableProps = {
  headers: string[];
  rows: TableCell[][];
  onCheckboxChange?: (
    pestName: string,
    field: "monitor" | "spray" | "gel",
    checked: boolean,
  ) => void;
  onInputTextChange?: (materialName: string, value: string) => void;
};

export const Table = ({
  headers,
  rows,
  onCheckboxChange,
  onInputTextChange,
}: TableProps) => {
  return (
    <table className="border border-collapse">
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
                      type="text"
                      value={cell.value}
                      onChange={(e) =>
                        onInputTextChange?.(cell.materialName, e.target.value)
                      }
                    />
                  </td>
                );
              }
              return (
                <td key={cellIndex}>
                  <input
                    type="checkbox"
                    checked={cell.checked}
                    onChange={(e) =>
                      onCheckboxChange?.(
                        cell.pestName,
                        cell.field,
                        e.target.checked,
                      )
                    }
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
