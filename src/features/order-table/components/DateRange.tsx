"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDateParams } from "../hooks/useDateParam";

export function DateRange() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const fromDate = searchParams.get("fromDate") || "";
  const toDate = searchParams.get("toDate") || "";

  const { updateDateParam } = useDateParams(pathname, router, searchParams);

  return (
    <div className="my-2 flex gap-2">
      <input
        type="date"
        value={fromDate}
        className="bg-stone-100 dark:bg-stone-500 text-stone-800 dark:text-gray-200 px-4 py-0.5 rounded-lg"
        onChange={(e) => updateDateParam("fromDate", e.target.value)}
      />

      <input
        type="date"
        value={toDate}
        className="bg-stone-100 dark:bg-stone-500 text-stone-800 dark:text-gray-200 px-4 py-0.5 rounded-lg"
        onChange={(e) => updateDateParam("toDate", e.target.value)}
      />
    </div>
  );
}
