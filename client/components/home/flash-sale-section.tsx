/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { MoveRight, Zap } from "lucide-react";
import Link from "next/link";

// Import Swiper + Grid
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

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Flash Sale Section */}
      <div className="bg-white mb-5">
        <div className="flex items-center justify-between mb-2 ">
          <h2 className="text-2xl md:text-xl font-bold text-gray-800 flex items-center gap-2">
            Flash Sale <Zap className="w-5 h-5 md:w-6 md:h-6 text-brand-500" />
          </h2>
          <div className="flex gap-4 text-sm text-gray-600">
            <Link href="/flash-sale">
              <button className="hover:text-brand-600 flex items-center gap-1">
                View All
                <MoveRight className="text-brand-500 hidden md:block" />
              </button>
            </Link>
          </div>
        </div>

        {/* Countdown Timer for mobile devices */}
        <div className="text-red-500 p-5 mb-5 md:hidden shadow border">
          <div className="grid grid-cols-4 gap-1 md:gap-2 text-center">
            <div>
              <div className="text-lg md:text-2xl font-bold">
                {timeLeft.days}
              </div>
              <div className="text-xs">DAYS</div>
            </div>
            <div>
              <div className="text-lg md:text-2xl font-bold">
                {timeLeft.hours}
              </div>
              <div className="text-xs">HRS</div>
            </div>
            <div>
              <div className="text-lg md:text-2xl font-bold">
                {timeLeft.minutes}
              </div>
              <div className="text-xs">MIN</div>
            </div>
            <div>
              <div className="text-lg md:text-2xl font-bold">
                {timeLeft.seconds}
              </div>
              <div className="text-xs">SEC</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 ">
          {/* Left side - Countdown and Image */}
          <div className="bg-[#2c8d26] text-white relative overflow-hidden order-2 lg:order-1  hidden md:block">
            {/* Countdown Timer */}
            <div className="bg-white text-red-500 p-3 md:p-4 mb-2 md:mb-4 m-2 md:m-4">
              <div className="grid grid-cols-4 gap-1 md:gap-2 text-center">
                <div>
                  <div className="text-lg md:text-2xl font-bold">
                    {timeLeft.days}
                  </div>
                  <div className="text-xs">DAYS</div>
                </div>
                <div>
                  <div className="text-lg md:text-2xl font-bold">
                    {timeLeft.hours}
                  </div>
                  <div className="text-xs">HRS</div>
                </div>
                <div>
                  <div className="text-lg md:text-2xl font-bold">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-xs">MIN</div>
                </div>
                <div>
                  <div className="text-lg md:text-2xl font-bold">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-xs">SEC</div>
                </div>
              </div>
            </div>

            {/* Image section */}
            <div className="relative z-10 mt-4 md:mt-8">
              <img
                src="https://img.freepik.com/premium-photo/womans-hand-holding-shopping-bag-green-background_113876-2901.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Woman with shopping bags"
                className="w-full object-cover mx-auto"
              />
              <p className="text-center mt-1 md:mt-2 text-xs md:text-sm px-2">
                For limited time in Flash Sale
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-4 lg:grid-cols-5 h-full gap-0.5 p-0.5 pr-[1.5px]">
              {productsDemoData.slice(0, 10).map((product) => (
                <FlashSellCardCom
                  key={product.id}
                  product={product}
                  cardContentAlignment="start"
                />
              ))}
            </div>

            {/* Mobile Carousel (2-line layout) */}
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
    </>
  );
}
