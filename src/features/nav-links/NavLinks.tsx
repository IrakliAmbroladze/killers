// "use client";
import Link from "next/link";
import Image from "next/image";
import React, { JSX } from "react";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { getNavLinks } from "./utils/navLinksService";

export default async function NavLinks(): Promise<JSX.Element> {
  const { linksToShow } = await getNavLinks();

  return (
    <div className={`flex flex-wrap gap-2 h-full`}>
      <Link
        href="/"
        className=" cursor-pointer mb-2 flex justify-center rounded-md bg-[#222e46] h-20 items-center"
      >
        <div className={`text-white text-9xl h-10 w-10 relative`}>
          <Image src="/logoWhite.png" alt="logo" fill />
        </div>
      </Link>
      {linksToShow.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="flex text-black grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3"
        >
          <p className="md:block">{link.name}</p>
        </Link>
      ))}
      <nav>
        <div className="flex gap-5 items-center">
          {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
          <ThemeSwitcher />
        </div>
      </nav>
    </div>
  );
}
