"use client";

import type React from "react";

import { ProductsManagementTable } from "@/components/dashboard/catalog/products/products-management-table";
import { BulkActionDrawer } from "@/components/dashboard/catalog/products/bulk-action-drawer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export interface IProduct {
  id: number;
  name: string;
  icon: string;
  category: string;
  price: number;
  salePrice: number;
  stock: number;
  status: string;
  published: boolean;
  dateAdded: string; // or Date
  dateUpdated: string; // or Date
}

// Demo products data matching the screenshot
const demoProducts: IProduct[] = [
  {
    id: 1,
    name: "Premium T-Shirts",
    icon: "👕",
    category: "",
    price: 450.0,
    salePrice: 450.0,
    stock: 4549,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-10T09:15:00Z",
    dateUpdated: "2025-02-05T14:25:00Z",
  },
  {
    id: 2,
    name: "Himalaya Powder",
    icon: "🧴",
    category: "Skin Care",
    price: 174.97,
    salePrice: 160.0,
    stock: 523879020,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-11T10:20:00Z",
    dateUpdated: "2025-02-08T16:40:00Z",
  },
  {
    id: 3,
    name: "Green Leaf Lettuce",
    icon: "🥬",
    category: "Fresh Vegetable",
    price: 112.72,
    salePrice: 112.72,
    stock: 461,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-12T12:45:00Z",
    dateUpdated: "2025-02-10T09:00:00Z",
  },
  {
    id: 4,
    name: "Rainbow Chard",
    icon: "🌈",
    category: "Fresh Vegetable",
    price: 7.07,
    salePrice: 7.07,
    stock: 471,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-13T08:30:00Z",
    dateUpdated: "2025-02-11T11:15:00Z",
  },
  {
    id: 5,
    name: "Clementine",
    icon: "🍊",
    category: "Fresh Fruits",
    price: 48.12,
    salePrice: 48.12,
    stock: 425,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-14T15:10:00Z",
    dateUpdated: "2025-02-12T18:30:00Z",
  },
  {
    id: 6,
    name: "Kale Sprouts",
    icon: "🥬",
    category: "Fresh Vegetable",
    price: 106.06,
    salePrice: 90.0,
    stock: 297,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-15T09:25:00Z",
    dateUpdated: "2025-02-13T13:45:00Z",
  },
  {
    id: 7,
    name: "Rainbow Peppers",
    icon: "🌶️",
    category: "Fresh Vegetable",
    price: 90.85,
    salePrice: 90.85,
    stock: 412,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-16T11:35:00Z",
    dateUpdated: "2025-02-14T17:20:00Z",
  },
  {
    id: 8,
    name: "Blueberry",
    icon: "🫐",
    category: "Fresh Fruits",
    price: 211.96,
    salePrice: 211.96,
    stock: 201,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-17T14:50:00Z",
    dateUpdated: "2025-02-15T08:55:00Z",
  },
  {
    id: 9,
    name: "Calabaza Squash",
    icon: "🎃",
    category: "Fresh Vegetable",
    price: 98.03,
    salePrice: 98.03,
    stock: 580,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-18T07:45:00Z",
    dateUpdated: "2025-02-16T10:40:00Z",
  },
  {
    id: 10,
    name: "Lettuce",
    icon: "🥬",
    category: "Fresh Vegetable",
    price: 193.26,
    salePrice: 193.26,
    stock: 367,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-19T16:05:00Z",
    dateUpdated: "2025-02-17T12:15:00Z",
  },
  {
    id: 11,
    name: "Radicchio",
    icon: "🥬",
    category: "Fresh Vegetable",
    price: 58.66,
    salePrice: 45.0,
    stock: 77,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-20T09:55:00Z",
    dateUpdated: "2025-02-18T14:30:00Z",
  },
  {
    id: 12,
    name: "Parsley",
    icon: "🌿",
    category: "Fresh Vegetable",
    price: 134.63,
    salePrice: 134.63,
    stock: 172,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-21T10:15:00Z",
    dateUpdated: "2025-02-19T09:50:00Z",
  },
  {
    id: 13,
    name: "Strawberrie",
    icon: "🍓",
    category: "Fresh Fruits",
    price: 156.95,
    salePrice: 140.0,
    stock: 421,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-22T08:40:00Z",
    dateUpdated: "2025-02-20T15:25:00Z",
  },
  {
    id: 14,
    name: "Cauliflower",
    icon: "🥦",
    category: "Fresh Vegetable",
    price: 139.15,
    salePrice: 139.15,
    stock: 224,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-23T13:20:00Z",
    dateUpdated: "2025-02-21T11:10:00Z",
  },
  {
    id: 15,
    name: "Organic Purple Cauliflower",
    icon: "🟣",
    category: "Fresh Vegetable",
    price: 19.57,
    salePrice: 19.57,
    stock: 29,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-24T17:00:00Z",
    dateUpdated: "2025-02-22T13:15:00Z",
  },
  {
    id: 16,
    name: "Ahold Acorn Squash",
    icon: "🥜",
    category: "Fresh Vegetable",
    price: 71.18,
    salePrice: 71.18,
    stock: 767,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-25T09:30:00Z",
    dateUpdated: "2025-02-23T16:40:00Z",
  },
  {
    id: 17,
    name: "Bok Choy Cabbage",
    icon: "🥬",
    category: "Fresh Vegetable",
    price: 247.39,
    salePrice: 247.39,
    stock: 297,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-26T14:25:00Z",
    dateUpdated: "2025-02-24T08:20:00Z",
  },
  {
    id: 18,
    name: "Strawberries Package",
    icon: "🍓",
    category: "Fresh Fruits",
    price: 189.89,
    salePrice: 189.89,
    stock: 1302,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-27T07:15:00Z",
    dateUpdated: "2025-02-25T11:50:00Z",
  },
  {
    id: 19,
    name: "Aloe Vera Leaf",
    icon: "🌿",
    category: "Fresh Vegetable",
    price: 157.0,
    salePrice: 157.0,
    stock: 14,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-28T18:05:00Z",
    dateUpdated: "2025-02-26T12:35:00Z",
  },
  {
    id: 20,
    name: "Pineapple Imported",
    icon: "🍍",
    category: "Fresh Fruits",
    price: 46.34,
    salePrice: 30.0,
    stock: 502,
    status: "Selling",
    published: true,
    dateAdded: "2025-01-29T11:00:00Z",
    dateUpdated: "2025-02-27T10:10:00Z",
  },
];

