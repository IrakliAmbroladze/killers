import { CheckBox } from "@/components/atoms/CheckBox";
import type { AcceptanceFormData, HandleServicesChange } from "@/types";

export const ServicesCheckboxes = ({
  formData,
  handleServicesChange,
}: {
  formData: AcceptanceFormData;
  handleServicesChange: HandleServicesChange;
}) => {
  const data = [
    {
      name: "disinsection",
      label: "დეზინსექცია",
      checked: formData.services.disinsection,
    },
    {
      name: "deratization",
      label: "დერატიზაცია",
      checked: formData.services.deratization,
    },
    {
      name: "subcontractorPrevention",
      label: "ქვეწარმავლების პრევენცია",
      checked: formData.services.subcontractorPrevention,
    },
    {
      name: "disinfection",
      label: "დეზინფექცია",
      checked: formData.services.disinfection,
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
