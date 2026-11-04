import { TimeInput } from "./TimeInput";

export default function CustomerNamePersonalNumber({
  onProcedureTimeChange,
  name,
  personalNumber,
}: {
  onProcedureTimeChange: (
    field: "startTime" | "endTime" | "name" | "personalNumber",
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
            <TimeInput
              value={d.value}
              field={d.value === name ? "name" : "personalNumber"}
              onChange={onProcedureTimeChange}
            />
          </label>
        </div>
      ))}
    </>
  );
}
