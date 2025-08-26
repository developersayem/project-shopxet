"use client";

import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function MiddleNavbar() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center ml-10">
              <div className="text-xl font-bold">
                <Image
                  src="/logos/logo.png"
                  alt="ShopXet Logo"
                  width={50}
                  height={50}
                />
              </div>
              <h1 className="text-2xl font-bold text-brand-600 ml-2">
                SHOPXET
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="I am shopping for..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
              <Button
                size="sm"
                className="absolute right-0.5 top-0.5 bottom-1 bg-brand-500 hover:bg-brand-600 text-white px-3"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* shopping cart */}
          <div className="flex items-center">
            <div className="text-brand-600 flex items-center hover:text-brand-700 h-12 capitalize space-x-3 m-0 px-4 py-2 transition-all">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-bold">0.00৳ (0 Items)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
