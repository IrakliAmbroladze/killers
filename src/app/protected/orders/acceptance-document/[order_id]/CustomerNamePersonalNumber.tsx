export default function CustomerNamePersonalNumber({
  onProcedureTimeChange,
  name,
  personalNumber,
}: {
  onProcedureTimeChange: (
    field: "name" | "personalNumber",
    value: string,
  ) => void;
  name: string;
  personalNumber: string;
}) {
  const data = [
    { label: "სახელი, გვარი: ", value: name },
    { label: "პირადი ნომერი: ", value: personalNumber },
  ];
  return (
    <>
      {data.map((d) => (
        <div key={d.label} className="max-w-[320px] m-2">
          <label className="flex justify-between">
            {d.label}
            <input
              className="w-24 border rounded-md px-2 text-center"
              type="text"
              value={d.value}
              onChange={(e) =>
                onProcedureTimeChange(
                  d.value === name ? "name" : "personalNumber",
                  e.target.value,
                )
              }
            />
          </label>
        </div>
      ))}
    </>
  );
}
