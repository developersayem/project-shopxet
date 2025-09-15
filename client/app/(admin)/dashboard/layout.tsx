"use client";

import { AppSidebar } from "@/components/dashboard/shared/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { generateBreadcrumbs } from "@/utils/breadcrumb";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { useProductForm } from "@/hooks/useProductForm";
import { Button } from "@/components/ui/button";
import { AuthProvider } from "@/contexts/auth-context";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);
  const productForm = useProductForm();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="theme"
    >
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex justify-between  h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.href}>
                      <BreadcrumbItem>
                        {index === breadcrumbs.length - 1 ? (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={crumb.href}>
                            {crumb.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-4 px-4">
              {pathname === "/dashboard/products/add-product" && (
                <Button
                  size="sm"
                  onClick={productForm.submit}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Create Product
                </Button>
              )}
              <ThemeToggle />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <AuthProvider>{children}</AuthProvider>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
