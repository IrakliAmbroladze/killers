import { InspectionDefault } from "./InspectionDefault";
import { InspectionFollowUp } from "./InspectionFollowUp";
import { InspectionUnplanned } from "./InspectionUnplanned";

export const InspectionDocument = ({
  inspection_doc,
  handleFlyingPestMonitorChange,
}: {
  inspection_doc: "default" | "unplanned" | "follow_up";
  handleFlyingPestMonitorChange: (
    rowIndex: number,
    field: "id" | "fly" | "kinkla" | "plate_was_changed",
    value: string | boolean,
  ) => void;
}) => {
  switch (inspection_doc) {
    case "unplanned":
      return (
        <InspectionUnplanned
          handleFlyingPestMonitorChange={handleFlyingPestMonitorChange}
        />
      );

    case "follow_up":
      return (
        <InspectionFollowUp
          handleFlyingPestMonitorChange={handleFlyingPestMonitorChange}
        />
      );
    default:
      return (
        <InspectionDefault
          handleFlyingPestMonitorChange={handleFlyingPestMonitorChange}
        />
      );
  }
};
