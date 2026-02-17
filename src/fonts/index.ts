import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  variable: "--font-noto-georgian",
  display: "swap",
});
