"use client";

import { monthNamesInGeoArray } from "@/constants";
import { useMonth } from "@/hooks/useMonth";
import { useYear } from "@/hooks/useYear";
import { getFirstDateOfMonth, getLastDateOfMonth } from "@/utils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export const CalendarHeader = ({
  selectedWeek,
  setSelectedWeek,
  weeks,
  showCalendar,
  setShowCalendar,
}: {
  selectedWeek: number;
  setSelectedWeek: React.Dispatch<React.SetStateAction<number>>;
  weeks: number;
  showCalendar: boolean;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { month, setMonth } = useMonth();
  const { year, setYear } = useYear();
  const fromDate = getFirstDateOfMonth(year, month + 1);
  const toDate = getLastDateOfMonth(year, month + 1);
  useEffect(() => {
    if (!year || !month) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("fromDate", fromDate);
    params.set("toDate", toDate);
    router.push(`${pathname}?${params.toString()}`);
  }, [fromDate, month, pathname, router, searchParams, toDate, year]);

  return (
    <div className="flex my-2 justify-between text-xs">
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="border w-12"
      />
      <button
        className="border rounded-sm text-xs"
        onClick={() => setShowCalendar((prev) => !prev)}
      >
        {showCalendar ? "Hide Calendar" : "Show Calendar"}
      </button>

      <select
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
        className="text-black bg-gray-100 text-xs"
      >
        {monthNamesInGeoArray.map((m, index) => (
          <option key={index} value={index}>
            {m}
          </option>
        ))}
      </select>

      <select
        value={selectedWeek}
        onChange={(e) => setSelectedWeek(Number(e.target.value))}
        className="px-2 lg:hidden text-black bg-gray-100"
      >
        {Array.from({ length: weeks }, (_, idx) => (
          <option key={idx} value={idx + 1}>
            კვირა {idx + 1}
          </option>
        ))}
      </select>
    </div>
  );
};
