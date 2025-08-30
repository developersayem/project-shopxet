import type { Metadata } from "next";
import { Anek_Bangla } from "next/font/google";

const font = Anek_Bangla({
  variable: "--font-anek-bangla",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ShopXet-AUTH",
  description: "A multi vendor e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable} antialiased`}>
        {/* Children */}
        {children}
      </body>
    </html>
  );
}
