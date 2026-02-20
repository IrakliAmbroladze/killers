import { Cell } from "@/types";
import { InspectionDefault } from "./InspectionDefault";
import { InspectionFollowUp } from "./InspectionFollowUp";
import { InspectionUnplanned } from "./InspectionUnplanned";

export const InspectionDocument = ({
  inspection_doc,
  flyingPestMonitorRows,
  crawlingPestMonitorRows,
  rodentMonitorRows,
  criteriaRows,
}: {
  inspection_doc: "default" | "unplanned" | "follow_up";
  flyingPestMonitorRows: Cell[][];
  crawlingPestMonitorRows: Cell[][];
  rodentMonitorRows: Cell[][];
  criteriaRows: Cell[][];
}) => {
  switch (inspection_doc) {
    case "unplanned":
      return <InspectionUnplanned />;

    case "follow_up":
      return <InspectionFollowUp />;
    default:
      return (
        <InspectionDefault
          flyingPestMonitorRows={flyingPestMonitorRows}
          crawlingPestMonitorRows={crawlingPestMonitorRows}
          rodentMonitorRows={rodentMonitorRows}
          criteriaRows={criteriaRows}
        />
      );
  }
};
