import { proceduresPathName } from "@/app/protected/procedures/constants/proceduresPathName";
import { normalizeOrder } from "@/features/order-table/utils/normalize";
import { useOrderModal } from "@/hooks/useOrderModal";
import { editOrder } from "@/lib";
import { OrderExtended } from "@/types";
import { useEffect, useState } from "react";

export const Documents = ({
  order,
  isInModal,
}: {
  order: OrderExtended;
  isInModal: boolean;
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedInspectionDocument, setSelectedInspectionDocument] =
    useState("default");

  const inspection_doc_options = [
    { value: "default", label: "default" },
    { value: "unplanned", label: "unplanned" },
    { value: "follow_up", label: "follow_up" },
  ];
  const { refreshOrder } = useOrderModal();

  useEffect(() => {
    setIsChecked(order.acceptance);
  }, [order.acceptance]);

  useEffect(() => {
    setSelectedInspectionDocument(order.inspection_doc);
  }, [order.inspection_doc]);

  const handleAcceptance = async () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    const updatedOrder = normalizeOrder({
      ...order,
      acceptance: newChecked,
    });

    const result = await editOrder(updatedOrder, proceduresPathName);

    if (result.status === "OK" && isInModal) {
      refreshOrder(order.id);
    }
  };

  const handleInspectionDocumentChange = async (value: string) => {
    const newSelectedInspectionDocument = value;
    setSelectedInspectionDocument(newSelectedInspectionDocument);
    const updatedOrder = normalizeOrder({
      ...order,
      inspection_doc: newSelectedInspectionDocument,
    });

    const result = await editOrder(updatedOrder, proceduresPathName);

    if (result.status === "OK" && isInModal) {
      refreshOrder(order.id);
    }
  };

  if (!order) return <div>Order not found</div>;
  return (
    <div className="text-sm flex gap-5">
      <div>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleAcceptance}
          />
          მიღება-ჩაბარება
        </label>
      </div>
      <div>
        <label htmlFor="inspection-document">ინსპექტ: </label>
        <select
          id="fruit-select"
          value={selectedInspectionDocument}
          onChange={(e) => handleInspectionDocumentChange(e.target.value)}
        >
          {inspection_doc_options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
