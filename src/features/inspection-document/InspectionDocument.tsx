import { Cell } from "@/types";
import { InspectionDefault } from "./InspectionDefault";
import { InspectionFollowUp } from "./InspectionFollowUp";
import { InspectionUnplanned } from "./InspectionUnplanned";
import { CrawlingPestMonitorTableHeaders } from "@/types/documents/CrawlingPestMonitorTableHeaders";

export const InspectionDocument = ({
  inspection_doc,
  flyingPestMonitorRows,
  crawlingPestMonitorRows,
  crawlingPestMonitorHeaders,
  updateCrawlingPestMonitorHeaders,
  rodentMonitorRows,
  criteriaRows,
}: {
  inspection_doc: "default" | "unplanned" | "follow_up";
  flyingPestMonitorRows: Cell[][];
  crawlingPestMonitorRows: Cell[][];
  crawlingPestMonitorHeaders: CrawlingPestMonitorTableHeaders;
  updateCrawlingPestMonitorHeaders: (propName: string, value: string) => void;
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
          crawlingPestMonitorHeaders={crawlingPestMonitorHeaders}
          updateCrawlingPestMonitorHeaders={updateCrawlingPestMonitorHeaders}
          rodentMonitorRows={rodentMonitorRows}
          criteriaRows={criteriaRows}
        />
      );
  }
};
