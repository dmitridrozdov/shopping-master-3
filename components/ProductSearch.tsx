import React from 'react'
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import ProductSearchResult from './ProductSearchResult';

interface ProductSearchProps {
  inputValue: string;
  clearInput: () => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ inputValue, clearInput }) => {
  const selectedProducts = useQuery(api.products.getProductsBySearch, { search: inputValue })
  const selectedFilteredProducts = 
    selectedProducts?.filter(item => item.product.startsWith(inputValue.toLowerCase()));

  // Don't render anything if input is empty
  if (!inputValue || inputValue.trim() === '') {
    return null;
  }

  // Show loading state
  if (selectedProducts === undefined) {
    return (
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        <span>Searching...</span>
      </div>
    );
  }

  // No results found
  if (!selectedFilteredProducts || selectedFilteredProducts.length === 0) {
    return (
      <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No suggestions found for &quot;<span className="font-medium text-gray-700 dark:text-gray-300">{inputValue}</span>&quot;
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center gap-2">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
          Quick add suggestions
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {selectedFilteredProducts.map((product, index) => (
          <ProductSearchResult 
            key={product.product + index} 
            productName={product.product} 
            clearInput={clearInput}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductSearch