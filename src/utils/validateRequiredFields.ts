export function validateRequiredFields(formData: AcceptanceFormData): boolean {
  return (
    formData.customer.name.trim() !== "" &&
    formData.startTime.trim() !== "" &&
    formData.endTime.trim() !== "" &&
    formData.comment.trim() !== ""
  );
}
