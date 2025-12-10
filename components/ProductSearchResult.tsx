import React, { useState } from 'react'
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

interface ProductSearchResultProps {
  productName: string
  clearInput: () => void
}

const ProductSearchResult: React.FC<ProductSearchResultProps> = ({ productName, clearInput }) => {
  const createProduct = useMutation(api.list.createProduct)
  const [isAdding, setIsAdding] = useState(false)

  const handleClick = () => {
    setIsAdding(true)
    createProduct({
        product: productName,
      })
        .then(() => {
          clearInput()
        })
        .catch((error) => {
          console.error('Error creating product:', error)
          setIsAdding(false)
        })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isAdding}
      className={`
        group relative overflow-hidden
        px-4 py-2.5 rounded-lg
        bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-850
        border border-gray-200 dark:border-gray-700
        shadow-sm hover:shadow-md
        transition-all duration-300
        ${isAdding ? 'scale-95 opacity-50' : 'hover:scale-105 hover:border-blue-300 dark:hover:border-blue-600'}
        disabled:cursor-not-allowed
      `}
    >
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative flex items-center gap-2">
        {isAdding ? (
          <>
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Adding...
            </span>
          </>
        ) : (
          <>
            <svg 
              className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {productName}
            </span>
          </>
        )}
      </div>

      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </button>
  )
}

export default ProductSearchResult