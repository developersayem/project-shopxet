"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface INav {
  name: string;
  link: string;
}

const navItems: INav[] = [
  {
    name: "home",
    link: "/",
  },
  {
    name: "products",
    link: "/products",
  },
  {
    name: "flash sale",
    link: "/flash-sale",
  },
  {
    name: "brands",
    link: "/brands",
  },
  {
    name: "all categories",
    link: "/all-categories",
  },
  {
    name: "contact us",
    link: "/contact-us",
  },
  {
    name: "about",
    link: "/about",
  },
];

export function BottomNavbar() {
  return (
    <div className="bg-[#3cbc65]">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-12">
          {/* Navigation Menu */}
          <div className="flex items-center">
            {/* Categories Dropdown */}
            <div className="relative">
              <button className="bg-[#329f55] hover:bg-brand-700 text-white h-12 px-4 rounded-none flex items-center justify-between w-64 font-medium">
                <div className="flex items-center space-x-2 font-bold">
                  <span>Categories</span>
                  <span className="text-sm opacity-90">(See All)</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform`} />
              </button>
            </div>

            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="bg-transparent text-white hover:bg-brand-700 h-12 capitalize rounded-none m-0 px-4 py-3 transition-all font-bold"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
