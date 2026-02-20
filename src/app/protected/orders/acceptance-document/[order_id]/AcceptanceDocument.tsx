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
    handleSpaceChange,
    handleProcedureTimeChange,
    handleDateChange,
    handlePestTextChange,
    handleFlyingPestMonitorChange,
    handleCrawlingPestMonitorChange,
    handleRodentMonitorChange,
  } = useAcceptanceForm(acceptanceFormData(order));

  const pestRows: Cell[][] = useMemo(
    () =>
      formData.pests.map((pest, index) => [
        {
          node:
            index < 11 ? (
              pest.name
            ) : (
              <input
                type="text"
                value={pest.name}
                onChange={(e) => handlePestTextChange(index, e.target.value)}
              />
            ),
          justify_content: "start",
        },
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
    [formData.pests, handlePestEventChange, handlePestTextChange],
  );

  const materialRows: Cell[][] = useMemo(
    () =>
      formData.products.map((material) => [
        { node: material.name, justify_content: "start" },
        { node: material.dosage, justify_content: "center" },
        {
          node: (
            <input
              type="text"
              value={material.used}
              onChange={(e) =>
                handleMaterialEventChange(material.name, e.target.value)
              }
              className="w-full text-center"
            />
          ),
          justify_content: "start",
        },
      ]),
    [formData.products, handleMaterialEventChange],
  );

  const inventoryRows: Cell[][] = useMemo(
    () =>
      formData.inventory.map((item, rowIndex) => [
        {
          node: (
            <input
              type="text"
              value={item.name}
              onChange={(e) =>
                handleSoldInventoryChange(rowIndex, "name", e.target.value)
              }
              className="w-full"
            />
          ),
          justify_content: "start",
        },
        {
          node: (
            <input
              type="text"
              value={item.price}
              onChange={(e) =>
                handleSoldInventoryChange(rowIndex, "price", e.target.value)
              }
              className="w-full text-center"
            />
          ),
          justify_content: "start",
        },
        {
          node: (
            <input
              type="text"
              value={item.quantity}
              onChange={(e) =>
                handleSoldInventoryChange(rowIndex, "quantity", e.target.value)
              }
              className="w-full text-center"
            />
          ),
          justify_content: "start",
        },
      ]),
    [formData.inventory, handleSoldInventoryChange],
  );

  const flyingPestMonitorRows: Cell[][] = useMemo(
    () =>
      formData.flying_pest_monitor.map((item, rowIndex) => [
        {
          node: (
            <input
              type="text"
              value={item.id}
              onChange={(e) =>
                handleFlyingPestMonitorChange(rowIndex, "id", e.target.value)
              }
              className="w-full"
            />
          ),
          justify_content: "center",
        },
        {
          node: (
            <input
              type="text"
              value={item.fly}
              onChange={(e) =>
                handleFlyingPestMonitorChange(rowIndex, "fly", e.target.value)
              }
              className="w-full text-center"
            />
          ),
          justify_content: "center",
        },
        {
          node: (
            <input
              type="text"
              value={item.kinkla}
              onChange={(e) =>
                handleFlyingPestMonitorChange(
                  rowIndex,
                  "kinkla",
                  e.target.value,
                )
              }
              className="w-full text-center"
            />
          ),
          justify_content: "center",
        },
        {
          node: (
            <input
              type="text"
              value={item.blank}
              onChange={(e) =>
                handleFlyingPestMonitorChange(rowIndex, "blank", e.target.value)
              }
              className="w-full text-center"
            />
          ),
          justify_content: "start",
        },
        {
          node: (
            <CheckBox
              key={rowIndex}
              checked={item.plate_was_changed}
              onChange={() =>
                handleFlyingPestMonitorChange(
                  rowIndex,
                  "plate_was_changed",
                  !item.plate_was_changed,
                )
              }
            />
          ),
          justify_content: "center",
        },
      ]),
    [formData.flying_pest_monitor, handleFlyingPestMonitorChange],
  );

  const crawlingPestMonitorRows: Cell[][] = useMemo(
    () =>
      formData.crawling_pest_monitor.map((item, rowIndex) => [
        {
          node: (
            <input
              type="text"
              value={item.id}
              onChange={(e) =>
                handleCrawlingPestMonitorChange(rowIndex, "id", e.target.value)
              }
              className="w-full"
            />
          ),
          justify_content: "center",
        },
        {
          node: (
            <input
              type="text"
              value={item.ant}
              onChange={(e) =>
                handleCrawlingPestMonitorChange(rowIndex, "ant", e.target.value)
              }
              className="w-full text-center"
            />
          ),
          justify_content: "center",
        },
        {
          node: (
            <input
              type="text"
              value={item.cockroach}
              onChange={(e) =>
                handleCrawlingPestMonitorChange(
                  rowIndex,
                  "cockroach",
                  e.target.value,
                )
              }
              className="w-full text-center"
            />
          ),
          justify_content: "center",
        },
        {
          node: (
            <input
              type="text"
              value={item.blank}
              onChange={(e) =>
                handleCrawlingPestMonitorChange(
                  rowIndex,
                  "blank",
                  e.target.value,
                )
              }
              className="w-full text-center"
            />
          ),
          justify_content: "start",
        },
        {
          node: (
            <CheckBox
              key={rowIndex}
              checked={item.plate_was_changed}
              onChange={() =>
                handleCrawlingPestMonitorChange(
                  rowIndex,
                  "plate_was_changed",
                  !item.plate_was_changed,
                )
              }
            />
          ),
          justify_content: "center",
        },
      ]),
    [formData.crawling_pest_monitor, handleCrawlingPestMonitorChange],
  );

  const rodentMonitorRows: Cell[][] = useMemo(
    () =>
      formData.rodent_monitor.map((item, rowIndex) => [
        {
          node: (
            <input
              type="text"
              value={item.id}
              onChange={(e) =>
                handleRodentMonitorChange(rowIndex, "id", e.target.value)
              }
              className="w-full"
            />
          ),
          justify_content: "center",
        },
        {
          node: (
            <input
              type="text"
              value={item.captured}
              onChange={(e) =>
                handleRodentMonitorChange(rowIndex, "captured", e.target.value)
              }
              className="w-full text-center"
            />
          ),
          justify_content: "center",
        },
        {
          node: (
            <CheckBox
              key={rowIndex}
              checked={item.plate_was_changed}
              onChange={() =>
                handleRodentMonitorChange(
                  rowIndex,
                  "plate_was_changed",
                  !item.plate_was_changed,
                )
              }
            />
          ),
          justify_content: "center",
        },
        {
          node: (
            <CheckBox
              key={rowIndex}
              checked={item.chemical_was_added}
              onChange={() =>
                handleRodentMonitorChange(
                  rowIndex,
                  "chemical_was_added",
                  !item.chemical_was_added,
                )
              }
            />
          ),
          justify_content: "center",
        },
      ]),
    [formData.rodent_monitor, handleRodentMonitorChange],
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
          <Table
            id="materials"
            title={{
              title: "გამოყენებული საშუალებები",
              justify_content: "center",
            }}
            headers={[
              { node: "დასახელება", justify_content: "center" },
              { node: "დოზირება", justify_content: "center" },
              { node: "გახარჯული", justify_content: "center" },
            ]}
            rows={materialRows}
          />
          <Table
            id="inventory"
            title={{
              title: "მიწოდებული ინვენტარი",
              justify_content: "center",
            }}
            headers={[
              { node: "დასახელება", justify_content: "center" },
              { node: "ფასი", justify_content: "center" },
              { node: "რაოდენობა", justify_content: "center" },
            ]}
            rows={inventoryRows}
          />

          <DoneAreas spaces={formData.spaces} onChange={handleSpaceChange} />
          <form>
            <fieldset>
              <legend>Area is clean and tidy</legend>
              <div>
                <label>
                  <input
                    type="radio"
                    name="1.1"
                    value="true"
                    onChange={(e) => console.log(e.target.value)}
                  />
                  Yes
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="radio"
                    name="1.1"
                    value="false"
                    onChange={(e) => console.log(e.target.value)}
                  />
                  No
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="radio"
                    id="mail"
                    name="1.1"
                    value="null"
                    onChange={(e) => console.log(e.target.value)}
                  />
                  N/A
                </label>
              </div>
            </fieldset>
          </form>

          <InspectionDocument
            inspection_doc={order.inspection_doc}
            flyingPestMonitorRows={flyingPestMonitorRows}
            crawlingPestMonitorRows={crawlingPestMonitorRows}
            rodentMonitorRows={rodentMonitorRows}
          />
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
