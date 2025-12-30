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
import { Table } from "./Table";
import { TableCell } from "@/pdf/types/Table";

export default function AcceptanceDocument({
  order,
}: {
  order: OrderExtended;
}) {
  /*  const tableData = [
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
  ];*/

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
    inventory: [
      { name: "", price: "", quantity: "" },
      { name: "", price: "", quantity: "" },
      { name: "", price: "", quantity: "" },
    ],
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

  const pestRows: TableCell[][] = formData.pests.map((pest) => [
    { type: "text", text: pest.name },
    {
      type: "checkbox",
      checked: pest.monitor,
      pestName: pest.name,
      field: "monitor",
    },
    {
      type: "checkbox",
      checked: pest.spray,
      pestName: pest.name,
      field: "spray",
    },
    {
      type: "checkbox",
      checked: pest.gel,
      pestName: pest.name,
      field: "gel",
    },
  ]);
  const materialRows: TableCell[][] = formData.products.map((material) => [
    { type: "text", text: material.name },
    { type: "text", text: material.dosage },
    { type: "inputText", materialName: material.name, value: material.used },
  ]);

  const inventoryRows: TableCell[][] = formData.inventory.map(
    (item, rowIndex) => [
      {
        type: "inventoryInputText",
        rowIndex,
        field: "name",
        value: item.name,
      },
      {
        type: "inventoryInputText",
        rowIndex,
        field: "price",
        value: item.price,
      },
      {
        type: "inventoryInputText",
        rowIndex,
        field: "quantity",
        value: item.quantity,
      },
    ],
  );

  const handlePestEventChange = (
    pestName: string,
    field: "monitor" | "spray" | "gel",
    checked: boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      pests: prev.pests.map((pest) =>
        pest.name === pestName ? { ...pest, [field]: checked } : pest,
      ),
    }));
  };
  const handleMaterialEventChange = (materialName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.map((product) =>
        product.name === materialName ? { ...product, used: value } : product,
      ),
    }));
  };
  const handleSoldInventoryChange = (
    rowIndex: number,
    field: "name" | "price" | "quantity",
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      inventory: prev.inventory.map((item, index) =>
        index === rowIndex ? { ...item, [field]: value } : item,
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
          <h3>ტერიტორიაზე ჩატარებული სამუშაოები და სამიზნე მავნებლები:</h3>
          <div>გატარებული ღონისძიება</div>
          <Table
            headers={["მავნებელი", "მონიტორი", "სპრეი", "გელი"]}
            rows={pestRows}
            onCheckboxChange={handlePestEventChange}
          />
          <div>გამოყენებული საშუალებები</div>
          <Table
            headers={["დასახელება", "დოზირება", "გახარჯული"]}
            rows={materialRows}
            onInputTextChange={handleMaterialEventChange}
          />
          <div>მიწოდებული ინვენტარი</div>
          <Table
            headers={["დასახელება", "ფასი", "რაოდენობა"]}
            rows={inventoryRows}
            onInventoryTextChange={handleSoldInventoryChange}
          />

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
