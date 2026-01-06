import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
import { Navbar } from "@/modules/home/components/navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Career Top - AI Job Search and Resume Builder",
  description: "Career Top - AI Job Search and Resume Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <main className=" min-h-dvh flex flex-col">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
