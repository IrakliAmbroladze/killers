import { Table } from "@/components";

export const InspectionDefault = ({
  handleFlyingPestMonitorChange,
}: {
  handleFlyingPestMonitorChange: (
    rowIndex: number,
    field: "id" | "fly" | "kinkla" | "plate_was_changed",
    value: string | boolean,
  ) => void;
}) => {
  return (
    <div>
      this is default component
      <Table
        title={{ title: "მფრინავი მავნებლის მონიტორი", position: "center" }}
        headers={["#", "ბუზი", "ქინქლა", "", "შეიცვალა ფირფიტა"]}
        columns_number={5}
        onFlyingPestMonitorChange={handleFlyingPestMonitorChange}
        rows={[
          [
            {
              type: "inventoryInputText",
              rowIndex: 1,
              field: "id",
              value: "",
            },
            {
              type: "inventoryInputText",
              rowIndex: 1,
              field: "price",
              value: "",
            },
            {
              type: "inventoryInputText",
              rowIndex: 1,
              field: "quantity",
              value: "",
            },
            {
              type: "inventoryInputText",
              rowIndex: 1,
              field: "price",
              value: "",
            },
            {
              type: "inventoryInputText",
              rowIndex: 1,
              field: "quantity",
              value: "",
            },
          ],
        ]}
      />
    </div>
  );
};
