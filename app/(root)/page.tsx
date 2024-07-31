"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ProductListItem from "@/components/ProductListItem"

const formSchema = z.object({
  product: z.string().min(2, {
    message: "Product must be at least 2 characters.",
  }),
})

const Home = () => {

  const createProduct = useMutation(api.list.createProduct)
  const currentProducts = useQuery(api.list.get)

  const { toast } = useToast()

   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "",
    },
  })
  
  // 2. Define a submit handler.
  function onSubmit(product: z.infer<typeof formSchema>) {
    createProduct({
      product: product.product,
      category: "test",
    })
      .then(() => {
        toast({ title: product.product + ' created' });
        form.reset(); // Reset the form fields
      })
      .catch((error) => {
        console.error('Error creating product:', error);
      });
  }

  return (
    <div className="mt-2 ml-2 flex flex-col w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex items-center">
          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product</FormLabel>
                <FormControl>
                  <Input placeholder="Product" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="ml-2">Add</Button>
        </form>
      </Form>
      <div>
        {currentProducts?.map(({ _id, product }) => (
          <ProductListItem id={_id} product={product} />
        ))}
      </div> 
    </div>
  )
}

export default Home