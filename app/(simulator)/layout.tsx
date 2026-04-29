import type { Metadata } from "next";
import { rationalDisplay, satoshi } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Slice Simulator",
  robots: { index: false, follow: false },
};

export default function SimulatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${rationalDisplay.variable} ${satoshi.variable}`}
    >
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}
