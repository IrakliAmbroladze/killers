import * as Utils from "@/utils";

export const hasValidDateRangeQuery = (params: {
  [key: string]: string | string[] | undefined;
}): boolean => {
  return (
    typeof params.fromDate === "string" &&
    typeof params.toDate === "string" &&
    Utils.isValidYYYYMMDD(params.fromDate) &&
    Utils.isValidYYYYMMDD(params.toDate)
  );
};
