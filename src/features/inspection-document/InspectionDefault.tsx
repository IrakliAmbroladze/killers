import { Table } from "@/components";

export const InspectionDefault = () => {
  return (
    <div>
      this is default component
      <Table
        title={{ title: "მფრინავი მავნებლის მონიტორი", position: "center" }}
        headers={["#", "ბუზი", "ქინქლა", "", "შეიცვალა ფირფიტა"]}
        columns_number={5}
        rows={[
          [
            {
              type: "inventoryInputText",
              rowIndex: 1,
              field: "name",
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
