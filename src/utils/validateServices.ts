import { AcceptanceFormData } from "@/types";

export function validateServices(
  services: AcceptanceFormData["services"],
): boolean {
  return Object.values(services).some(Boolean);
}
