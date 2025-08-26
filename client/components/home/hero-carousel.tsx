/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface AutoCarouselProps {
  className?: string;
}

const slides = [
  {
    id: 1,
    image: "/slider-img/slider-1.png",
  },
  {
    id: 2,
    image: "/slider-img/slider-2.png",
  },
  {
    id: 3,
    image: "/slider-img/slider-3.png",
  },
  {
    id: 5,
    image: "/slider-img/slider-6.png",
  },
];

const categories = [
  {
    name: "Women Clothing & Fashion",
    icon: "/icons/woman-cloth-icon.png",
  },
  {
    name: "Men Clothing & Fashion",
    icon: "/icons/man-cloth-icon.png",
  },
  {
    name: "Computer & Accessories",
    icon: "/icons/computer-icon.png",
  },
  {
    name: "Automobile & Motorcycle",
    icon: "/icons/car-icon.png",
  },
  {
    name: "Kids & toy",
    icon: "/icons/kids-icon.png",
  },
  {
    name: "Sports & outdoor",
    icon: "/icons/sports-icon.png",
  },
  {
    name: "Jewelry & Watches",
    icon: "/icons/watch-icon.png",
  },
  {
    name: "Cellphones & Tabs",
    icon: "/icons/phone-icon.png",
  },
  {
    name: "Beauty, Health & Hair",
    icon: "/icons/beauty-icon.png",
  },
  {
    name: "Home Improvement & Tools",
    icon: "/icons/tools-icon.png",
  },
];

export function HeroCarousel({ className = "" }: AutoCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const interval = 2000;

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  if (!slides.length) return null;

  // todo: the slider img will me 1920 x 420

  return (
    <>
      <div className="flex w-full">
        {/* Categories */}
        <div className="w-64 bg-white border-l border-b ">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3 px-4 py-3 hover:bg-brand-100 cursor-pointer border-b last:border-b-0 group"
            >
              <Image src={cat.icon} alt={cat.name} width={24} height={24} />
              <span className="text-neutral-700 font-medium text-sm transition-transform group-hover:translate-x-2">
                {cat.name}
              </span>
            </div>
          ))}
        </div>

        {/* Slider */}
        <div
          className={`relative flex-1 h-[250px] sm:h-[350px] md:h-[490px] overflow-hidden ${className}`}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative w-full h-full bg-slate-800">
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={`Slide ${slide.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
