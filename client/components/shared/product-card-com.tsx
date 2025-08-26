/* eslint-disable @next/next/no-img-element */

import { IProduct } from "@/types/product.type";
import { Button } from "../ui/button";

interface ProductCardComProps {
  product: IProduct;
}
const ProductCardCom = ({ product }: ProductCardComProps) => {
  return (
    <div
      key={product.id}
      className="p-4 grid grid-rows-3 border-2 hover:border-brand-500 group cursor-pointer transition-all ease-out duration-350"
    >
      {/* Product Image */}
      <div className="relative mb-3 row-span-2">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="object-contain group-hover:scale-105 transition-transform w-[200px] h-[200px"
        />
      </div>
      {/* Product Details */}
      <div>
        <h3 className="text-xs text-gray-800 text-center mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-brand-600 font-semibold text-center text-sm">
          {product.price}৳
        </p>
        <div className="flex flex-col gap-2 justify-center items-center mt-5 w-full">
          <Button className="capitalize w-full rounded-none bg-transparent border border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white transition-colors ease-in-out duration-500 ">
            add to cart
          </Button>
          <Button className="capitalize w-full rounded-none bg-brand-500 hover:bg-transparent border border-brand-500 text-white hover:text-brand-500 transition-colors ease-in-out duration-500 ">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardCom;
