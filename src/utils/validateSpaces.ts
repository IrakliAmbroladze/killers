import { AcceptanceFormData } from "@/types";

export function validateSpaces(spaces: AcceptanceFormData["spaces"]): boolean {
  return Object.values(spaces).some(Boolean);
}
