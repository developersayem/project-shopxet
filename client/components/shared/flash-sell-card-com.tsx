/* eslint-disable @next/next/no-img-element */

import { IProduct } from "@/types/product.type";

interface FlashSellCardComProps {
  product: IProduct;
  cardContentAlignment?: "start" | "center" | "end";
  priceColor?: string;
  borderColor?: string;
  borderWidth?: number;
  hoverBorderColor?: string;
  currency?: string;
  currencyIcon?: string;
}

const FlashSellCardCom = ({ product }: FlashSellCardComProps) => {
  return (
    <div
      key={product.id}
      className="bg-white p-2 md:p-3 grid grid-rows-5 justify-items-center border-2 border-neutral-50 hover:border-2 hover:border-brand-500 transition-all ease-out duration-350"
    >
      <img
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        className="w-full object-cover mb-1 md:mb-2 row-span-4"
      />
      <div className="text-center">
        <p className="text-black font-semibold text-xs text-wrap md:text-xs">
          {product.name}
        </p>
        <p className="text-brand-600 font-semibold text-xs md:text-sm">
          {product.price}৳
        </p>
      </div>
    </div>
  );
};

export default FlashSellCardCom;
