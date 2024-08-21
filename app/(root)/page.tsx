"use client"

import { useState } from 'react'
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
import ProductSearch from '@/components/ProductSearch'

type Id<T> = string; // Replace with your actual Id type definition

// Define the CurrentProduct type
interface CurrentProduct {
  _id: Id<"currentproducts">;
  _creationTime: number;
  product: string;
  user: Id<"users">;
  author: string;
  authorId: string;
  category: string;
}

// Define a type for the category-to-color mapping
interface CategoryColorMapping {
  [category: string]: string;
}

const borderColors: string[] = [
  'border-red-500',
  'border-green-400',
  'border-blue-600',
  'border-yellow-300',
  'border-purple-700',
  'border-pink-200',
  'border-orange-900',
  'border-teal-500',
  'border-indigo-400',
  'border-gray-600',
  'border-neutral-800',
  'border-stone-300',
  'border-amber-700',
  'border-lime-400',
  'border-emerald-500',
  'border-cyan-600',
  'border-sky-400',
  'border-violet-700',
  'border-fuchsia-300',
  'border-rose-600',
];

const formSchema = z.object({
  product: z.string().min(2, {
    message: "Product must be at least 2 characters.",
  }),
})

const Home = () => {

  const [inputValue, setInputValue] = useState<string>("");
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
  const onSubmit = (product: z.infer<typeof formSchema>) => {

    createProduct({
      product: product.product,
    })
      .then(() => {
        toast({ title: product.product + ' created' });
        form.reset(); // Reset the form fields
        setInputValue('')
      })
      .catch((error) => {
        console.error('Error creating product:', error);
      });
  }

  // Function to assign colors to categories
  const assignColorsToCategories = (products: CurrentProduct[]): CategoryColorMapping => {
    const categories: CategoryColorMapping = {};
    let colorIndex = 0;

    // Sort the products by category first
    products.sort((a, b) => a.category.localeCompare(b.category));

    products.forEach((product) => {
      const { category } = product;

      // If this category has not been assigned a color, assign the next available color
      if (!categories[category]) {
        categories[category] = borderColors[colorIndex];
        colorIndex = (colorIndex + 1) % borderColors.length; // Wrap around if more categories than colors
      }
    });

    return categories;
  };

  // Use a default empty array if `currentProducts` is undefined
  const productsToDisplay: CurrentProduct[] = currentProducts ?? [];

  const categoriesWithColors = assignColorsToCategories(productsToDisplay);

  return (
    <div className="flex flex-col w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex items-center">
          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Product</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Product" 
                    className="w-full sm:w-96" 
                    {...field} 
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value); // Update local state
                      field.onChange(e); // Update form state
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="ml-2">Add</Button>
        </form>
      </Form>

      <ProductSearch inputValue={inputValue} />

      <div className="mt-3">
      {
        currentProducts?.map(({ _id, product, category }) => (
          <ProductListItem
            key={_id}
            id={_id}
            product={product}
            borderColor={categoriesWithColors[category]}
          />
        ))
      }
      </div> 
    </div>
  )
}

export default Home