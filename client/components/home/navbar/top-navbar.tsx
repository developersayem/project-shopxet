/* eslint-disable @next/next/no-img-element */
"use client";

import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopNavbarProps {
  logo: string;
  siteName: string;
  siteNameColor: string; // Hex color code or Tailwind variable
  cardTextColor: string; // Hex color for cart section
  currency?: string;
  searchButtonColor?: string;
}

export function TopNavbar({
  logo,
  siteName,
  siteNameColor,
  cardTextColor,
  currency = "৳",
  searchButtonColor,
}: TopNavbarProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center ml-10">
              <div className="text-xl font-bold">
                <img
                  src={logo || "/logos/logo.png"}
                  alt={`${siteName} Logo`}
                  className="w-12 h-12"
                />
              </div>
              <h1
                className="text-2xl font-bold ml-2"
                style={{ color: siteNameColor }}
              >
                {siteName.toUpperCase()}
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="I am shopping for..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md 
                focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
              <Button
                size="sm"
                className="absolute right-0.5 top-0.5 bottom-1 hover:bg-brand-600 text-white px-3"
                style={{ backgroundColor: searchButtonColor }}
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="flex items-center h-12 capitalize space-x-3 m-0 px-4 py-2 transition-all text-sm font-bold rounded-md">
            <ShoppingCart className="w-5 h-5" />
            <span style={{ color: cardTextColor }}>
              0.00{currency} (0 Items)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
