import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "@/components/global/providers";
import Footer from "@/components/global/footer";
import NavBar from "@/components/global/navbar";

const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MovieHub",
  description: "Discover movies and TV shows with personalized recommendations.",
  openGraph: {
    title: "MovieHub",
    description: "Discover movies and TV shows with personalized recommendations.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "MovieHub",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo-with-text.svg`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${montserratSans.className} antialiased`}>{children}</body>
      </Providers>
    </html>
  );
}
