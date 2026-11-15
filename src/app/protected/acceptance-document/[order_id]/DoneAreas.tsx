import { useState } from "react";

type DoneAreasProps = {
  spaces: Record<string, boolean>;
  onChange: (area: string, checked: boolean) => void;
};

type CellItem =
  { type: "area"; area: string; checked: boolean } | { type: "new" };

function chunk<T>(arr: T[], size: number): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

export default function DoneAreas({ spaces, onChange }: DoneAreasProps) {
  const [newArea, setNewArea] = useState("");

  const cells: CellItem[] = [
    ...Object.entries(spaces).map(([area, checked]) => ({
      type: "area" as const,
      area,
      checked,
    })),
    { type: "new" },
  ];

  const handleAdd = (checked: boolean) => {
    const trimmed = newArea.trim();
    if (!trimmed) return;
    onChange(trimmed, checked);
    setNewArea("");
  };

  return (
    <table className="text-sm">
      <thead>
        <tr>
          <th colSpan={3}>
            დეტალურად დათვალიერდა და საჭიროებისამებრ დამუშავდა შემდეგი
            სივრცეები:
          </th>
        </tr>
      </thead>

      <tbody>
        {chunk(cells, 3).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell) =>
              cell.type === "area" ? (
                <td key={cell.area} className="text-center">
                  <label>
                    <div>
                      <input
                        type="checkbox"
                        checked={cell.checked}
                        onChange={(e) => onChange(cell.area, e.target.checked)}
                      />
                    </div>
                    {cell.area}
                  </label>
                </td>
              ) : (
                <td key="__new__" className="text-center">
                  <label>
                    <div>
                      <input
                        type="checkbox"
                        checked={false}
                        disabled={!newArea.trim()}
                        onChange={(e) => handleAdd(e.target.checked)}
                      />
                    </div>
                    <input
                      type="text"
                      value={newArea}
                      onChange={(e) => setNewArea(e.target.value)}
                    />
                  </label>
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
