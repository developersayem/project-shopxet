"use client";

import * as React from "react";
import {
  Blocks,
  Contact,
  Layers,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/shared/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import { NavUser } from "./nav-user";

const mainRoute = "/dashboard";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: `${mainRoute}`,
      icon: LayoutDashboard,
      isActive: false,
      items: [],
    },
    {
      title: "Catalog",
      url: "#",
      icon: Blocks,
      isActive: true,
      items: [
        {
          title: "Products",
          url: `${mainRoute}/catalog/products`,
        },
        {
          title: "categories",
          url: `${mainRoute}/catalog/categories`,
        },
        {
          title: "attributes",
          url: `${mainRoute}/catalog/attributes`,
        },
        {
          title: "coupon",
          url: `${mainRoute}/catalog/coupon`,
        },
      ],
    },
    {
      title: "customers",
      url: `${mainRoute}/customers`,
      icon: Contact,
      isActive: false,
      items: [],
    },
    {
      title: "Orders",
      url: `${mainRoute}/orders`,
      icon: Layers,
      isActive: false,
      items: [],
    },
    {
      title: "Staffs",
      url: `${mainRoute}/staff`,
      icon: Users,
      isActive: false,
      items: [],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      isActive: false,
      items: [
        {
          title: "store customization",
          url: `${mainRoute}/settings/store-customization`,
        },
        {
          title: "store settings",
          url: `${mainRoute}/settings/store-settings`,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const { user, logout } = useAuth();
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="font-bold font-sans text-2xl leading-none">
                    {/* {user.shopName} */}
                    ShopXet
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={user} logout={logout} /> */}
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
