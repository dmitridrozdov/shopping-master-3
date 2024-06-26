'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarLinks = [
    {
      route: "/",
      label: "List",
    },
    {
      route: "/add",
      label: "Add",
    },
]

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <section className={cn("left_sidebar h-[calc(100vh-5px)]")}>
        <nav className="flex flex-col gap-6">
            {/* <Link href='/' >
                <h1 className="text-24 font-extrabold max-lg:hidden">List</h1>
            </Link>
            <Link href='/add' >
                <h1 className="text-24 font-extrabold max-lg:hidden">Add Product</h1>
            </Link> */}
            {sidebarLinks.map(({ route, label }) => {
                const isActive = pathname === route || pathname.startsWith(`${route}/`);

                return <Link href={route} key={label} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start", {
                    'bg-nav-focus border-r-4': isActive
                })}>
                    <p>{label}</p>
                </Link>
                })}
        </nav>
    </section>
  )
}

export default LeftSidebar