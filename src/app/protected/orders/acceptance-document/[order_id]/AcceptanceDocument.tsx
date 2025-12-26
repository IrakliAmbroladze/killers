"use client";
import { LogoWhiteOnBlue } from "@/components/atoms/logoWhiteOnBlue";
import { getTodaysYYYY_MM_DDString } from "@/utils/calendar/getTodaysString";
import DoneAreas from "./DoneAreas";
import ProcedureTime from "./ProcedureTime";
import AcceptanceSignature from "./AcceptanceSignature";
import { AcceptanceFormData, OrderExtended } from "@/types";
import { useState } from "react";
import { pestTableData } from "@/constants";
import { productsTableData } from "@/constants/acceptance";

export default function AcceptanceDocument({
  order,
}: {
  order: OrderExtended;
}) {
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

  const acceptanceFormData: AcceptanceFormData = {
    date: "2025-12-19",
    services: {
      disinsection: false,
      deratization: false,
      disinfection: false,
      subcontractorPrevention: false,
    },
    pests: pestTableData.map((pest) => ({
      name: pest,
      checked: true,
      monitor: false,
      spray: false,
      gel: false,
    })),
    products: productsTableData.map((product) => ({
      name: product,
      checked: true,
      dosage: "-",
      used: "",
    })),
    inventory: [],
    spaces: { სამზარეულო: true, ოფისი: true },
    startTime: "09:00",
    endTime: "11:00",
    address: "საქანელას ქ.2",
    customer: {
      name: order.customers.name,
      personalNumber: order.customers.id,
      signature: "",
    },
    executor: {
      signature: "",
    },
  };
  const [formData, setFormData] = useState(acceptanceFormData);
  const handlePestEventChange = (
    pestName: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      pests: prev.pests.map((pest) =>
        pest.name === pestName ? { ...pest, [name]: checked } : pest,
      ),
    }));
  };
  const handleServicesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [name]: checked,
      },
    }));
  };

  return (
    <div className="flex justify-center items-center flex-col gap-5 px-2.5 ">
      <LogoWhiteOnBlue />
      <h1>მიღება-ჩაბარების აქტი</h1>
      <input
        type="date"
        name="date"
        defaultValue={getTodaysYYYY_MM_DDString()}
        onChange={handleServicesChange}
      />
      <p className="max-w-[780px]">
        ერთი მხრივ &quot;{order.customers.name}&quot; (ს/კ {order.customer_id};
        შემდგომში &quot;დამკვეთი&quot;) და მეორე მხრივ შპს &quot;ქილ&quot; (ს/კ{" "}
        405049923; შემდგომში &quot;შემსრულებელი&quot;) ვადასტურებთ, რომ
        შემსრულებელმა მიაწოდა, ხოლო დამკვეთმა მიიღო შემდეგი
        (მარკირებული/აღნიშნული) სახის მომსახურება:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label>
          <input
            type="checkbox"
            name="disinsection"
            checked={formData.services.disinsection}
            onChange={handleServicesChange}
          />
          დეზინსექცია
        </label>
        <label>
          <input
            type="checkbox"
            name="disinfection"
            checked={formData.services.disinfection}
            onChange={handleServicesChange}
          />
          დეზინფექცია
        </label>
        <label>
          <input
            type="checkbox"
            name="deratization"
            checked={formData.services.deratization}
            onChange={handleServicesChange}
          />
          დერატიზაცია
        </label>
        <label>
          <input
            type="checkbox"
            name="subcontractorPrevention"
            checked={formData.services.subcontractorPrevention}
            onChange={handleServicesChange}
          />
          ქვეწარმავლების პრევენცია
        </label>
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
                      {/* <input type="checkbox" />*/}
                      {td.pest}
                    </label>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="monitor"
                      onChange={(e) => handlePestEventChange(td.pest, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="spray"
                      onChange={(e) => handlePestEventChange(td.pest, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="gel"
                      onChange={(e) => handlePestEventChange(td.pest, e)}
                    />
                  </td>
                  <td className="min-w-[300px] shrink-0">
                    <label className="flex gap-2.5 justify-between">
                      {/* <input type="checkbox" />*/}
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
              <div className="max-w-72">
                <div className="border-b my-2.5">ობიექტის მისამართი:</div>
                <div className="border-b text-wrap">{order.address}</div>
              </div>
            </div>
          </div>
          <AcceptanceSignature formData={formData} />
        </div>
      </div>
    </div>
  );
}
