import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/nav/NavBar";

export const metadata: Metadata = {
  title: "Autohub",
  description: "Autohub Application For Auction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <NavBar />
      <main className={"container mx-auto px-5 pt-10"}>
          {children}
      </main>
      </body>
    </html>
  );
}
