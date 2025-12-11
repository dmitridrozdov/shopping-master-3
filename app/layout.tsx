import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "./providers/ConvexClerkProvider";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SM-3",
  description: "Shopping List App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ConvexClerkProvider>
          {children}
        </ConvexClerkProvider>
      </body>
    </html>
  );
}
