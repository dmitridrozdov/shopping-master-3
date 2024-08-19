import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { Id } from "@/convex/_generated/dataModel";

interface Product {
  id: Id<"currentproducts">;
  product: string;
  borderColor: string;
}

const ProductListItem = ({ id, product, borderColor }: Product) => {

  const deleteProduct = useMutation(api.list.deleteProduct)

  const handleClick = () => {
    deleteProduct({ id });
  };

  return (
    <div key={id} className={`cursor-pointer product-list-item bg-nav-focus border-l-8 ${borderColor}`} onClick={handleClick}>
      <span className="list-font ml-2">{product}</span>
    </div>
  );
};

export default ProductListItem;
