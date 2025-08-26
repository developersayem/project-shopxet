"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function TopNavbar() {
  return (
    <div className="bg-gray-100 border-b border-gray-200">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-7 text-sm">
          {/* Left side - Language and Currency */}
          <div className="flex items-center space-x-4">
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-gray-600 hover:text-gray-900"
                >
                  English
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Spanish</DropdownMenuItem>
                <DropdownMenuItem>French</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            <div className="gtranslate_wrapper"></div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-gray-600 hover:text-gray-900"
                >
                  U.S. Dollar
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>U.S. Dollar</DropdownMenuItem>
                <DropdownMenuItem>Euro</DropdownMenuItem>
                <DropdownMenuItem>British Pound</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right side - Seller links */}
          <div className="flex items-center space-x-4">
            <Link
              href="/register/seller"
              className="text-gray-600 hover:text-gray-900"
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-gray-600 hover:text-gray-900"
              >
                Become a Seller !
              </Button>
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              href="/seller/login"
              className="text-gray-600 hover:text-gray-900"
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-gray-600 hover:text-gray-900"
              >
                Login to Seller
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
