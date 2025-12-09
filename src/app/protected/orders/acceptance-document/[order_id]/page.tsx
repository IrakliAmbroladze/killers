export default async function AcceptanceDocument({
  params,
}: {
  params: Promise<{ order_id: string }>;
}) {
  const { order_id } = await params;
  return <div>My order id is: {order_id}</div>;
}
