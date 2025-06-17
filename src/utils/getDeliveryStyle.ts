export const getDeliveryStyle = (
  delivery_date: string | undefined,
  approve: string
) => ({
  background: delivery_date
    ? "green"
    : approve === "TRUE"
    ? "#03fcf4"
    : "white",
  color: "black",
});
