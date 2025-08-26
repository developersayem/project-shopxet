import FlashSaleSection from "@/components/home/flash-sale-section";
import { HeroCarousel } from "@/components/home/hero-carousel";
import ProductShowcase from "@/components/home/product-showcase";
import productsDemoData from "../product";

export default function Home() {
  return (
    <main className="min-h-screen max-w-screen container flex justify-center">
      <div className="container w-full space-y-8">
        {/* Hero carousel section */}
        <div className="flex justify-end">
          <HeroCarousel />
        </div>
        <div className="px-4 md:px-0 ">
          {/* Fash sale sections */}
          <FlashSaleSection />
          {/* product show  section */}
          <ProductShowcase
            title="new arrivals"
            products={productsDemoData}
            limit={4}
            collection="new"
          />
          <ProductShowcase
            title="old products"
            products={productsDemoData}
            limit={6}
            collection="new"
          />
          <ProductShowcase
            title="old products"
            products={productsDemoData}
            limit={10}
            collection="new"
          />
          <ProductShowcase
            title="new products"
            products={productsDemoData}
            limit={7}
            collection="new"
          />
        </div>
      </div>
    </main>
  );
}
