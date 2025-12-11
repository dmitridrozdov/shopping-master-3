"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ProductListItem from "@/components/ProductListItem"
import ProductSearch from '@/components/ProductSearch'

type Id<T> = string;

interface CurrentProduct {
  _id: Id<"currentproducts">;
  _creationTime: number;
  product: string;
  user: Id<"users">;
  author: string;
  authorId: string;
  category: string;
}

interface CategoryColorMapping {
  [category: string]: string;
}

const borderColors: string[] = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-rose-500',
  'bg-red-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-yellow-500',
  'bg-lime-500',
  'bg-green-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-sky-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-fuchsia-500',
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "",
    },
  })
  
  const onSubmit = (product: z.infer<typeof formSchema>) => {
    createProduct({
      product: product.product,
    })
      .then(() => {
        form.reset();
        setInputValue('')
      })
      .catch((error) => {
        console.error('Error creating product:', error);
      });
  }

  const assignColorsToCategories = (products: CurrentProduct[]): CategoryColorMapping => {
    const categories: CategoryColorMapping = {};
    let colorIndex = 0;

    products.sort((a, b) => a.category.localeCompare(b.category));

    products.forEach((product) => {
      const { category } = product;

      if (!categories[category]) {
        categories[category] = borderColors[colorIndex];
        colorIndex = (colorIndex + 1) % borderColors.length;
      }
    });

    return categories;
  };

  const productsToDisplay: CurrentProduct[] = currentProducts ?? [];
  const categoriesWithColors = assignColorsToCategories(productsToDisplay);

  const clearInput = () => {
    setInputValue('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)(e);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-1 py-8 sm:px-6 lg:px-8">

        {/* Form Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6 transition-all duration-300 hover:shadow-2xl">
          <Form {...form}>
            <div onSubmit={handleSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-end gap-3">
                      <div className="flex-grow">
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="Enter product name..." 
                              className="w-full h-12 px-4 text-base bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all duration-200 placeholder:text-gray-400" 
                              {...field} 
                              value={inputValue}
                              onChange={(e) => {
                                e.preventDefault()
                                setInputValue(e.target.value);
                                field.onChange(e);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleSubmit(e as any);
                                }
                              }}
                            />
                            {inputValue && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage className="mt-2 text-sm" />
                      </div>
                      <Button 
                        type="button"
                        onClick={handleSubmit}
                        className="h-12 px-8 bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                      >
                        Add
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </Form>

          <div className="mt-4">
            <ProductSearch inputValue={inputValue} clearInput={clearInput}/>
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-1">
          {productsToDisplay.length === 0 ? (
            <div className="text-center py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No products yet</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Start by adding your first product above</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Your Products ({productsToDisplay.length})
                </h2>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Click any item to remove
                </div>
              </div>
              {currentProducts?.map(({ _id, product, category }) => (
                <ProductListItem
                  key={_id}
                  id={_id}
                  product={product}
                  borderColor={categoriesWithColors[category]}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home