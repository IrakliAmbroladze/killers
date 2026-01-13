"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDateParams } from "../hooks/useDateParam";
import { InputDate } from "@/components";

export default function DateRange() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const fromDate = searchParams.get("fromDate") || "";
  const toDate = searchParams.get("toDate") || "";

  const { updateDateParam } = useDateParams(pathname, router, searchParams);

  return (
    <div className="flex gap-2">
      <InputDate
        name="fromDate"
        value={fromDate}
        handleChange={(e) => updateDateParam("fromDate", e.target.value)}
      />
      <InputDate
        name="toDate"
        value={toDate}
        handleChange={(e) => updateDateParam("toDate", e.target.value)}
      />
    </div>
  );
}
