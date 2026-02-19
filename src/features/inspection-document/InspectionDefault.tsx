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
          title: "მიწოდებული ინვენტარი",
          justify_content: "center",
        }}
        headers={[
          { node: "დასახელება", justify_content: "center" },
          { node: "ფასი", justify_content: "center" },
          { node: "რაოდენობა", justify_content: "center" },
        ]}
        rows={flyingPestMonitorRows}
      />
      {/* <Table */}
      {/*   title={{ title: "მფრინავი მავნებლის მონიტორი", position: "center" }} */}
      {/*   headers={["#", "ბუზი", "ქინქლა", "", "შეიცვალა ფირფიტა"]} */}
      {/*   columns_number={5} */}
      {/*   onFlyingPestMonitorChange={handleFlyingPestMonitorChange} */}
      {/*   rows={[ */}
      {/*     [ */}
      {/*       { */}
      {/*         type: "inventoryInputText", */}
      {/*         rowIndex: 1, */}
      {/*         field: "id", */}
      {/*         value: "", */}
      {/*       }, */}
      {/*       { */}
      {/*         type: "inventoryInputText", */}
      {/*         rowIndex: 1, */}
      {/*         field: "price", */}
      {/*         value: "", */}
      {/*       }, */}
      {/*       { */}
      {/*         type: "inventoryInputText", */}
      {/*         rowIndex: 1, */}
      {/*         field: "quantity", */}
      {/*         value: "", */}
      {/*       }, */}
      {/*       { */}
      {/*         type: "inventoryInputText", */}
      {/*         rowIndex: 1, */}
      {/*         field: "price", */}
      {/*         value: "", */}
      {/*       }, */}
      {/*       { */}
      {/*         type: "inventoryInputText", */}
      {/*         rowIndex: 1, */}
      {/*         field: "quantity", */}
      {/*         value: "", */}
      {/*       }, */}
      {/*     ], */}
      {/*   ]} */}
      {/* /> */}
    </div>
  );
};
