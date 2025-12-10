import { LogoWhiteOnBlue } from "@/components/atoms/logoWhiteOnBlue";
import { fetchOrderById } from "@/lib/supabase/fetchOrderById";
import { SanitaryService } from "@/types/SanitaryServices";
import { getTodaysYYYY_MM_DDString } from "@/utils/calendar/getTodaysString";
import DoneAreas from "./DoneAreas";
import ProcedureTime from "./ProcedureTime";

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
  const tableData = [
    { pest: "ბუზი", chemic: "Killzone მღრღ. ფირფიტა", doze: "-" },
    { pest: "ქინქლა", chemic: "Killzone მწერის ფირფიტა", doze: "-" },
    { pest: "ტარაკანი", chemic: "BROMOBLEU", doze: "-" },
    { pest: "ჭიანჭველა", chemic: "RATIMOR", doze: "-" },
    { pest: "რწყილი", chemic: "Cipex10e", doze: "" },
    { pest: "ბაღლინჯო", chemic: "RAPTOR GEL", doze: "-" },
    { pest: "თაგვი", chemic: "BLEU DELTA", doze: "" },
    { pest: "ვირთხა", chemic: "AGITA", doze: "" },
    { pest: "ქვეწარმავალი", chemic: "SURFANIOS PREMIUM", doze: "" },
    { pest: "ბაქტერია", chemic: "REPTIL NATURAL STOP", doze: "-" },
    { pest: "ბზიკი", chemic: "ALFADOM", doze: "" },
  ];

  return (
    <div className="flex justify-center items-center flex-col gap-5 px-2.5 ">
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
      <div className="w-full overflow-auto flex">
        <div className="min-w-[300px] mx-auto">
          <table className="border border-collapse ">
            <thead>
              <tr>
                <th colSpan={7}>
                  ტერიტორიაზე ჩატარებული სამუშაოები და სამიზნე მავნებლები:
                </th>
              </tr>
              <tr>
                <th rowSpan={3}>მავნებელი</th>
                <th colSpan={3} rowSpan={2}>
                  გატარებული ღონისძიება
                </th>
                <th colSpan={3}>გამოყენებული საშუალებები</th>
              </tr>
              <tr>
                <th>დასახელება</th>
                <th>დოზირება</th>
                <th>გახარჯული</th>
              </tr>
              <tr>
                <th>მონიტორი</th>
                <th>სპრეი</th>
                <th>გელი</th>
                <td>
                  <label className="flex gap-2.5 justify-between">
                    <input type="checkbox" />
                    მხოხავი მავნებლის ფირფიტა
                  </label>
                </td>
                <td>-</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {tableData.map((td) => (
                <tr key={td.pest}>
                  <td className="min-w-[250px] shrink-0">
                    <label className="flex gap-2.5 justify-between">
                      <input type="checkbox" />
                      {td.pest}
                    </label>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="min-w-[300px] shrink-0">
                    <label className="flex gap-2.5 justify-between">
                      <input type="checkbox" />
                      {td.chemic}
                    </label>
                  </td>
                  <td>{td.doze}</td>
                  <td></td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th colSpan={3}>მიწოდებული ინვენტარი</th>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th>დასახელება</th>
                <th>ფასი</th>
                <th>რაოდენობა</th>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between">
            <DoneAreas />
            <div className="flex flex-col justify-between">
              <ProcedureTime />
              <div>
                <div className="border-b my-2.5">ობიექტის მისამართი:</div>
                <div className="border-b">{order.address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
