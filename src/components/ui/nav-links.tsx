// "use client";
import Link from "next/link";
import React, { JSX } from "react";
import { createClient } from "@/utils/supabase/server";
import { isTechnician } from "@/utils/supabase/utils";

interface LinkItem {
  name: string;
  href: string;
}

const allLinks: LinkItem[] = [
  { name: "Orders", href: "/protected/orders" },
  { name: "Procedures", href: "/protected/procedures" },
];

export default async function NavLinks(): Promise<JSX.Element> {
  const supabase = await createClient();

  const userResponse = await supabase.auth.getUser();

  const linksToShow = (await isTechnician(userResponse))
    ? allLinks.filter((link) => link.name !== "Sales" && link.name !== "Orders")
    : allLinks;

  return (
    <div className="flex flex-wrap gap-2 sm:flex-col">
      {linksToShow.map((link) => (
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
