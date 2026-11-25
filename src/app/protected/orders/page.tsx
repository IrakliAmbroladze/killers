import OrdersPage from "@/modules/orders";

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  return <OrdersPage searchParams={params} />;
}
