import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const Home = () => {
  return (
    <div className="mt-9 ml-9 flex flex-col w-1/2">
      <section>Add products</section>
      <section className="flex items-center mt-2">
        <Input />
        <Button className="ml-3">Add</Button>
      </section>
    </div>
  )
}

export default Home