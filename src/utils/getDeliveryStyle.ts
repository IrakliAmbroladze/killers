export const getDeliveryStyle = (delivery_date: string | undefined) => ({
  background: delivery_date ? "green" : "#03fcf4",
  color: "black",
});
