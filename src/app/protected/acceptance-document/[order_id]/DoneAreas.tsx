type DoneAreasProps = {
  spaces: Record<string, boolean>;
  onChange: (area: string, checked: boolean) => void;
};

function chunk<T>(arr: T[], size: number): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

export default function DoneAreas({ spaces, onChange }: DoneAreasProps) {
  const entries = Object.entries(spaces);

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
        {chunk(entries, 3).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map(([area, checked]) => (
              <td key={area} className="text-center">
                <label>
                  <div>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => onChange(area, e.target.checked)}
                    />
                  </div>
                  {area}
                </label>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
