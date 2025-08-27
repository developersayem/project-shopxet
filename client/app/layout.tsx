import { Anek_Bangla } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const font = Anek_Bangla({
  variable: "--font-anek-bangla",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable} antialiased`}>{children}</body>
      {/* GTranslate Script */}
      <Script
        src="https://cdn.gtranslate.net/widgets/latest/gtranslate.js"
        strategy="lazyOnload"
        defer
      />
    </html>
  );
}
