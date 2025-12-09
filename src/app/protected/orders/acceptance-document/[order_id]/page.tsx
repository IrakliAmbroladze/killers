import { LogoWhiteOnBlue } from "@/components/atoms/logoWhiteOnBlue";
import { fetchOrderById } from "@/lib/supabase/fetchOrderById";
import { SanitaryService } from "@/types/SanitaryServices";
import { getTodaysYYYY_MM_DDString } from "@/utils/calendar/getTodaysString";

export default async function AcceptanceDocument({
  params,
}: {
  params: Promise<{ order_id: string }>;
}) {
  const { order_id } = await params;
  const order = await fetchOrderById(order_id);
  const services: SanitaryService[] = [
    "დეზინსექცია",
    "დერატიზაცია",
    "დეზინფექცია",
    "ქვეწარმავლების პრევენცია",
  ];

  return (
    <div className="flex justify-center items-center flex-col gap-5 px-2.5">
      <LogoWhiteOnBlue />
      <h1>მიღება-ჩაბარების აქტი</h1>
      <input type="date" defaultValue={getTodaysYYYY_MM_DDString()} />
      <p className="max-w-[780px]">
        ერთი მხრივ &quot;{order.customers.name}&quot; (ს/კ {order.customer_id};
        შემდგომში &quot;დამკვეთი&quot;) და მეორე მხრივ შპს &quot;ქილ&quot; (ს/კ{" "}
        405049923; შემდგომში &quot;შემსრულებელი&quot;) ვადასტურებთ, რომ
        შემსრულებელმა მიაწოდა, ხოლო დამკვეთმა მიიღო შემდეგი
        (მარკირებული/აღნიშნული) სახის მომსახურება:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => (
          <div key={service} className="flex gap-2.5">
            <input type="checkbox" id={service} />
            <label htmlFor={service}>{service}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
