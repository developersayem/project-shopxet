"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface INav {
  name: string;
  link: string;
}

interface BottomNavbarProps {
  navItems: INav[];
  backgroundColor?: string;
  textColor?: string;
  hoverColor?: string;
  activeColor?: string;
  activeTextColor?: string;
  categoriesHeaderColor?: string;
  categoriesTextColor?: string;
}

export function BottomNavbar({
  navItems,
  backgroundColor = "#3cbc65",
  textColor = "#ffffff",
  hoverColor = "#2f8c4d",
  activeColor = "#2563eb",
  activeTextColor = "#ffffff",
  categoriesHeaderColor,
  categoriesTextColor,
}: BottomNavbarProps) {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor }}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-12">
          {/* Navigation Menu */}
          <div className="flex items-center">
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                className="h-12 px-4 rounded-none flex items-center justify-between w-64 font-medium"
                style={{
                  background: categoriesHeaderColor,
                  color: categoriesTextColor,
                }}
              >
                <div className="flex items-center space-x-2 font-bold">
                  <span>Categories</span>
                  <span className="text-sm opacity-90">(See All)</span>
                </div>
                <ChevronDown className="h-4 w-4 transition-transform" />
              </button>
            </div>

            {/* Nav Links */}
            {navItems.map((item, index) => {
              const isActive = pathname === item.link;
              const isHovered = hoveredIndex === index;

              return (
                <Link
                  key={index}
                  href={item.link}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="h-12 capitalize rounded-none m-0 px-4 py-3 transition-all font-bold flex items-center"
                  style={{
                    backgroundColor: isActive
                      ? activeColor
                      : isHovered
                      ? hoverColor
                      : "transparent",
                    color: isActive ? activeTextColor : textColor,
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
