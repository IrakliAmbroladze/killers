import { Table } from "@/components";
import { Cell } from "@/types";
import { CrawlingPestMonitorTableHeaders } from "@/types/documents/CrawlingPestMonitorTableHeaders";
import { PestMonitorTableHeader } from "./PestMonitorTableHeader";

export const InspectionDefault = ({
  flyingPestMonitorRows,
  crawlingPestMonitorRows,
  crawlingPestMonitorHeaders,
  rodentMonitorRows,
  updateCrawlingPestMonitorHeaders,
  criteriaRows,
}: {
  flyingPestMonitorRows: Cell[][];
  crawlingPestMonitorRows: Cell[][];
  crawlingPestMonitorHeaders: CrawlingPestMonitorTableHeaders;
  updateCrawlingPestMonitorHeaders: (propName: string, value: string) => void;
  rodentMonitorRows: Cell[][];
  criteriaRows: Cell[][];
}) => {
  return (
    <div className="mt-5">
      <h2 className="m-5 text-center">გეგმიური ინსპექტირება</h2>
      <Table
        id="criteria"
        headers={[
          { node: "გარე ტერიტორია", justify_content: "center" },
          { node: "კი", justify_content: "center" },
          { node: "არა", justify_content: "center" },
          { node: "N/A", justify_content: "center" },
        ]}
        rows={criteriaRows}
      />
      <Table
        id="flying_pest_monitor"
        title={{
          title: "მფრინავი მავნებლის მონიტორი",
          justify_content: "center",
        }}
        headers={[
          { node: "N", justify_content: "center" },
          { node: "ბუზი", justify_content: "center" },
          { node: "ქინქლა", justify_content: "center" },
          { node: "", justify_content: "center" },
          { node: "შეიცვალა ფირფიტა", justify_content: "center" },
        ]}
        rows={flyingPestMonitorRows}
      />
      <Table
        id="crawling_pest_monitor"
        title={{
          title: "მხოხავი მავნებლის მონიტორი",
          justify_content: "center",
        }}
        headers={[
          { node: "#", justify_content: "center" },
          {
            node: (
              <PestMonitorTableHeader
                value={crawlingPestMonitorHeaders.ant}
                propName="ant"
                updatePestMonitorHeaders={updateCrawlingPestMonitorHeaders}
              />
            ),
            justify_content: "center",
          },
          {
            node: (
              <PestMonitorTableHeader
                value={crawlingPestMonitorHeaders.cockroach}
                propName="cockroach"
                updatePestMonitorHeaders={updateCrawlingPestMonitorHeaders}
              />
            ),
            justify_content: "center",
          },
          {
            node: (
              <PestMonitorTableHeader
                value={crawlingPestMonitorHeaders.blank}
                propName="blank"
                updatePestMonitorHeaders={updateCrawlingPestMonitorHeaders}
              />
            ),
            justify_content: "center",
          },
          {
            node: `შეიცვალა ${crawlingPestMonitorHeaders.plate_was_changed}`,
            justify_content: "center",
          },
        ]}
        rows={crawlingPestMonitorRows}
      />
      <Table
        id="rodent_monitor"
        title={{
          title: "მღრღნელის მონიტორი",
          justify_content: "center",
        }}
        headers={[
          { node: "#", justify_content: "center" },
          { node: "დაჭერილი", justify_content: "center" },
          { node: "შეიცვალა ფირფიტა", justify_content: "center" },
          { node: "დაემატა ქიმიკატი", justify_content: "center" },
        ]}
        rows={rodentMonitorRows}
      />
    </div>
  );
};
