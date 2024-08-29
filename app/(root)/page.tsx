"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
// import { useToast } from "@/components/ui/use-toast"

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
  'border-slate-500',
  'border-slate-400',
  'border-slate-300',
  'border-slate-200',
  'border-slate-100',
  'border-gray-500',
  'border-gray-400',
  'border-gray-300',
  'border-gray-200',
  'border-gray-100',
  'border-neutral-500',
  'border-neutral-400',
  'border-neutral-300',
  'border-neutral-200',
  'border-neutral-100',
  'border-zinc-500',
  'border-zinc-400',
  'border-zinc-300',
  'border-zinc-200',
  'border-zinc-100',
  'border-stone-500',
  'border-stone-400',
  'border-stone-300',
  'border-stone-200',
  'border-stone-100',
  'border-warm-gray-500',
  'border-warm-gray-400',
  'border-warm-gray-300',
  'border-warm-gray-200',
  'border-warm-gray-100',
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

  // const { toast } = useToast()

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
        // toast({ title: product.product + ' created' });
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

  const clearInput = () => {
    setInputValue('');
  };

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
                    className="w-full sm:w-96 input-font" 
                    {...field} 
                    value={inputValue}
                    onChange={(e) => {
                      e.preventDefault()
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

      <ProductSearch inputValue={inputValue} clearInput={clearInput}/>

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