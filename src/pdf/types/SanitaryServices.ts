import { AcceptanceFormData } from "@/types";
import { PDFCheckBox, PDFForm } from "pdf-lib";

export type SanitaryServices = {
  form: PDFForm;
  formData: AcceptanceFormData;
};

export type Services = {
  label: string;
  checked: boolean;
  field: PDFCheckBox;
};
