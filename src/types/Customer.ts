// types/Customer.ts

export type Customer = {
  id: string;
  name: string;
  description: string | null;
  contractor?: boolean | null;
};
