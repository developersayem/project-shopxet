import { notFound } from "next/navigation";
import { products } from "../products";
import { ProductImages } from "@/components/home/products/products-details/product-images";
import { ProductInfo } from "@/components/home/products/products-details/product-info";
import { ProductTabs } from "@/components/home/products/products-details/product-tabs";

interface ProductPageProps {
  params: {
    id: string; // slug/id from route
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  // ✅ Match product by string _id
  const product = products.find((p) => p._id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen container mx-auto">
      <div className="mx-auto px-4 py-6">
        {/* Main Product Content */}
        <div className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="flex justify-center">
              <ProductImages product={product} />
            </div>
            <ProductInfo product={product} />
          </div>
        </div>
        <ProductTabs product={product} />
      </div>
    </div>
  );
}
