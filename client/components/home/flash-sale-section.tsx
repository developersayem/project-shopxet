/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import productsDemoData from "@/app/product";
import FlashSellCardCom from "../shared/flash-sell-card-com";

export default function FlashSaleSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 100,
    hours: 22,
    minutes: 6,
    seconds: 20,
  });

  // Countdown Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white mb-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl md:text-xl font-bold text-gray-800 flex items-center gap-2">
          Flash Sale
        </h2>
        <Link href="/flash-sale">
          <button className="hover:text-brand-600 flex items-center gap-1 text-sm text-gray-600">
            View All
            <MoveRight className="text-brand-500 hidden md:block" />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Side - Countdown + Image */}
        <div className="relative w-full h-full hidden md:block order-2 lg:order-1">
          {/* Background Image */}
          <img
            src="/flash-sale.jpg"
            alt="Flash Sale Banner"
            className="w-full h-full object-cover"
          />

          {/* Countdown overlay */}
          <div
            className="absolute top-4 w-fit left-1/2 -translate-x-1/2 
  bg-white rounded-lg shadow-lg px-4 py-2"
          >
            <div className="flex justify-center">
              <div className="flex justify-center items-center h-12 w-20">
                <img src="/gif/sale.gif" alt="Sale GIF" />
              </div>
              <div className="flex justify-center items-start gap-2 text-red-600">
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold">
                    {timeLeft.days}
                  </div>
                  <div className="text-[10px] md:text-xs tracking-wider">
                    DAYS
                  </div>
                </div>

                <span className="text-lg md:text-3xl font-bold">:</span>

                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold">
                    {timeLeft.hours}
                  </div>
                  <div className="text-[10px] md:text-xs tracking-wider">
                    HRS
                  </div>
                </div>

                <span className="text-lg md:text-3xl font-bold">:</span>

                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-[10px] md:text-xs tracking-wider">
                    MIN
                  </div>
                </div>

                <span className="text-lg md:text-3xl font-bold">:</span>

                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-[10px] md:text-xs tracking-wider">
                    SEC
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="absolute bottom-2 w-full text-center text-xs md:text-sm text-white drop-shadow-md">
            For a limited time only in Flash Sale
          </p>
        </div>

        {/* Right Side - Product Cards */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-4 lg:grid-cols-5 gap-2 p-1">
            {productsDemoData.slice(0, 10).map((product) => (
              <FlashSellCardCom
                key={product.id}
                product={product}
                cardContentAlignment="center"
                priceColor="#16a34a"
                borderColor="#f9fafb"
                borderHoverColor="#22c55e"
                borderWidth={2}
                currency="৳"
              />
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Swiper
              spaceBetween={10}
              slidesPerView={2.2}
              grid={{ rows: 1, fill: "row" }}
              modules={[Grid]}
            >
              {productsDemoData.slice(0, 10).map((product) => (
                <SwiperSlide key={product.id}>
                  <FlashSellCardCom product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
