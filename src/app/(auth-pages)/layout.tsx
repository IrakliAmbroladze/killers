export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex flex-col flex-1 gap-12 items-center">
      {children}
    </div>
  );
}
