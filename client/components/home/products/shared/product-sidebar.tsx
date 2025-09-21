"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const categories = [
  "Women Clothing & Fashion",
  "Men Clothing & Fashion",
  "Computer & Accessories",
  "Automobile & Motorcycle",
  "Kids & toy",
  "Sports & outdoor",
  "Jewelry & Watches",
  "Cellphones & Tabs",
  "Beauty, Health & Hair",
  "Home Improvement & Tools",
  "Home decoration & Appliance",
  "Toy",
  "Software",
];

const mapCategoryToProductValue = (displayCategory: string): string => {
  const categoryMap: { [key: string]: string } = {
    "Women Clothing & Fashion": "women-clothing",
    "Men Clothing & Fashion": "men-clothing",
    "Computer & Accessories": "computer-accessories",
    "Automobile & Motorcycle": "automobile-motorcycle",
    "Kids & toy": "kids-toy",
    "Sports & outdoor": "sports-outdoor",
    "Jewelry & Watches": "jewelry-watches",
    "Cellphones & Tabs": "cellphones-tabs",
    "Beauty, Health & Hair": "beauty-health-hair",
    "Home Improvement & Tools": "home-improvement-tools",
    "Home decoration & Appliance": "home-decoration-appliance",
    Toy: "toy",
    Software: "software",
  };
  return (
    categoryMap[displayCategory] ||
    displayCategory.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")
  );
};

interface ProductSidebarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  availabilityFilters: string[];
  onAvailabilityChange: (filters: string[]) => void;
}

export function ProductSidebar({
  selectedCategory,
  onCategoryChange,
  availabilityFilters = [],
  onAvailabilityChange,
}: ProductSidebarProps) {
  const handleAvailabilityChange = (filter: string, checked: boolean) => {
    if (checked) {
      onAvailabilityChange([...availabilityFilters, filter]);
    } else {
      onAvailabilityChange(availabilityFilters.filter((f) => f !== filter));
    }
  };

  const handleCategoryClick = (displayCategory: string) => {
    const mappedCategory = mapCategoryToProductValue(displayCategory);
    onCategoryChange(mappedCategory);
  };

  return (
    <div className="space-y-4">
      {/* Categories */}
      <Card className="border-gray-100 shadow-none rounded-none">
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle className="flex items-center justify-between text-base">
                Categories
                <ChevronDown className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <button
                  onClick={() => onCategoryChange(null)}
                  className={`block w-full text-left text-sm transition-colors py-1 ${
                    selectedCategory === null
                      ? "text-brand-500 font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`block w-full text-left text-sm transition-colors py-1 ${
                      selectedCategory === mapCategoryToProductValue(category)
                        ? "text-brand-500 font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Filter by Availability */}
      <Card className="border-gray-100 shadow-none rounded-none">
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle className="flex items-center justify-between text-base">
                Filter by Availability
                <ChevronDown className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    checked={availabilityFilters.includes("in-stock")}
                    onChange={(e) =>
                      handleAvailabilityChange("in-stock", e.target.checked)
                    }
                  />
                  <span className="text-sm text-muted-foreground">
                    In Stock
                  </span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    checked={availabilityFilters.includes("out-of-stock")}
                    onChange={(e) =>
                      handleAvailabilityChange("out-of-stock", e.target.checked)
                    }
                  />
                  <span className="text-sm text-muted-foreground">
                    Out of Stock
                  </span>
                </label>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
}
