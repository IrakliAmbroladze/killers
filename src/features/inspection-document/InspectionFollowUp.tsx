export const InspectionFollowUp = ({
  handleFlyingPestMonitorChange,
}: {
  handleFlyingPestMonitorChange: (
    rowIndex: number,
    field: "id" | "fly" | "kinkla" | "plate_was_changed",
    value: string | boolean,
  ) => void;
}) => {
  return <div>This is follow_up component</div>;
};
