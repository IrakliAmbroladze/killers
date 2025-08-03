import * as Utils from "@/utils";

export const getValidDateParam = (
  params: { [key: string]: string | string[] | undefined },
  key: string,
  fallback: Date
): string => {
  const value = params[key];
  return typeof value === "string" ? value : Utils.formatDateYYYYMMDD(fallback);
};
