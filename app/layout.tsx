import type { Metadata } from "next";
import { Montserrat, Kanit } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "./providers/ConvexClerkProvider";

// const font = Montserrat({ subsets: ["latin"] });
const font = Kanit ({ weight: '300', subsets: ['latin'] });

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
