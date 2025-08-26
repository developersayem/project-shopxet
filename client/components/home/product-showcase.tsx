import { MoveRight } from "lucide-react";
import Link from "next/link";
import ProductCardCom from "../shared/product-card-com";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
}

interface ProductShowCaseProps {
  title: string;
  link?: string;
  products: Product[];
  limit?: number;
  collection?: "new" | "old";
  cardGap?: number;
  cardBgColor?: string;
  cardBorderColor?: string;
  cardBorderWidth?: number;
  CardBorderRadius?: number;
  cardContentAlignment?: "left" | "center" | "right";
  priceColor?: string;
  buyButtonBgColor?: string;
  buyButtonTextColor?: string;
  addToCartButtonBgColor?: string;
  addToCartButtonTextColor?: string;
}

export default function ProductShowcase({
  title,
  link,
  products,
  limit = 6,
  collection = "new",
}: // buyButtonBgColor = "bg-brand-600",
ProductShowCaseProps) {
  // Choose products based on collection type
  const displayedProducts =
    collection === "new"
      ? products.slice(0, limit) // newest first
      : products.slice(-limit); // oldest / last items

  return (
    <div className="w-full py-8 space-y-8 bg-white">
      {/* Section info cards */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 capitalize">
          {title}
        </h2>

        <div className="flex gap-4 text-sm text-gray-600">
          <Link href={link || "#"}>
            <button className="hover:text-brand-600 flex items-center gap-1">
              View All <MoveRight className="text-brand-500 hidden md:block" />
            </button>
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 h-full">
          {displayedProducts.map((product) => (
            <ProductCardCom key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
