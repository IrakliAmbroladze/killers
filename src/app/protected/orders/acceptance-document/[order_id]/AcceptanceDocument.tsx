"use client";
import { LogoWhiteOnBlue } from "@/components/atoms/logoWhiteOnBlue";
import DoneAreas from "./DoneAreas";
import ProcedureTime from "./ProcedureTime";
import AcceptanceSignature from "./AcceptanceSignature";
import { OrderExtended } from "@/types";
import { acceptanceFormData } from "@/constants";
import { Table } from "./Table";
import { useAcceptanceForm } from "@/hooks";
import { Address } from "./Address";
import { ServicesCheckboxes } from "./ServicesCheckboxes";
import CustomerNamePersonalNumber from "./CustomerNamePersonalNumber";
import { use } from "react";
import { AcceptanceDocumentTitle } from "@/features/acceptance-documnet/components/AcceptanceDocumentTitle";
import { AcceptanceDocumentDate } from "@/features/acceptance-documnet/components/AcceptanceDocumentDate";

export default function AcceptanceDocument({
  orderPromise,
}: {
  orderPromise: Promise<OrderExtended>;
}) {
  const order = use(orderPromise);
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
    handleDateChange,
  } = useAcceptanceForm(acceptanceFormData(order));

  return (
    <div className="flex justify-center items-center flex-col gap-5 px-2.5 text-sm">
      <LogoWhiteOnBlue />
      <AcceptanceDocumentTitle />
      <AcceptanceDocumentDate handleChange={handleDateChange} />
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

          <CustomerNamePersonalNumber
            onProcedureTimeChange={handleProcedureTimeChange}
            name={formData.customer.representative.name}
            personalNumber={formData.customer.representative.id}
          />
          <AcceptanceSignature formData={formData} />
        </div>
      </div>
    </div>
  );
}
