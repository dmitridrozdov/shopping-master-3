import React from 'react'
import { Button } from "@/components/ui/button"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useToast } from "@/components/ui/use-toast"

interface ProductSearchResultProps {
  productName: string;
}

const ProductSearchResult: React.FC<ProductSearchResultProps> = ({ productName }) => {
  const createProduct = useMutation(api.list.createProduct)
  const { toast } = useToast()

  const handleClick = () => {
    createProduct({
        product: productName,
      })
        .then(() => {
          toast({ title: productName + ' created' });
        })
        .catch((error) => {
          console.error('Error creating product:', error);
        });
  }

  return (
     <Button type="submit" className="ml-2 mt-1" variant='default' onClick={handleClick}>
        {productName}
     </Button>
  )
}

export default ProductSearchResult