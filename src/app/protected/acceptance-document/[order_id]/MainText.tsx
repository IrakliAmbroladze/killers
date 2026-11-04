import { memo } from "react";

export const MainText = memo(function MainText({
  customer_name,
  customer_id,
}: {
  customer_name: string;
  customer_id: string;
}) {
  console.log("render MainText");
  return (
    <p className="max-w-[780px]">
      ერთი მხრივ &quot;{customer_name}&quot; (ს/კ {customer_id}; შემდგომში
      &quot;დამკვეთი&quot;) და მეორე მხრივ შპს &quot;ქილ&quot; (ს/კ 405049923;
      შემდგომში &quot;შემსრულებელი&quot;) ვადასტურებთ, რომ შემსრულებელმა
      მიაწოდა, ხოლო დამკვეთმა მიიღო შემდეგი (მარკირებული/აღნიშნული) სახის
      მომსახურება:
    </p>
  );
});
