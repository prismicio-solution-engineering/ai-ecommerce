import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <head>
        <style>{`
          :root {
            --font-heading: ${inter.style.fontFamily};
            --font-body: ${inter.style.fontFamily};
          }
        `}</style>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
