// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header"; // Header has 'use client' for dynamic behavior
import Footer from "@/components/Footer";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Weather App",
  description: "Check how's the weather today!",
  icons: {
    icon: "/reshot-icon-earth-WQBRAFX4SH.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />  {/* Header is client-side */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

