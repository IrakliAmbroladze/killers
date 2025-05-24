export interface ModalContextType {
  openOrderId: string | null;
  openOrder: (orderId: string) => void;
  closeOrder: () => void;
}
