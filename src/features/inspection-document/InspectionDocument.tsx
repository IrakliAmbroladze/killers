import { InspectionDefault } from "./InspectionDefault";
import { InspectionFollowUp } from "./InspectionFollowUp";
import { InspectionUnplanned } from "./InspectionUnplanned";

const views = {
  unplanned: <InspectionUnplanned />,
  follow_up: <InspectionFollowUp />,
  default: <InspectionDefault />,
};

export const InspectionDocument = ({
  inspection_doc,
}: {
  inspection_doc: "default" | "unplanned" | "follow_up";
}) => {
  return views[inspection_doc] ?? views.default;
};
