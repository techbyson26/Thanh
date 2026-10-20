import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Dancing_Script, Playfair_Display } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const dancingScript = Dancing_Script({
  weight: ["400", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-dancing",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10 🌸 - Yêu Thương & Rạng Ngời",
  description: "Trang web thiệp hoa chúc mừng 20/10 ấm áp, lãng mạn với hoa nở diệu kỳ và muôn vàn lời chúc ý nghĩa.",
  keywords: ["20/10", "chúc mừng 20/10", "ngày phụ nữ việt nam", "thiệp 20/10", "lời chúc 20/10"],
  openGraph: {
    title: "Chúc Mừng 20/10 - Gửi Ngàn Yêu Thương 💐",
    description: "Nhấn vào đóa hoa để mở bức thư tình yêu và đón nhận cơn mưa hoa rực rỡ!",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2b0c20",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${dancingScript.variable} ${playfair.variable}`}
    >
      <body className={beVietnam.className}>{children}</body>
    </html>
  );
}
