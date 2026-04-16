import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { NavigationWrapper } from "@/components/NavigationWrapper";
import "./globals.css";


const rationalDisplay = localFont({
  src: "../public/fonts/RationalDisplay/RationalDisplay-SemiBold.woff2",
  variable: "--font-rational",
});

const satoshi = localFont({
  src: "../public/fonts/Satoshi/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "500",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "AI Ecom",
  description: "AI-powered e-commerce site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`h-full antialiased ${rationalDisplay.variable} ${satoshi.variable}`}
    >
      <body className="min-h-full flex flex-col font-body">
        <NavigationWrapper />
        {children}
      </body>
    </html>
  );
}