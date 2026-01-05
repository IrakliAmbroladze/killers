"use client";
import { LogoWhiteOnBlue } from "@/components/atoms/logoWhiteOnBlue";
import { getTodaysYYYY_MM_DDString } from "@/utils/calendar/getTodaysString";
import DoneAreas from "./DoneAreas";
import ProcedureTime from "./ProcedureTime";
import AcceptanceSignature from "./AcceptanceSignature";
import { OrderExtended } from "@/types";
import { acceptanceFormData } from "@/constants";
import { Table } from "./Table";
import { useAcceptanceForm } from "@/hooks";
import { Address } from "./Address";
import { ServicesCheckboxes } from "./ServicesCheckboxes";

export default function AcceptanceDocument({
  order,
}: {
  order: OrderExtended;
}) {
  const {
    formData,
    handleServicesChange,
    handleSoldInventoryChange,
    handlePestEventChange,
    handleMaterialEventChange,
    pestRows,
    materialRows,
    inventoryRows,
    handleSpaceChange,
    handleProcedureTimeChange,
  } = useAcceptanceForm(acceptanceFormData(order));

  return (
    <div className="flex justify-center items-center flex-col gap-5 px-2.5 text-sm">
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
      <ServicesCheckboxes
        formData={formData}
        handleServicesChange={handleServicesChange}
      />
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

          <DoneAreas spaces={formData.spaces} onChange={handleSpaceChange} />
          <ProcedureTime
            onProcedureTimeChange={handleProcedureTimeChange}
            startTime={formData.startTime}
            endTime={formData.endTime}
          />
          <Address address={order.address} />
          <AcceptanceSignature formData={formData} />
        </div>
      </div>
    </div>
  );
}
