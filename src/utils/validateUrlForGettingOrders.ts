import { getRedirectWithValidDateRange } from "./dateQuery";
import { hasValidDateRangeQuery } from "./hasValidDateRangeQuery";
import { redirect } from "next/navigation";

export const validateUrlForGettingOrders = (
  params: { [key: string]: string | string[] | undefined },
  header: Headers,
  pageName: string
) => {
  if (!hasValidDateRangeQuery(params)) {
    const pathname = header.get("x-url")?.split("?")[0] ?? pageName;
    const redirectUrl = getRedirectWithValidDateRange(pathname, params);

    redirect(redirectUrl);
  }
};
