import { TimeInput } from "./TimeInput";
export default function ProcedureTime({
  onProcedureTimeChange,
  startTime,
  endTime,
}: {
  onProcedureTimeChange: (
    field: "startTime" | "endTime" | "name" | "personalNumber",
    value: string,
  ) => void;
  startTime: string;
  endTime: string;
}) {
  const data = [
    { label: "დაწყების დრო: ", value: startTime },
    { label: "დასრულების დრო: ", value: endTime },
  ];
  return (
    <>
      {data.map((d) => (
        <div key={d.label} className="max-w-[320px] m-2">
          <label className="flex justify-between">
            {d.label}
            <TimeInput
              value={d.value}
              field={d.value === startTime ? "startTime" : "endTime"}
              onChange={onProcedureTimeChange}
            />
          </label>
        </div>
      ))}
    </>
  );
}
