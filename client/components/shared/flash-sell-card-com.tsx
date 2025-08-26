/* eslint-disable @next/next/no-img-element */
import { IProduct } from "@/types/product.type";

interface FlashSellCardComProps {
  product: IProduct;
  cardContentAlignment?: "start" | "center" | "end";
  priceColor?: string;
  borderColor?: string;
  borderHoverColor?: string;
  borderWidth?: number;
  currency?: string; // default: "৳"
}

const FlashSellCardCom = ({
  product,
  cardContentAlignment = "center",
  priceColor = "#16a34a", // fallback brand-600
  borderColor = "#f9fafb", // fallback neutral-50
  borderHoverColor = "#22c55e", // #22c55e fallback brand-500
  borderWidth = 2,
  currency = "৳",
}: FlashSellCardComProps) => {
  return (
    <div
      key={product.id}
      className="bg-white p-2 md:p-3 flex flex-col justify-between hover:scale-102 transition-all ease-out duration-300"
      style={{
        alignItems:
          cardContentAlignment === "start"
            ? "flex-start"
            : cardContentAlignment === "end"
            ? "flex-end"
            : "center",
        borderWidth: borderWidth,
        borderColor: borderColor,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = borderHoverColor;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = borderColor;
      }}
    >
      <img
        src={product.image || "/placeholder.svg"}
        alt={product.name || "Product image"}
        className="w-full h-auto object-cover mb-2 rounded"
      />
      <div
        style={{
          textAlign: cardContentAlignment,
        }}
      >
        <p className="text-black font-semibold text-xs md:text-sm line-clamp-2">
          {product.name}
        </p>
        <p
          className="font-semibold text-xs md:text-sm"
          style={{ color: priceColor }}
        >
          {product.price}
          {currency}
        </p>
      </div>
    </div>
  );
};

export default FlashSellCardCom;
