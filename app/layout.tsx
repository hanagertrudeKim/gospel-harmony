import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR, Lora } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSerif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-noto-serif",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gospel Harmony · 사복음서 대조",
  description: "마태, 마가, 누가, 요한복음을 나란히 읽는 성경 대조 도구",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${notoSans.variable} ${notoSerif.variable} ${lora.variable} h-full`} suppressHydrationWarning>
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
