import React, { JSX } from "react";
import Link from "next/link";
import Image from "next/image";

// import Image from "next/image";
import NavLinks from "./nav-links";

export default function SideNav(): JSX.Element {
  return (
    <div>
      <div className=" cursor-pointer mb-2 flex h-40 justify-center rounded-md bg-[#222e46] p-4 items-center">
        <Link href="/" className="text-white text-9xl">
          <Image
            src="/logoWhite.png"
            height={450}
            width={450}
            alt="logo"
            className="h-28 w-auto"
          />
        </Link>
      </div>

      <NavLinks />
    </div>
  );
}
