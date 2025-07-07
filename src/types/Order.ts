//Order.ts

import { Customer } from "./Customer";

export interface Order {
  id: string;
  created_at: string;
  customer_id: string;
  address: string;
  payment_type_id: number;
  items: string;
  price: number;
  provider_id: number;
  seller_id: string;
  phone: string | null;
  email: string | null;
  delivery_date: string;
  technician: string | null;
  document: string | null;
  plan_time: string | null;
  approve: string | null;
}

export interface OrderWithCustomer extends Order {
  customers: Customer;
}
