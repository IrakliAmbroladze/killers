import { Cell } from "@/types";
import { InspectionDefault } from "./InspectionDefault";
import { InspectionFollowUp } from "./InspectionFollowUp";
import { InspectionUnplanned } from "./InspectionUnplanned";
import { CrawlingPestMonitorTableHeaders } from "@/types/documents/CrawlingPestMonitorTableHeaders";
import { UpdatePestMonitorHeaders } from "./types/UpdatePestMonitorHeaders";
import { FlyingPestMonitorTableHeaders } from "@/types/documents/FlyingPestMonitorTableHeaders";

export const InspectionDocument = ({
  inspection_doc,
  flyingPestMonitorRows,
  flyingPestMonitorHeaders,
  crawlingPestMonitorRows,
  crawlingPestMonitorHeaders,
  updateCrawlingPestMonitorHeaders,
  updateFlyingPestMonitorHeaders,
  rodentMonitorRows,
  criteriaRows,
}: {
  inspection_doc: "default" | "unplanned" | "follow_up";
  flyingPestMonitorRows: Cell[][];
  flyingPestMonitorHeaders: FlyingPestMonitorTableHeaders;
  crawlingPestMonitorRows: Cell[][];
  crawlingPestMonitorHeaders: CrawlingPestMonitorTableHeaders;
  updateCrawlingPestMonitorHeaders: UpdatePestMonitorHeaders;
  updateFlyingPestMonitorHeaders: UpdatePestMonitorHeaders;
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
          flyingPestMonitorHeaders={flyingPestMonitorHeaders}
          crawlingPestMonitorRows={crawlingPestMonitorRows}
          crawlingPestMonitorHeaders={crawlingPestMonitorHeaders}
          updateFlyingPestMonitorHeaders={updateFlyingPestMonitorHeaders}
          updateCrawlingPestMonitorHeaders={updateCrawlingPestMonitorHeaders}
          rodentMonitorRows={rodentMonitorRows}
          criteriaRows={criteriaRows}
        />
      );
  }
};
