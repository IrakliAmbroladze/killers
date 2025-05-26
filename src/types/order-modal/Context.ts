export interface Context {
  openOrderId: string | null;
  openOrder: (orderId: string) => void;
  closeOrder: () => void;
}
