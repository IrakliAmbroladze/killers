import { CheckBox } from "@/components/atoms/CheckBox";
import type { HandleServicesChange } from "@/types";

export const ServicesCheckboxes = ({
  checkStatus,
  handleServicesChange,
}: {
  checkStatus: {
    disinsection: boolean;
    deratization: boolean;
    subcontractorPrevention: boolean;
    disinfection: boolean;
  };
  handleServicesChange: HandleServicesChange;
}) => {
  const data = [
    {
      name: "disinsection",
      label: "დეზინსექცია",
      checked: checkStatus.disinsection,
    },
    {
      name: "deratization",
      label: "დერატიზაცია",
      checked: checkStatus.deratization,
    },
    {
      name: "subcontractorPrevention",
      label: "ქვეწარმავლების პრევენცია",
      checked: checkStatus.subcontractorPrevention,
    },
    {
      name: "disinfection",
      label: "დეზინფექცია",
      checked: checkStatus.disinfection,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.map((item) => (
        <CheckBox
          key={item.name}
          name={item.name}
          checked={item.checked}
          onChange={handleServicesChange}
        >
          {item.label}
        </CheckBox>
      ))}
    </div>
  );
};
