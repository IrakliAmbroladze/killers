export const Address = ({ address }: { address: string }) => {
  return (
    <>
      <div className="max-w-72">
        <div className="border-b my-2.5">ობიექტის მისამართი:</div>
        <div className="border-b text-wrap">{address}</div>
      </div>
    </>
  );
};
