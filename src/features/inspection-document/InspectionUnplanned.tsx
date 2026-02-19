export const InspectionUnplanned = ({
  handleFlyingPestMonitorChange,
}: {
  handleFlyingPestMonitorChange: (
    rowIndex: number,
    field: "id" | "fly" | "kinkla" | "plate_was_changed",
    value: string | boolean,
  ) => void;
}) => {
  return <div>This is unplanned component</div>;
};
