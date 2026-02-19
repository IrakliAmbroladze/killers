import { Table } from "@/components";
import { Cell } from "@/types";

export const InspectionDefault = ({
  flyingPestMonitorRows,
  crawlingPestMonitorRows,
  rodentMonitorRows,
}: {
  flyingPestMonitorRows: Cell[][];
  crawlingPestMonitorRows: Cell[][];
  rodentMonitorRows: Cell[][];
}) => {
  return (
    <div>
      this is default component
      <Table
        id="flying_pest_monitor"
        title={{
          title: "მფრინავი მავნებლის მონიტორი",
          justify_content: "center",
        }}
        headers={[
          { node: "#", justify_content: "center" },
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
          { node: "ჭიანჭველა", justify_content: "center" },
          { node: "ტარაკანი", justify_content: "center" },
          { node: "", justify_content: "center" },
          { node: "შეიცვალა ფირფიტა", justify_content: "center" },
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
