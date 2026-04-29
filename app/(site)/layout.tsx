import type { Metadata } from "next";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { NavigationWrapper } from "@/components/NavigationWrapper";
import { rationalDisplay, satoshi } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "AI Ecom",
  description: "AI-powered e-commerce site",
};

export default function SiteLayout({
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
