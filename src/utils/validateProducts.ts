import { AcceptanceFormData } from "@/types";

export function validateProducts(
  products: AcceptanceFormData["products"],
): boolean {
  return products.some((product) => product.checked);
}
