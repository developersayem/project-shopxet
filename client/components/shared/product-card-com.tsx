/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
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

  buyNowButtonBgColor?: string;
  buyNowButtonBgHoverColor?: string;
  buyNowButtonTextColor?: string;
  buyNowButtonTextHoverColor?: string;
  buyNowButtonBorderColor?: string;
  buyNowButtonBorderHoverColor?: string;

  addToCartButtonBgColor?: string;
  addToCartButtonBgHoverColor?: string;
  addToCartButtonTextColor?: string;
  addToCartButtonTextHoverColor?: string;
  addToCartButtonBorderColor?: string;
  addToCartButtonBorderHoverColor?: string;
}

const ProductCardCom = ({
  product,
  cardContentAlignment = "center",
  priceColor = "#16a34a",
  borderColor = "#f9fafb",
  borderWidth = 2,
  hoverBorderColor = "#22c55e",
  currency = "৳",

  buyNowButtonBgColor = "#16a34a",
  buyNowButtonBgHoverColor = "transparent",
  buyNowButtonTextColor = "#ffffff",
  buyNowButtonTextHoverColor = "#16a34a",
  buyNowButtonBorderColor = "#16a34a",
  buyNowButtonBorderHoverColor = "#16a34a",

  addToCartButtonBgColor = "transparent",
  addToCartButtonBgHoverColor = "#16a34a",
  addToCartButtonTextColor = "#16a34a",
  addToCartButtonTextHoverColor = "#ffffff",
  addToCartButtonBorderColor = "#16a34a",
  addToCartButtonBorderHoverColor = "#16a34a",
}: ProductCardComProps) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isBuyHovered, setIsBuyHovered] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);

  return (
    <div
      key={product.id}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className="p-[10px] grid grid-rows-2 cursor-pointer shadow hover:scale-102 transition-all ease-out duration-300"
      style={{
        borderWidth,
        borderColor: isCardHovered ? hoverBorderColor : borderColor,
        borderStyle: "solid",
        transition: "border-color 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* Product Image */}
      <div className="relative row-span-1 flex justify-center items-center w-full h-fit">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name || "Product Image"}
          className="object-contain w-[200px] h-[150px] md:w-[220px] md:h-[150px] transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="" style={{ textAlign: cardContentAlignment }}>
        <h3 className="text-xs text-gray-800 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        <p className="font-semibold text-sm" style={{ color: priceColor }}>
          {currency}
          {product.price}
        </p>

        {/* Rating & Sold */}
        <div className="flex justify-center items-center gap-2 mt-1">
          <div className="flex">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${
                  i < (product.rating || 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.442a1 1 0 00-.364 1.118l1.287 3.956c.3.922-.755 1.688-1.538 1.118l-3.361-2.442a1 1 0 00-1.175 0l-3.36 2.442c-.783.57-1.838-.196-1.538-1.118l1.287-3.956a1 1 0 00-.364-1.118L2.978 9.382c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.955z" />
              </svg>
            ))}
          </div>

          {product.sold !== undefined && (
            <span className="text-xs text-gray-500">{product.sold} sold</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 justify-center items-center mt-5 w-full">
          {/* Add to Cart Button */}
          <Button
            onMouseEnter={() => setIsCartHovered(true)}
            onMouseLeave={() => setIsCartHovered(false)}
            className="capitalize w-full rounded-none transition-colors duration-300 border border-solid"
            style={{
              backgroundColor: isCartHovered
                ? addToCartButtonBgHoverColor
                : addToCartButtonBgColor,
              color: isCartHovered
                ? addToCartButtonTextHoverColor
                : addToCartButtonTextColor,
              borderColor: isCartHovered
                ? addToCartButtonBorderHoverColor
                : addToCartButtonBorderColor,
            }}
          >
            Add to cart
          </Button>

          {/* Buy Now Button */}
          <Button
            onMouseEnter={() => setIsBuyHovered(true)}
            onMouseLeave={() => setIsBuyHovered(false)}
            className="capitalize w-full rounded-none transition-colors duration-300 border border-solid"
            style={{
              backgroundColor: isBuyHovered
                ? buyNowButtonBgHoverColor
                : buyNowButtonBgColor,
              color: isBuyHovered
                ? buyNowButtonTextHoverColor
                : buyNowButtonTextColor,
              borderColor: isBuyHovered
                ? buyNowButtonBorderHoverColor
                : buyNowButtonBorderColor,
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
