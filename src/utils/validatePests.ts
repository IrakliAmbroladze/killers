import { AcceptanceFormData } from "@/types";

export function validatePests(pests: AcceptanceFormData["pests"]): boolean {
  return pests.some((pest) => pest.monitor || pest.spray || pest.gel);
}
