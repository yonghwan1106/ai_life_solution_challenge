import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafeLife - AI 생활 안전 플랫폼",
  description: "AI 기술로 고령자의 일상을 보호하고, 디지털 세상과의 격차를 줄입니다. 음성 바코드 리더, 키오스크 도우미, 보이스피싱 감지, 보호자 대시보드를 제공합니다.",
  keywords: ["AI", "고령자", "생활안전", "바코드", "키오스크", "보이스피싱", "SafeLife"],
  authors: [{ name: "SafeLife Team" }],
  openGraph: {
    title: "SafeLife - AI 생활 안전 플랫폼",
    description: "AI 기술로 고령자의 일상을 보호합니다",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300`}
      >
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
