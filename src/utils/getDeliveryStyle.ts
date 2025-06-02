export const getDeliveryStyle = (delivery_date: string | undefined) => ({
  background: delivery_date ? "green" : "yellow",
  color: "black",
});
