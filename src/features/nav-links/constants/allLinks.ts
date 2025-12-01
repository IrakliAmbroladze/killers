import { LinkItem } from "../types/LinkItem";

export const allLinks: LinkItem[] = [
  { name: "Orders", href: "/protected/orders", visibleToTechnician: false },
  {
    name: "Procedures",
    href: "/protected/procedures",
    visibleToTechnician: true,
  },
  {
    name: "Customers",
    href: "/protected/customers",
    visibleToTechnician: false,
  },
];
