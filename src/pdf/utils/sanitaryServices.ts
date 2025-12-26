import { SanitaryServices } from "../types/SanitaryServices";

export const sanitaryServices = ({ formData }: SanitaryServices) => {
  return [
    {
      label: "დეზინსექცია",
      checked: formData.services.disinsection,
    },
    {
      label: "დეზინფექცია",
      checked: formData.services.disinfection,
    },
    {
      label: "დერატიზაცია",
      checked: formData.services.deratization,
    },

    {
      label: "ქვეწარმავლების პრევენცია",
      checked: formData.services.subcontractorPrevention,
    },
  ];
};
