// "use client";
import Link from "next/link";
import Image from "next/image";
import React, { JSX } from "react";

import { getNavLinks } from "./utils/navLinksService";
import { getFirstDateOfMonth, getLastDateOfMonth } from "@/utils";
import { currentMonth, currentYear } from "@/constants";

export default async function NavLinks(): Promise<JSX.Element> {
  const linksToShow = await getNavLinks();

  const fromDate = getFirstDateOfMonth(currentYear, currentMonth + 1);
  const toDate = getLastDateOfMonth(currentYear, currentMonth + 1);

  return (
    <div className={`flex flex-wrap gap-0.5 sm:gap-2 h-full`}>
      <Link
        href="/"
        className=" cursor-pointer flex justify-center rounded-md bg-[#222e46] items-center p-2"
      >
        <div className="h-6 w-6 relative">
          <Image src="/logoWhite.png" alt="logo" fill />
        </div>
      </Link>
      {linksToShow &&
        linksToShow.map((link) => (
          <Link
            key={link.name}
            href={{
              pathname: link.href,
              query: { fromDate, toDate },
            }}
            className="flex text-black grow items-center justify-center rounded-md bg-white text-xs font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3"
          >
            <p className="md:block">{link.name}</p>
          </Link>
        ))}
    </div>
  );
}
