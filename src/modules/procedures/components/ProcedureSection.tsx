import "server-only";

import { headers } from "next/headers";
import { Calendar } from "@/components";
import ToDoDoneList from "@/features/to-do-list/components/ToDoDoneList";
import { getCalendarTasks } from "@/lib";
import { getOrders } from "@/modules/orders/server";
import { validateUrlForGettingOrders } from "@/modules/orders/utils/validateUrlForGettingOrders";
import { proceduresPathName } from "@/app/protected/procedures/constants/proceduresPathName";

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export const ProceduresSection = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const header = await headers();

  validateUrlForGettingOrders(params, header, proceduresPathName);
  const { fromDate, toDate } = params;
  const { orders } = await getOrders({ fromDate, toDate } as {
    fromDate: string;
    toDate: string;
  });
  const calendarTasks = await getCalendarTasks();

  return (
    <div className="w-full">
      <Calendar orders={orders} calendarTasks={calendarTasks} />
      <ToDoDoneList orders={orders} />
    </div>
  );
}
