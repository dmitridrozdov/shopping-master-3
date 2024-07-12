"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";


const Home = () => {
  // const tasks = useQuery(api.tasks.get);
  return (
    <div className="mt-3 ml-3 flex flex-col">
      <section>Add products</section>
      <section className="flex items-center mt-2">
        <Input />
        <Button className="ml-3">Add</Button>
      </section>
      <div>
        {/* {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)} */}
      </div>
    </div>
  )
}

export default Home