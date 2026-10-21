import { criteria_constants } from "@/constants/acceptance";
import { AcceptanceFormData } from "@/types";

export function validateCriteria(
  criteria: AcceptanceFormData["criteria"],
): boolean {
  return criteria_constants.every(({ id }) => id in criteria);
}
