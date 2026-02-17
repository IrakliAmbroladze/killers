import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import { geistMono, geistSans, notoSansGeorgian } from "@/fonts";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Killers ERP",
  description: "The ERP system for team members",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansGeorgian.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="fixed z-50 w-full h-10 flex justify-between px-2.5 items-center dark:bg-stone-900 bg-gray-50">
            <Header />
          </header>
          <main className="min-h-screen flex flex-col items-center flex-1 w-full ">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
