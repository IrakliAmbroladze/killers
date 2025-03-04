import { Customer } from "@/types/customers";
import { Product } from "@/types/products";

export interface Invoice {
  id: number;
  customer_id: number;
  product_id: number;
  quantity: number;
  date: string;
  plan_date: string;
  delivery_date: string;
  payment: boolean;
  customers: Customer;
  products: Product;
}
