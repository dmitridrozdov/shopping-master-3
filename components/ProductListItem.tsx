import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
// import { v } from "convex/values";
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
    <div key={id} className="cursor-pointer mt-2 ml-2" onClick={handleClick}>
      <span className="text-gray-500">{product}</span>
    </div>
  );
};

export default ProductListItem;
