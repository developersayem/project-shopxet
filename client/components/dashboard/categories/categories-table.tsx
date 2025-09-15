"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Edit, Trash2 } from "lucide-react";
import { ICategory } from "@/types/category.type";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoriesTableProps {
  category?: ICategory[];
  className?: string;
  selectedCategories?: string[];
  onSelectAll?: (checked: boolean) => void;
  onSelectCategory?: (categoryId: string, checked: boolean) => void;
  onEditCategory?: (category: ICategory) => void;
  onDeleteCategory?: (categoryId: string) => void;
}

export function CategoriesTable({
  category,
  className,
  selectedCategories = [],
  onSelectAll,
  onSelectCategory,
  onEditCategory,
  onDeleteCategory,
}: CategoriesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [checked, setChecked] = useState(false);
  const [sortBy, setSortBy] = useState("all"); // ✅ added
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // 🔎 Filter categories
  let filteredCategories = category?.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Apply "Sort by" filter
  if (sortBy === "published") {
    filteredCategories = filteredCategories?.filter((c) => c.isPublished);
  }
  if (sortBy === "unpublished") {
    filteredCategories = filteredCategories?.filter(
      (c) => c.isPublished === false
    );
  }

  // 📑 Pagination
  const totalPages = Math.ceil(
    (filteredCategories?.length || 0) / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSelectAll = (checked: boolean) => {
    onSelectAll?.(checked);
  };

  const handleSelectCategory = (categoryId: string, checked: boolean) => {
    onSelectCategory?.(categoryId, checked);
  };

  const handleEditCategory = (category: ICategory) => {
    onEditCategory?.(category);
  };

  const handleDeleteCategory = (categoryId: string) => {
    onDeleteCategory?.(categoryId);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 🔎 Search and filters */}
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
          {/* ✅ Sort by */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="unpublished">Unpublished</SelectItem>
            </SelectContent>
          </Select>

          {/* ✅ Parent toggle */}
          <button
            onClick={() => setChecked(!checked)}
            className={`relative flex items-center w-36 h-8 rounded-full transition-colors duration-300 
        ${checked ? "bg-green-600" : "bg-green-600"}
      `}
          >
            <span
              className={`flex-1 px-5 text-white text-sm font-medium ${
                checked ? "text-end" : "text-start"
              }`}
            >
              {checked ? "Parents Only" : "All"}
            </span>
            <span
              className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300
          ${checked ? "left-1" : "right-1"}
        `}
            />
          </button>
        </div>
      </div>

      {/* 📋 Categories Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    paginatedCategories &&
                    selectedCategories.length === paginatedCategories?.length &&
                    paginatedCategories.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="font-semibold">NAME</TableHead>
              <TableHead className="font-semibold">Description</TableHead>
              <TableHead className="font-semibold">PUBLISHED</TableHead>
              <TableHead className="font-semibold">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCategories?.map((category) => (
              <TableRow key={category._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCategories.includes(category._id)}
                    onCheckedChange={(checked) =>
                      handleSelectCategory(category._id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      src={category.image || "/category-placeholder.png"}
                      alt={category.name}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                    <span className="font-medium">{category.name}</span>
                  </div>
                </TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <Switch checked={category.isPublished} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEditCategory(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteCategory(category._id)}
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

      {/* 📑 Pagination */}
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
