import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const LeftSidebar = () => {
  return (
    <section className={cn("left_sidebar h-[calc(100vh-5px)]")}>
        <nav className="flex flex-col gap-6">
            <Link href='/'>List</Link>
            <Link href='/add'>Add Product</Link>
        </nav>
    </section>
  )
}

export default LeftSidebar