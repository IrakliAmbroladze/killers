"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDateParams } from "../hooks/useDateParam";
import { InputDate } from "@/components";

export default function DateRange() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { updateDateParam } = useDateParams(pathname, router, searchParams);

  const DATE_RANGE = [
    { name: "fromDate" as const, value: searchParams.get("fromDate") || "" },
    { name: "toDate" as const, value: searchParams.get("toDate") || "" },
  ];

  return (
    <div className="flex gap-2">
      {DATE_RANGE.map(({ name, value }) => (
        <InputDate
          key={name}
          name={name}
          value={value}
          handleChange={(e) => updateDateParam(name, e.target.value)}
        />
      ))}
    </div>
  );
}
