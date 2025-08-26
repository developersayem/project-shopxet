/* eslint-disable @next/next/no-img-element */
import { IProduct } from "@/types/product.type";
import { Button } from "../ui/button";

interface ProductCardComProps {
  product: IProduct;
  cardContentAlignment?: "start" | "center" | "end";
  priceColor?: string;
  borderColor?: string;
  borderWidth?: number;
  hoverBorderColor?: string;
  currency?: string;
  currencyIcon?: string;
  buyNowButtonBgColor?: string;
  buyNowButtonHoverBgColor?: string;
  buyNowButtonTextColor?: string;
  buyNowButtonBorderWidth?: number;
  buyNowButtonBorderColor?: string;
  BuyNowButtonHoverBorderColor?: string;
  buyNowButtonBorderRadius?: number;
  addToCartButtonBgColor?: string;
  addToCartButtonTextColor?: string;
  addToCartButtonBorderWidth?: number;
  addToCartButtonBorderColor?: string;
  addToCartButtonBorderRadius?: number;
}

const ProductCardCom = ({
  product,
  cardContentAlignment = "center",
  priceColor = "#16a34a", // default brand-600 green
  borderColor = "#e5e7eb", // default neutral-200
  borderWidth = 2,
  hoverBorderColor = "#22c55e", // brand-500
  currency = "৳",
  currencyIcon,
  buyNowButtonBgColor = "#16a34a",
  buyNowButtonTextColor = "#ffffff",
  buyNowButtonBorderWidth = 1,
  buyNowButtonBorderColor = "#16a34a",
  buyNowButtonBorderRadius = 0,
  addToCartButtonBgColor = "transparent",
  addToCartButtonTextColor = "#16a34a",
  addToCartButtonBorderWidth = 1,
  addToCartButtonBorderColor = "#16a34a",
  addToCartButtonBorderRadius = 0,
}: ProductCardComProps) => {
  return (
    <div
      key={product.id}
      className="p-4 grid grid-rows-3 group cursor-pointer transition-all ease-out duration-300"
      style={{
        borderWidth: borderWidth,
        borderColor: borderColor,
      }}
    >
      {/* Product Image */}
      <div className="relative mb-3 row-span-2 flex justify-center items-center">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name || "Product Image"}
          className="object-contain group-hover:scale-105 transition-transform duration-300 w-[180px] h-[180px] md:w-[200px] md:h-[200px]"
          style={{
            transition: "transform 0.3s ease",
          }}
        />
      </div>

      {/* Product Details */}
      <div
        className="mb-2"
        style={{
          textAlign: cardContentAlignment,
        }}
      >
        <h3 className="text-xs text-gray-800 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        <p className="font-semibold text-sm" style={{ color: priceColor }}>
          {currencyIcon || currency}
          {product.price}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2 justify-center items-center mt-5 w-full">
          {/* Add to Cart Button */}
          <Button
            className="capitalize w-full transition-colors ease-in-out duration-300"
            style={{
              backgroundColor: addToCartButtonBgColor,
              color: addToCartButtonTextColor,
              borderWidth: addToCartButtonBorderWidth,
              borderColor: addToCartButtonBorderColor,
              borderRadius: addToCartButtonBorderRadius,
            }}
          >
            Add to cart
          </Button>

          {/* Buy Now Button */}
          <Button
            className="capitalize w-full transition-colors ease-in-out duration-300"
            style={{
              backgroundColor: buyNowButtonBgColor,
              color: buyNowButtonTextColor,
              borderWidth: buyNowButtonBorderWidth,
              borderColor: buyNowButtonBorderColor,
              borderRadius: buyNowButtonBorderRadius,
            }}
          >
            Buy now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardCom;
