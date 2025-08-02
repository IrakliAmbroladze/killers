"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, JSX, useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";

const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export function DateRange(): JSX.Element {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const today = useMemo(() => new Date(), []);
  const firstDayOfMonth = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
    [today]
  );

  const handleFromDate = useDebouncedCallback((term: string) => {
    if (term) {
      params.set("fromDate", term);
    } else {
      params.delete("fromDate");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 250);
  const handleToDate = useDebouncedCallback((term: string) => {
    if (term) {
      params.set("toDate", term);
    } else {
      params.delete("toDate");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 250);

  useEffect(() => {
    if (!params.get("fromDate")) {
      params.set("fromDate", formatDate(firstDayOfMonth));
      replace(`${pathname}?${params.toString()}`);
    }
    if (!params.get("toDate")) {
      params.set("toDate", formatDate(today));
      replace(`${pathname}?${params.toString()}`);
    }
  }, [firstDayOfMonth, params, pathname, replace, searchParams, today]);

  return (
    <div className="my-2">
      <input
        type="date"
        className={`bg-stone-100 dark:bg-stone-500 text-stone-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-200 px-4 py-0.5 rounded-lg pr-10 `}
        value={params.get("fromDate") || formatDate(firstDayOfMonth)}
        onChange={(e) => {
          const value = e.target.value;
          handleFromDate(value);
        }}
      />

      <input
        type="date"
        className={`bg-stone-100 dark:bg-stone-500 text-stone-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-200 px-4 py-0.5 rounded-lg pr-10 `}
        value={params.get("toDate") || formatDate(today)}
        onChange={(e) => {
          const value = e.target.value;
          handleToDate(value);
        }}
      />
    </div>
  );
}
