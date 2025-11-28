export const getDeliveryStyle = (
  delivery_date: string | undefined,
  approve: string,
  cancel: boolean | null,
) => ({
  background: cancel
    ? "#B32504"
    : delivery_date
      ? "green"
      : approve === "TRUE"
        ? "#03fcf4"
        : "white",
  color: "black",
});
