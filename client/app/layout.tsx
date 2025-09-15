import type { Metadata } from "next";
import { Anek_Bangla } from "next/font/google";
import "./globals.css";
import { SWRConfigProviders } from "@/lib/swr-config-providers";
import { AuthProvider } from "@/contexts/auth-context";

const font = Anek_Bangla({
  variable: "--font-anek-bangla",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SHOPXET",
  description: "A multi vendor e-commerce platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.variable} antialiased`}>
        <SWRConfigProviders>
          <AuthProvider>{children}</AuthProvider>
        </SWRConfigProviders>
      </body>
    </html>
  );
}
