// import Calendar from "@/features/calendar/components/Calendar";
// import { MonthProvider } from "@/context/month/Provider";
// import ToDoDoneList from "@/features/to-do-list/components/ToDoDoneList";

import { validateUrlForGettingOrders } from "@/utils";
import { headers } from "next/headers";
import { proceduresPathName } from "./constants/proceduresPathName";
import { getOrders } from "@/lib/getOrders";
import { Calendar } from "@/components";
import ToDoDoneList from "@/features/to-do-list/components/ToDoDoneList";
import DateRange from "@/features/order-table/components/DateRange";
import { getCalendarTasks } from "@/lib";

const ProceduresPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
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
      <DateRange />
      <Calendar orders={orders} calendarTasks={calendarTasks} />
      <ToDoDoneList orders={orders} />
    </div>
  );
};

export default ProceduresPage;
