import React from 'react'
import { cn } from '@/lib/utils'

const LeftSidebar = () => {
  return (
    <section className={cn("left_sidebar h-[calc(100vh-5px)]")}>
        <nav>
            Left side bar
        </nav>
    </section>
  )
}

export default LeftSidebar