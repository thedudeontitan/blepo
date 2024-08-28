import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import PageContainer from "../components/Navbar";
import "./globals.css";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Blepo - L2 Monitor",
  description: "BNB L2 Monitor and Data Aggregator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoCondensed.className} min-h-screen`}>
        <PageContainer>
          <main className="pt-10 lg:px-10 w-full bg-black">{children}</main>
        </PageContainer>
      </body>
    </html>
  );
}
