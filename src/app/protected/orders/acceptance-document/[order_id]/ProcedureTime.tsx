export default function ProcedureTime({
  onProcedureTimeChange,
  startTime,
  endTime,
}: {
  onProcedureTimeChange: (
    field: "startTime" | "endTime",
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
            <input
              className="w-24 border rounded-md px-2 text-center"
              type="text"
              value={d.value}
              onChange={(e) =>
                onProcedureTimeChange(
                  d.value === startTime ? "startTime" : "endTime",
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