const ProductsPages = () => {
  const [products, setProducts] = useState(demoProducts);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [openImport, setOpenImport] = useState(false);
  const [isBulkDrawerOpen, setIsBulkDrawerOpen] = useState(false);

  // function to handle add product
  const handleAddProduct = (newProduct: Omit<IProduct, "id">) => {
    const id = Math.max(...products.map((p) => p.id)) + 1;
    const productWithId: IProduct = {
      ...newProduct,
      id,
      dateAdded: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    };
    setProducts([...products, productWithId]);
  };

  // function to handle export
  const handleExport = (format: "csv" | "json") => {
    if (format === "json") {
      const dataStr = JSON.stringify(products, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "products.json";
      link.click();
    } else if (format === "csv") {
      const headers = [
        "ID",
        "Name",
        "Category",
        "Price",
        "Sale Price",
        "Stock",
        "Status",
        "Published",
        "Date Added",
        "Date Updated",
      ];
      const csvContent = [
        headers.join(","),
        ...products.map((p) =>
          [
            p.id,
            `"${p.name}"`,
            `"${p.category}"`,
            p.price,
            p.salePrice,
            p.stock,
            `"${p.status}"`,
            p.published,
            p.dateAdded,
            p.dateUpdated,
          ].join(",")
        ),
      ].join("\n");

      const dataBlob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "products.csv";
      link.click();
    }
  };

  // helper function for handle import
  const onImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        if (file.name.endsWith(".json")) {
          const importedProducts = JSON.parse(content) as IProduct[];
          setProducts([...products, ...importedProducts]);
        }
      } catch (error) {
        console.error("Error importing file:", error);
      }
    };
    reader.readAsText(file);
  };

  // main handler for handle import
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImport(file);
    e.target.value = "";
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(products?.map((p) => p.id) || []);
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: number, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const handleBulkAction = () => {
    if (selectedProducts.length > 0) {
      setIsBulkDrawerOpen(true);
    }
  };

  const handleBulkUpdate = (updates: IProduct) => {
    console.log(
      "[v0] Bulk updating products:",
      selectedProducts,
      "with updates:",
      updates
    );

    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (selectedProducts.includes(product.id)) {
          return {
            ...product,
            ...(updates.category && { category: updates.category }),
            ...(updates.published !== undefined && {
              published: updates.published,
            }),
            dateUpdated: new Date().toISOString(),
          };
        }
        return product;
      })
    );

    setSelectedProducts([]);
    setIsBulkDrawerOpen(false);
  };

  const handleEditProduct = (product: IProduct) => {
    console.log("Edit product:", product);
    // TODO: Implement edit modal
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter((p) => p.id !== productId));
    setSelectedProducts(selectedProducts.filter((id) => id !== productId));
  };

  return (
    <div className="space-y-6">
      {/* Header with action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex flex-wrap gap-2">
          {/* Export */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport("csv")}>
                <FileText className="h-4 w-4 mr-2" />
                Export to CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("json")}>
                <FileText className="h-4 w-4 mr-2" />
                Export to JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Import */}
          {!openImport ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpenImport(true)}
            >
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="file"
                  accept=".json,.csv"
                  onChange={handleFileImport}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-dashed border-teal-300 text-teal-600 bg-transparent"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Select File
                </Button>
              </div>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setOpenImport(false)}
              >
                Import Now
              </Button>
            </div>
          )}

          {/* Bulk & Delete */}
          <Button
            size="sm"
            className="bg-orange-500 hover:bg-orange-600"
            onClick={handleBulkAction}
            disabled={selectedProducts.length === 0}
          >
            Bulk Action
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-red-100 text-red-700 border-red-200 hover:bg-red-500 hover:text-white"
            disabled={selectedProducts.length === 0}
            onClick={() => {
              selectedProducts.forEach((id) => handleDeleteProduct(id));
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Link href="/dashboard/products/add-product">
            <Button size="sm" className="bg-green-500 hover:bg-green-600">
              Add Products
            </Button>
          </Link>
        </div>
      </div>

      {/* Products Table */}
      <ProductsManagementTable
        products={products}
        selectedProducts={selectedProducts}
        onSelectAll={handleSelectAll}
        onSelectProduct={handleSelectProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />

      {/* Bulk Action Drawer */}
      {/* <BulkActionDrawer
        isOpen={isBulkDrawerOpen}
        onClose={() => setIsBulkDrawerOpen(false)}
        selectedCount={selectedProducts.length}
        onBulkUpdate={handleBulkUpdate}
      /> */}
    </div>
  );
};

export default ProductsPages;
