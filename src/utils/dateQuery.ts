// utils/dateQuery.ts or add to existing Utils file

import * as Utils from "@/utils";

export const getDefaultDateParams = () => ({
  fromDate: Utils.formatDateYYYYMMDD(Utils.firstDayOfCurrentMonth),
  toDate: Utils.formatDateYYYYMMDD(new Date()),
});

export const getRedirectWithValidDateRange = (
  pathname: string,
  currentParams: { [key: string]: string | string[] | undefined }
): string => {
  const query = new URLSearchParams();
  Object.entries(currentParams).forEach(([key, value]) => {
    if (typeof value === "string") query.set(key, value);
  });

  const { fromDate, toDate } = getDefaultDateParams();
  query.set("fromDate", fromDate);
  query.set("toDate", toDate);

  return `${pathname}?${query.toString()}`;
};
