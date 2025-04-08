import React, { JSX } from "react";
import Link from "next/link";
import Image from "next/image";

// import Image from "next/image";
import NavLinks from "./nav-links";

export default function SideNav(): JSX.Element {
  return (
    <div className="w-full">
      <div className=" cursor-pointer mb-2 flex justify-center rounded-md bg-[#222e46] h-20 items-center">
        <Link href="/" className="text-white text-9xl h-16 w-16 relative">
          <Image src="/logoWhite.png" alt="logo" fill />
        </Link>
      </div>

      <NavLinks />
    </div>
  );
}
