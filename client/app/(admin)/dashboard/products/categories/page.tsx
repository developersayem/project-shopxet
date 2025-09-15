"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import CategoriesDemoData from "./data";
import { ICategory } from "@/types/category.type";
// import { BulkActionDrawer } from "@/components/dashboard/catalog/products/bulk-action-drawer";
import { AddCategoryModal } from "@/components/dashboard/categories/add-category-modal";
import { CategoriesTable } from "@/components/dashboard/categories/categories-table";

const CategoriesPages = () => {
  // const [products, setProducts] = useState(demoProducts);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [openImport, setOpenImport] = useState(false);
  const [isBulkDrawerOpen, setIsBulkDrawerOpen] = useState(false);

  // function to handle add product
  // const handleAddProduct = (newProduct: Omit<IProduct, "id">) => {
  //   const id = Math.max(...products.map((p) => p.id)) + 1;
  //   const productWithId: IProduct = {
  //     ...newProduct,
  //     id,
  //     dateAdded: new Date().toISOString(),
  //     dateUpdated: new Date().toISOString(),
  //   };
  //   setProducts([...products, productWithId]);
  // };

  // function to handle export
  const handleExport = (format: "csv" | "json") => {
    if (format === "json") {
      const dataStr = JSON.stringify(CategoriesDemoData, null, 2);
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
        ...CategoriesDemoData.map((p) =>
          [
            p._id,
            `"${p.name}"`,
            p.image,
            p.parent,
            p.description,
            p.isPublished,
            p.createdAt,
            p.updatedAt,
          ].join(",")
        ),
      ].join("\n");

      const dataBlob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "categories.csv";
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
          // todo
          const importedProducts = JSON.parse(content) as ICategory[];
          // setProducts([...CategoriesDemoData, ...importedProducts]);
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
      setSelectedCategories(CategoriesDemoData?.map((p) => p._id) || []);
    } else {
      setSelectedCategories([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, productId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== productId)
      );
    }
  };

  const handleBulkAction = () => {
    if (selectedCategories.length > 0) {
      setIsBulkDrawerOpen(true);
    }
  };

  const handleBulkUpdate = (updates: Partial<ICategory>) => {
    console.log(
      "[v0] Bulk updating products:",
      selectedCategories,
      "with updates:",
      updates
    );

    // todo

    setSelectedCategories([]);
    setIsBulkDrawerOpen(false);
  };

  const handleEditCategory = (category: ICategory) => {
    console.log("Edit Category:", category);
    // TODO: Implement edit modal
  };

  const handleDeleteCategory = (categoryId: string) => {
    // todo
    console.log("Delete Category:", categoryId);
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
            disabled={selectedCategories.length === 0}
          >
            Bulk Action
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-red-100 text-red-700 border-red-200 hover:bg-red-500 hover:text-white"
            disabled={selectedCategories.length === 0}
            onClick={() => {
              selectedCategories.forEach((id) => handleDeleteCategory(id));
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>

          {/* Add Category modal */}
          <AddCategoryModal />
        </div>
      </div>

      {/* Products Table */}

      <CategoriesTable
        category={CategoriesDemoData}
        selectedCategories={selectedCategories}
        onSelectAll={handleSelectAll}
        onSelectCategory={handleSelectProduct}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
      />

      {/* Bulk Action Drawer */}
      {/* <BulkActionDrawer
        isOpen={isBulkDrawerOpen}
        onClose={() => setIsBulkDrawerOpen(false)}
        selectedCount={selectedCategories.length}
        onBulkUpdate={handleBulkUpdate}
      /> */}
    </div>
  );
};

export default CategoriesPages;
