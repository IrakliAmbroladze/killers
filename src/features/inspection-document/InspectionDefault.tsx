import { Table } from "@/components";
import { Cell } from "@/types";

export const InspectionDefault = ({
  flyingPestMonitorRows,
}: {
  flyingPestMonitorRows: Cell[][];
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
    </div>
  );
};
