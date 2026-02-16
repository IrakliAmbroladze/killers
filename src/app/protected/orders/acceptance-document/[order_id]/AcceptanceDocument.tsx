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
import { MainText } from "./MainText";
import { InspectionDocument } from "@/features/inspection-document/InspectionDocument";
import { notoSansGeorgian } from "@/fonts";

export default function AcceptanceDocument({
  orderPromise,
}: {
  orderPromise: Promise<OrderExtended>;
}) {
  console.log("render AcceptanceDocument");
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
    handlePestTextChange,
  } = useAcceptanceForm(acceptanceFormData(order));

  return (
    <div
      className={`${notoSansGeorgian.className} flex justify-center items-center flex-col gap-5 px-2.5 text-sm`}
    >
      <LogoWhiteOnBlue />
      <AcceptanceDocumentTitle />
      <AcceptanceDocumentDate handleChange={handleDateChange} />
      <MainText
        customer_name={order.customers.name}
        customer_id={order.customer_id}
      />
      <ServicesCheckboxes
        checkStatus={{
          disinsection: formData.services.disinsection,
          deratization: formData.services.deratization,
          subcontractorPrevention: formData.services.subcontractorPrevention,
          disinfection: formData.services.disinfection,
        }}
        handleServicesChange={handleServicesChange}
      />
      <div className="w-full overflow-auto flex">
        <div className="min-w-[300px] mx-auto">
          <h3 className="font-georgian font-bold">
            ტერიტორიაზე ჩატარებული სამუშაოები და სამიზნე მავნებლები:
          </h3>
          <div>გატარებული ღონისძიება</div>
          <Table
            headers={["მავნებელი", "მონიტორი", "სპრეი", "გელი"]}
            rows={pestRows}
            onCheckboxChange={handlePestEventChange}
            onPestTextChange={handlePestTextChange}
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
          <InspectionDocument inspection_doc={order.inspection_doc} />
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
