import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const LeftSidebar = () => {
  return (
    <section className={cn("left_sidebar h-[calc(100vh-5px)]")}>
        <nav className="flex flex-col gap-6">
            <Link href='/'><h1 className="text-24 font-extrabold max-lg:hidden">List</h1></Link>
            <Link href='/add'><h1 className="text-24 font-extrabold max-lg:hidden">Add Product</h1></Link>
        </nav>
    </section>
  )
}

export default LeftSidebar