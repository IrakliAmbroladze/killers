// types/Customer.ts

export type Customer = {
  id: string;
  name: string;
  description: string | null;
  contractor?: boolean | null;
  source: string | null;
  source_comment: string | null;
};
