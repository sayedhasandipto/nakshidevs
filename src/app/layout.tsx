import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NakshiDevs - সকল অনলাইন সেবা এক জায়গায়",
  description:
    "NakshiDevs - আপনার প্রয়োজনীয় সকল অনলাইন সেবা এখন এক জায়গায়।",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }],
};

import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`scroll-smooth ${inter.variable} ${hindSiliguri.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
          precedence="default"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${hindSiliguri.className} bg-white text-gray-900 antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <Toaster position="top-right" />
          {process.env.NODE_ENV === "production" && <Analytics />}
        </Providers>
      </body>
    </html>
  );
}
