const openOrderAction = (orderId: string) => ({
  type: "OPEN_ORDER" as const,
  payload: orderId,
});

const closeOrderAction = () => ({ type: "CLOSE_ORDER" as const });

export { openOrderAction, closeOrderAction };
