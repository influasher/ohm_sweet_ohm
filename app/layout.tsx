import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat, Arvo, Karla } from "next/font/google";
import "./globals.css";
import Metrics from './metrics'

// Local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Google fonts
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const arvo = Arvo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-arvo",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-karla",
});

export const metadata: Metadata = {
  title: "OhmSweetOhm",
  description: "Saving the world, one Ohm at a time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${montserrat.variable} 
          ${arvo.variable} 
          ${karla.variable}
          antialiased
        `}
      >
        {children}
      <Metrics/>
      </body>
    </html>
  );
}
