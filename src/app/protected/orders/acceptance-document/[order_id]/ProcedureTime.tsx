export default function ProcedureTime({
  onProcedureTimeChange,
  startTime,
  endTime,
}:{
  onProcedureTimeChange: (field: "startTime" | "endTime",value: string) =>void; 
  startTime: string; 
  endTime: string;
}) {
  return (
    <div>
      <div className="w-48 h-20">პროცედურების დაწყების დრო</div>
            <input
              className="w-24"
              type="text"
              value={startTime}
              onChange={(e) =>
                onProcedureTimeChange(
                "startTime",
                e.target.value,
                )
              }
            />
            <div className="h-20">პროცედურების დასრულების დრო</div>
            <input
              className="w-24"
              type="text"
              value={endTime}
              onChange={(e) =>
                onProcedureTimeChange(
                "endTime",
                e.target.value,
                )
              }
            />
    </div>
  );
}
