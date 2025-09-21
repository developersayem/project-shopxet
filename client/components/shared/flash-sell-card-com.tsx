/* eslint-disable @next/next/no-img-element */
import { IProduct } from "@/types/product.type";

interface FlashSellCardComProps {
  product: IProduct;
  cardContentAlignment?: "start" | "center" | "end";
  priceColor?: string;
  borderColor?: string;
  borderHoverColor?: string;
  borderWidth?: number;
  currency?: string;
}

const FlashSellCardCom = ({
  product,
  cardContentAlignment = "center",
  priceColor = "#16a34a",
  borderColor = "#f9fafb",
  borderHoverColor = "#22c55e",
  borderWidth = 2,
  currency = "৳",
}: FlashSellCardComProps) => {
  return (
    <div
      key={product._id}
      className="bg-white p-1 md:p- flex flex-col justify-between hover:scale-102 transition-all ease-out duration-300"
      style={{
        alignItems:
          cardContentAlignment === "start"
            ? "flex-start"
            : cardContentAlignment === "end"
            ? "flex-end"
            : "center",
        borderWidth,
        borderColor,
        borderStyle: "solid",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = borderHoverColor;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = borderColor;
      }}
    >
      <img
        src={product.thumbnail || "/placeholder.svg"}
        alt={product.name || "Product image"}
        className="w-full h-[150px] md:h-[160px] object-cover rounded"
      />
      <div
        className="flex flex-col justify-between w-full"
        style={{ textAlign: cardContentAlignment }}
      >
        {/* Single line product name with ellipsis */}
        <p className="text-black font-semibold text-xs md:text-sm truncate w-full">
          {product.name}
        </p>

        <p
          className="font-semibold text-xs md:text-sm"
          style={{ color: priceColor }}
        >
          {currency}
          {product.salePrice}
        </p>

        {product.sold !== undefined && (
          <span className="text-xs text-gray-500">{product.sold} sold</span>
        )}
      </div>
    </div>
  );
};

export default FlashSellCardCom;
