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

  return (
    <div className="mt-3">
         {inputValue !== '' && (
            <p>
                {selectedFilteredProducts?.map((product, index) => (
                    <ProductSearchResult key={index} productName={product.product} clearInput={clearInput}/>
                ))}
            </p>
         )}
    </div>
  )
}

export default ProductSearch