import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { Id } from "@/convex/_generated/dataModel";

interface Product {
  id: Id<"currentproducts">;
  product: string;
}

const ProductListItem = ({ id, product }: Product) => {

  const deleteProduct = useMutation(api.list.deleteProduct)

  const handleClick = () => {
    deleteProduct({ id });
  };

  return (
    <div key={id} className="cursor-pointer product-list-item bg-nav-focus border-l-8 border-rose-600" onClick={handleClick}>
      <span className="list-font ml-2">{product}</span>
    </div>
  );
};

export default ProductListItem;
