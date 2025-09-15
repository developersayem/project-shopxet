"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Edit, Trash2, Eye } from "lucide-react";
import { IProduct } from "@/app/(admin)/dashboard/products/all-products/page";

interface ProductsManagementTableProps {
  products?: IProduct[];
  className?: string;
  selectedProducts?: number[];
  onSelectAll?: (checked: boolean) => void;
  onSelectProduct?: (productId: number, checked: boolean) => void;
  onEditProduct?: (product: IProduct) => void;
  onDeleteProduct?: (productId: number) => void;
}

export function ProductsManagementTable({
  products,
  className,
  selectedProducts = [],
  onSelectAll,
  onSelectProduct,
  onEditProduct,
  onDeleteProduct,
}: ProductsManagementTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Low to High");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter products
  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = filteredProducts?.sort((a, b) => {
    switch (sortBy) {
      case "Low to High":
        return a.price - b.price;
      case "High to Low":
        return b.price - a.price;
      case "Published":
        return a.published === b.published ? 0 : a.published ? -1 : 1;
      case "Unpublished":
        return a.published === b.published ? 0 : a.published ? 1 : -1;
      case "Status - Selling":
        return a.status === "Selling" ? -1 : 1;
      case "Status - Out of Stock":
        return a.status === "Out of Stock" ? -1 : 1;
      case "Date Added (Asc)":
        return (
          new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        );
      case "Date Added (Desc)":
        return (
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
      case "Date Updated (Asc)":
        return (
          new Date(a.dateUpdated).getTime() - new Date(b.dateUpdated).getTime()
        );
      case "Date Updated (Desc)":
        return (
          new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime()
        );
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil((sortedProducts?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSelectAll = (checked: boolean) => {
    onSelectAll?.(checked);
  };

  const handleSelectProduct = (productId: number, checked: boolean) => {
    onSelectProduct?.(productId, checked);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setSortBy("Low to High");
    setCurrentPage(1);
  };

  const handleEditProduct = (product: IProduct) => {
    onEditProduct?.(product);
  };

  const handleDeleteProduct = (productId: number) => {
    onDeleteProduct?.(productId);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center md:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Categories">All Categories</SelectItem>
              <SelectItem value="Fresh Vegetable">Fresh Vegetable</SelectItem>
              <SelectItem value="Fresh Fruits">Fresh Fruits</SelectItem>
              <SelectItem value="Skin Care">Skin Care</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low to High">Low to High</SelectItem>
              <SelectItem value="High to Low">High to Low</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Unpublished">Unpublished</SelectItem>
              <SelectItem value="Status - Selling">Status - Selling</SelectItem>
              <SelectItem value="Status - Out of Stock">
                Status - Out of Stock
              </SelectItem>
              <SelectItem value="Date Added (Asc)">Date Added (Asc)</SelectItem>
              <SelectItem value="Date Added (Desc)">
                Date Added (Desc)
              </SelectItem>
              <SelectItem value="Date Updated (Asc)">
                Date Updated (Asc)
              </SelectItem>
              <SelectItem value="Date Updated (Desc)">
                Date Updated (Desc)
              </SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-green-600 hover:bg-green-700">Filter</Button>

          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      {/* Products table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    paginatedProducts &&
                    selectedProducts.length === paginatedProducts?.length &&
                    paginatedProducts.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="font-semibold">PRODUCT NAME</TableHead>
              <TableHead className="font-semibold">CATEGORY</TableHead>
              <TableHead className="font-semibold">PRICE</TableHead>
              <TableHead className="font-semibold">SALE PRICE</TableHead>
              <TableHead className="font-semibold">STOCK</TableHead>
              <TableHead className="font-semibold">STATUS</TableHead>
              <TableHead className="font-semibold">VIEW</TableHead>
              <TableHead className="font-semibold">PUBLISHED</TableHead>
              <TableHead className="font-semibold">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={(checked) =>
                      handleSelectProduct(product.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{product.icon}</span>
                    <span className="font-medium">{product.name}</span>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="font-semibold">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell className="font-semibold">
                  ${product.salePrice.toFixed(2)}
                </TableCell>
                <TableCell>{product.stock.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className="bg-teal-100 text-teal-800 border-teal-200">
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Switch checked={product.published} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNum)}
                    isActive={currentPage === pageNum}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {totalPages > 5 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(totalPages)}
                    className="cursor-pointer"
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
