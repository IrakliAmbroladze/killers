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

export interface Sheets_Invoice {
  date: string;
  customer: string;
  identity: string;
  address: string;
  payment: string;
  items: string;
  total: string;
  provider: string;
  seller: string;
  telephone: string;
  email: string;
  delivery_date: string;
}
