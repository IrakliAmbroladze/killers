import { ProceduresSection } from "@/modules/procedures/server";

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default function ProceduresPage({ searchParams }: Props) {
  return <ProceduresSection searchParams={searchParams} />;
}
