import { AcceptanceFormData } from "@/types";

export function validateRequiredFields(formData: AcceptanceFormData): boolean {
  return (
    formData.customer.representative.name.trim() !== "" &&
    formData.startTime.trim() !== "" &&
    formData.endTime.trim() !== "" &&
    formData.comment.trim() !== ""
  );
}
