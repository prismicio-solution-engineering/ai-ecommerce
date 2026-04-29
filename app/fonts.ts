import localFont from "next/font/local";

export const rationalDisplay = localFont({
  src: "../public/fonts/RationalDisplay/RationalDisplay-SemiBold.woff2",
  variable: "--font-rational",
});

export const satoshi = localFont({
  src: "../public/fonts/Satoshi/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "500",
  display: "swap",
});
