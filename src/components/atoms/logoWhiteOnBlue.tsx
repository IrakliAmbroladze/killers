import Image from "next/image";
import { memo } from "react";

export const LogoWhiteOnBlue = memo(function LogoWhiteOnBlue({
  width = 100,
  height = 100,
}: {
  width?: number;
  height?: number;
}) {
  console.log("render LogoWhiteOnBlue");
  if (isNaN(width) || isNaN(height)) {
    throw new Error(
      "LogoWhiteOnBlue width and height properties must be numbers",
    );
  }
  return (
    <Image
      src="/logoWhite.png"
      alt="logo"
      className="rounded-md bg-[#222e46] p-2"
      width={width}
      height={height}
    />
  );
});
