import { useState } from "react";
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { Id } from "@/convex/_generated/dataModel"

interface Product {
  id: Id<"currentproducts">;
  product: string;
  borderColor: string;
}

const ProductListItem = ({ id, product, borderColor }: Product) => {
  const deleteProduct = useMutation(api.list.deleteProduct)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleClick = () => {
    setIsDeleting(true);
    deleteProduct({ id })
      .catch((error) => {
        setIsDeleting(false);
      })
  }

  return (
    <div
      className={`group relative overflow-hidden cursor-pointer rounded-xl bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 shadow-sm hover:shadow-md transition-all duration-300 ${
        isDeleting ? 'animate-delete' : 'hover:scale-[1.02]'
      }`}
      onClick={handleClick}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${borderColor} transition-all duration-300 group-hover:w-1.5`} />
      
      <div className="px-5 py-4 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-800 dark:text-gray-100 transition-colors duration-200">
          {product}
        </span>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Click to remove
          </span>
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
        </div>
      </div>

      {isDeleting && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Removing...</span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes delete {
          0% {
            opacity: 1;
            transform: scale(1) translateX(0);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.95) translateX(-10px);
          }
          100% {
            opacity: 0;
            transform: scale(0.8) translateX(-100%);
            height: 0;
            margin: 0;
            padding: 0;
          }
        }
        
        .animate-delete {
          animation: delete 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProductListItem;