import { AcceptanceFormData } from "@/types";
import { PDFForm } from "pdf-lib";

type SanitaryServices = {
  form: PDFForm;
  formData: AcceptanceFormData;
};

export const sanitaryServices = ({ form, formData }: SanitaryServices) => {
  const disinfectionField = form.createCheckBox("service.disinfection");
  const disinsectionField = form.createCheckBox("service.disinsection");
  const deratizationField = form.createCheckBox("service.deratization");
  const subcontractorPreventionField = form.createCheckBox(
    "service.subcontractorPrevention",
  );

  return [
    {
      label: "დეზინსექცია",
      checked: formData.services.disinsection,
      field: disinsectionField,
    },
    {
      label: "დეზინფექცია",
      checked: formData.services.disinfection,
      field: disinfectionField,
    },
    {
      label: "დერატიზაცია",
      checked: formData.services.deratization,
      field: deratizationField,
    },

    {
      label: "ქვეწარმავლების პრევენცია",
      checked: formData.services.subcontractorPrevention,
      field: subcontractorPreventionField,
    },
  ];
};
