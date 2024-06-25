import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const Home = () => {
  return (
    <div className="mt-3 ml-3 flex flex-col">
      <section>Add products</section>
      <section className="flex items-center mt-2">
        <Input />
        <Button className="ml-3">Add</Button>
      </section>
    </div>
  )
}

export default Home