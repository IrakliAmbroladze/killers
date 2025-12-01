import { LinkItem } from "../types/LinkItem";

export const allLinks: LinkItem[] = [
  { name: "Orders", href: "/protected/orders", visibleToTechnician: false },
  {
    name: "Proced",
    href: "/protected/procedures",
    visibleToTechnician: true,
  },
  {
    name: "Cust",
    href: "/protected/customers",
    visibleToTechnician: false,
  },
];
