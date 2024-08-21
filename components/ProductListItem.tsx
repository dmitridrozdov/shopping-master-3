import { useState } from "react";
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { Id } from "@/convex/_generated/dataModel"
import { useToast } from "@/components/ui/use-toast"

interface Product {
  id: Id<"currentproducts">;
  product: string;
  borderColor: string;
}

const ProductListItem = ({ id, product, borderColor }: Product) => {

  const deleteProduct = useMutation(api.list.deleteProduct)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const handleClick = () => {
    setIsDeleting(true);
    deleteProduct({ id })
      .then(() => {
        toast({ title: product + ' removed' });
      })
      .catch((error) => {
        // Handle deletion errors (e.g., show an error message)
        setIsDeleting(false);
      })
  }

  return (
    <div
      key={id}
      className={`cursor-pointer product-list-item bg-nav-focus border-l-8 ${borderColor} ${isDeleting ? "fade-out" : ""}`}
      onClick={handleClick}
    >
      <span className="list-font ml-2">{product}</span>
    </div>
  );
};

export default ProductListItem;
