import LeftSidebar from "@/components/LeftSidebar";
import MobileNav from "@/components/MobileNav";

import Image from "next/image";
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-black-3">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
          <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
            <div className="flex h-16 items-center justify-between md:hidden">
              <Image 
                src="logo.svg"
                width={15}
                height={15}
                alt="menu icon"
              />
              <h1 className="text-24 font-bold bg-gradient-to-r from-purple-300 to-purple-600 bg-clip-text text-transparent mb-2">Shopping List</h1>
              <MobileNav />
            </div>
            <div className="flex flex-col md:pb-14">
              <Toaster />

              {children}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}