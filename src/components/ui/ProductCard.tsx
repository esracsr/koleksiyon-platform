import React from "react";
import { Product } from "@/data/mockProducts";

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-64">
      <img src={product.image} alt={product.name} className="w-148px h-229px object-cover rounded-lg" />
      <h3 className="text-[12px] font-semibold mt-2">{product.name}</h3>
      <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
