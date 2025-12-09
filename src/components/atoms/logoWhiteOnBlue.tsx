import Image from "next/image";

export const LogoWhiteOnBlue = ({
  width = 100,
  height = 100,
}: {
  width?: number;
  height?: number;
}) => {
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
};
