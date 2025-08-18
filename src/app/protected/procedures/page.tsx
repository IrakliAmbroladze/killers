// import Calendar from "@/features/calendar/components/Calendar";
// import { MonthProvider } from "@/context/month/Provider";
// import ToDoDoneList from "@/features/to-do-list/components/ToDoDoneList";

import { validateUrlForGettingOrders } from "@/utils";
import { headers } from "next/headers";
import { proceduresPathName } from "./constants/proceduresPathName";
import { getOrders } from "@/lib/getOrders";

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
  console.log("orders length in procedures: ", orders.length);
  return (
    <div className="w-full">
      Procedures page
      {/* <MonthProvider>
        <Calendar />
        <ToDoDoneList />
      </MonthProvider> */}
    </div>
  );
};

export default ProceduresPage;
