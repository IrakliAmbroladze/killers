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
      <h2 className="font-bold mt-2">დამკვეთის წარმომადგენელი</h2>
      {data.map((d) => (
        <div key={d.label} className="max-w-[320px] m-2">
          <label className="flex justify-between">
            {d.label}
            <input
              className="w-[160px] border rounded-md px-2 text-center"
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
