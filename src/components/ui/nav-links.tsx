"use client";
import Link from "next/link";
import React, { JSX } from "react";

interface LinkItem {
  name: string;
  href: string;
}

const links: LinkItem[] = [
  { name: "Sales", href: "/protected/sales" },
  { name: "Orders", href: "/protected/orders" },
];

export default function NavLinks(): JSX.Element {
  return (
    <div className="flex flex-wrap gap-2 sm:flex-col">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="flex h-[48px] text-black grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3"
        >
          <p className="md:block">{link.name}</p>
        </Link>
      ))}
    </div>
  );
}
