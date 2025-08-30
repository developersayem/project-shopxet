"use client";

import { BestSellingProductsChart } from "@/components/dashboard/overview/best-selling-products-chart";
import RecentOrdersTable from "@/components/dashboard/overview/recent-orders-table";
import StateCardSmall from "@/components/dashboard/overview/stat-card-small";
import StatCard from "@/components/dashboard/overview/state-card";
import { WeeklySalesChart } from "@/components/dashboard/overview/weekly-sales-chart";
import AnimatedContent from "@/components/dashboard/shared/AnimatedContent";
import {
  ChartNoAxesCombined,
  Calendar,
  CalendarRange,
  CheckCheck,
  Clock,
  Layers,
  RefreshCcw,
  ShoppingCart,
  TruckElectric,
} from "lucide-react";

export default function OverviewPage() {
  return (
    <>
      <AnimatedContent>
        {/* Stat cards */}
        <div className="grid gap-4 mb-8 xl:grid-cols-5 md:grid-cols-2">
          <StatCard
            title="Today Order"
            Icon={Layers}
            currency="৳"
            amount={0}
            loading={false}
            className="text-white dark:text-white bg-gradient-to-r from-emerald-500 to-emerald-700"
          />

          <StatCard
            title="Yesterday Order"
            Icon={Clock}
            currency="৳"
            amount={0}
            loading={false}
            className="text-white dark:text-white bg-gradient-to-r from-orange-400 to-red-500"
          />

          <StatCard
            title="This Month"
            Icon={Calendar}
            currency="৳"
            amount={0}
            loading={false}
            className="text-white dark:text-white bg-gradient-to-r from-blue-500 to-indigo-600"
          />

          <StatCard
            title="Last Month"
            Icon={CalendarRange}
            currency="৳"
            amount={0}
            loading={false}
            className="text-white dark:text-white bg-gradient-to-r from-cyan-500 to-sky-600"
          />

          <StatCard
            title="All Time Sales"
            Icon={ChartNoAxesCombined}
            currency="৳"
            amount={0}
            loading={false}
            className="text-white dark:text-white bg-gradient-to-r from-teal-600 to-green-700"
          />
        </div>

        {/* Stat card small  */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StateCardSmall
            title="Total Order"
            Icon={ShoppingCart}
            loading={false}
            amount={1136}
            className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
          />
          <StateCardSmall
            title="Orders Pending"
            Icon={RefreshCcw}
            loading={false}
            amount={15}
            className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
          />
          <StateCardSmall
            title="Orders Processing"
            Icon={TruckElectric}
            loading={false}
            amount={3}
            className="text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
          />
          <StateCardSmall
            title="Orders Delivered"
            Icon={CheckCheck}
            loading={false}
            amount={28}
            className="text-emerald-600 dark:text-emerald-100 bg-emerald-100 dark:bg-emerald-500"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 my-8">
          <WeeklySalesChart />
          <BestSellingProductsChart />
        </div>
      </AnimatedContent>

      <RecentOrdersTable />
    </>
  );
}
