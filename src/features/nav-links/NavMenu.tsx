"use client";
import { useState } from "react";
import Link from "next/link";
import { NavMenuProps } from "./types/NavMenuProps";
import { Menu, X } from "lucide-react";

export default function NavMenu({ links, fromDate, toDate }: NavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden md:flex flex-wrap gap-2 h-full">
        {links?.map((link) => (
          <Link
            key={link.name}
            href={{ pathname: link.href, query: { fromDate, toDate } }}
            className="flex text-black items-center justify-center rounded-md bg-white text-xs font-medium hover:bg-sky-100 hover:text-blue-600 p-2 px-3"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="dark:bg-black cursor-pointer md:hidden flex items-center justify-center rounded-md bg-white h-9 w-9 shrink-0 mx-2.5"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0  mt-1 flex flex-col gap-1 rounded-md bg-white p-2 shadow-lg z-50">
          {links?.map((link) => (
            <Link
              key={link.name}
              href={{ pathname: link.href, query: { fromDate, toDate } }}
              onClick={() => setIsOpen(false)}
              className="flex text-black items-center rounded-md text-xs font-medium hover:bg-sky-100 hover:text-blue-600 p-2"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
