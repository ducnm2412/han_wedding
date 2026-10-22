import type { Metadata } from "next";
import { Cormorant_Garamond, Be_Vietnam_Pro, Dancing_Script } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const body = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
});

const script = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin", "vietnamese"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "HAN wedding – Chụp ảnh cưới đẹp Biên Hòa",
  description:
    "Studio chụp ảnh cưới, cho thuê váy cưới, makeup cô dâu tại Biên Hòa, Đồng Nai. Đặt lịch tư vấn miễn phí: 058 965 3242.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${display.variable} ${body.variable} ${script.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
