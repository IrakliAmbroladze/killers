import type { AcceptanceFormData, HandleServicesChange } from "@/types";

export const ServicesCheckboxes = ({
  formData,
  handleServicesChange,
}: {
  formData: AcceptanceFormData;
  handleServicesChange: HandleServicesChange;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <label>
      <input
        type="checkbox"
        name="disinsection"
        checked={formData.services.disinsection}
        onChange={handleServicesChange}
      />
      დეზინსექცია
    </label>
    <label>
      <input
        type="checkbox"
        name="disinfection"
        checked={formData.services.disinfection}
        onChange={handleServicesChange}
      />
      დეზინფექცია
    </label>
    <label>
      <input
        type="checkbox"
        name="deratization"
        checked={formData.services.deratization}
        onChange={handleServicesChange}
      />
      დერატიზაცია
    </label>
    <label>
      <input
        type="checkbox"
        name="subcontractorPrevention"
        checked={formData.services.subcontractorPrevention}
        onChange={handleServicesChange}
      />
      ქვეწარმავლების პრევენცია
    </label>
  </div>
);
