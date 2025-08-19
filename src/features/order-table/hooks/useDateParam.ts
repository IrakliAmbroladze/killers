import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const useDateParams = (
  pathname: string,
  router: AppRouterInstance,
  searchParams: ReadonlyURLSearchParams
) => {
  const updateDateParam = useDebouncedCallback(
    (key: "fromDate" | "toDate", value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      router.replace(`${pathname}?${params.toString()}`);
    },
    50
  );
  return { updateDateParam };
};
