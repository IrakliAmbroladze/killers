import localFont from "next/font/local";

export const notoSansGeorgian = localFont({
  src: [
    {
      path: "../assets/fonts/NotoSansGeorgian-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/NotoSansGeorgian-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});
