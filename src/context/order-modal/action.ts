const openOrder = (orderId: string) => ({
  type: "OPEN_ORDER" as const,
  payload: orderId,
});

const closeOrder = () => ({
  type: "CLOSE_ORDER" as const,
  payload: null,
});

export { openOrder, closeOrder };
