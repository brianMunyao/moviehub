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
  description: "MovieHub provides the latest and trending movies & shows in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${montserratSans.className} dark antialiased`}>
          <div className="z-20 fixed top-0 left-0 w-full">
            <NavBar />
          </div>

          {children}

          <Footer />
        </body>
      </Providers>
    </html>
  );
}
