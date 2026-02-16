import type { AcceptanceFormData, HandleServicesChange } from "@/types";
import { Check, Square } from "lucide-react";

export const ServicesCheckboxes = ({
  formData,
  handleServicesChange,
}: {
  formData: AcceptanceFormData;
  handleServicesChange: HandleServicesChange;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <label className="cursor-pointer select-none flex justify-start items-center">
      <input
        type="checkbox"
        name="disinsection"
        checked={formData.services.disinsection}
        onChange={handleServicesChange}
        className="opacity-0"
      />
      {formData.services.disinsection ? (
        <Check size={32} className="ml-[-13px] mr-2" />
      ) : (
        <Square size={32} className="ml-[-13px] mr-2" />
      )}
      დეზინსექცია
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
    <label>
      <input
        type="checkbox"
        name="disinfection"
        checked={formData.services.disinfection}
        onChange={handleServicesChange}
      />
      დეზინფექცია
    </label>
  </div>
);
