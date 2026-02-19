"use client";
import { LogoWhiteOnBlue } from "@/components/atoms/logoWhiteOnBlue";
import DoneAreas from "./DoneAreas";
import ProcedureTime from "./ProcedureTime";
import AcceptanceSignature from "./AcceptanceSignature";
import { Cell, OrderExtended } from "@/types";
import { acceptanceFormData } from "@/constants";
import { Table } from "@/components";
import { useAcceptanceForm } from "@/hooks";
import { Address } from "./Address";
import { ServicesCheckboxes } from "./ServicesCheckboxes";
import CustomerNamePersonalNumber from "./CustomerNamePersonalNumber";
import { use, useMemo } from "react";
import { AcceptanceDocumentTitle } from "@/features/acceptance-documnet/components/AcceptanceDocumentTitle";
import { AcceptanceDocumentDate } from "@/features/acceptance-documnet/components/AcceptanceDocumentDate";
import { MainText } from "./MainText";
import { InspectionDocument } from "@/features/inspection-document/InspectionDocument";
import { notoSansGeorgian } from "@/fonts";
import { CheckBox } from "@/components/atoms/CheckBox";

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
    materialRows,
    inventoryRows,
    handleSpaceChange,
    handleProcedureTimeChange,
    handleDateChange,
    handlePestTextChange,
    handleFlyingPestMonitorChange,
  } = useAcceptanceForm(acceptanceFormData(order));

  const pestRows: Cell[][] = useMemo(
    () =>
      formData.pests.map((pest, index) => [
        { node: pest.name, justify_content: "start" },
        {
          node: (
            <CheckBox
              key={index}
              checked={pest.monitor}
              onChange={() =>
                handlePestEventChange(pest.name, "monitor", !pest.monitor)
              }
            />
          ),
          justify_content: "center",
        },
        {
          node: (
            <CheckBox
              key={index}
              checked={pest.spray}
              onChange={() =>
                handlePestEventChange(pest.name, "spray", !pest.spray)
              }
            />
          ),
          justify_content: "center",
        },
        {
          node: (
            <CheckBox
              key={index}
              checked={pest.gel}
              onChange={() =>
                handlePestEventChange(pest.name, "gel", !pest.gel)
              }
            />
          ),
          justify_content: "center",
        },
      ]),
    [formData.pests, handlePestEventChange],
  );

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
        <div className="max-w-[800px] w-full mx-auto">
          <h3 className="font-georgian font-bold text-center mt-5">
            ტერიტორიაზე ჩატარებული სამუშაოები და სამიზნე მავნებლები:
          </h3>
          <Table
            id="pests"
            title={{
              title: "გატარებული ღონისძიება",
              justify_content: "center",
            }}
            headers={[
              { node: "მავნებელი", justify_content: "center" },
              { node: "მონიტორი", justify_content: "center" },
              { node: "სპრეი", justify_content: "center" },
              { node: "გელი", justify_content: "center" },
            ]}
            rows={pestRows}
          />
          {/* <Table */}
          {/*   title={{ title: "გამოყენებული საშუალებები", position: "center" }} */}
          {/*   headers={["დასახელება", "დოზირება", "გახარჯული"]} */}
          {/*   rows={materialRows} */}
          {/*   onInputTextChange={handleMaterialEventChange} */}
          {/* /> */}
          {/* <Table */}
          {/*   title={{ title: "მიწოდებული ინვენტარი", position: "center" }} */}
          {/*   headers={["დასახელება", "ფასი", "რაოდენობა"]} */}
          {/*   rows={inventoryRows} */}
          {/*   onInventoryTextChange={handleSoldInventoryChange} */}
          {/* /> */}

          <DoneAreas spaces={formData.spaces} onChange={handleSpaceChange} />
          {/* <InspectionDocument */}
          {/*   inspection_doc={order.inspection_doc} */}
          {/*   handleFlyingPestMonitorChange={handleFlyingPestMonitorChange} */}
          {/* /> */}
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
