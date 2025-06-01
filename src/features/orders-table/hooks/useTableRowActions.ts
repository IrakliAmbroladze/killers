// hooks/useTableRowActions.ts

import { useOrderModal } from "@/hooks/useOrderModal";

export const useTableRowActions = ({
  modalIndex,
  onOpenModal,
  onSetStatus,
  onSetTitle,
}: {
  modalIndex: string | null;
  onOpenModal: (id: string | null) => void;
  onSetStatus: (status: "add" | "update") => void;
  onSetTitle: (title: string) => void;
}) => {
  const { openOrder } = useOrderModal();

  const handleView = (orderId: string) => {
    openOrder(orderId);
  };

  const handleEdit = (orderId: string) => {
    onOpenModal(modalIndex === orderId ? null : orderId);
    onSetStatus("update");
    onSetTitle("Edit Order");
  };

  const handleCopy = (orderId: string) => {
    onOpenModal(modalIndex === orderId ? null : orderId);
    onSetStatus("add");
    onSetTitle("Copy Order");
  };

  return {
    handleView,
    handleEdit,
    handleCopy,
  };
};
