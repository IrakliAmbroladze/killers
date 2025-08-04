import * as Utils from "@/utils";

export const getValidDateParam = (
  params: { [key: string]: string | string[] | undefined },
  key: string,
  fallback: Date
): string => {
  const value = params[key];

  if (typeof value === "string") {
    const isValid = Utils.isValidYYYYMMDD(value);

    if (!isValid) {
      console.warn(`Invalid date format for '${key}': ${value}`);
    }

    if (isValid) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return value;
      }
    }
  }

  return Utils.formatDateYYYYMMDD(fallback);
};
