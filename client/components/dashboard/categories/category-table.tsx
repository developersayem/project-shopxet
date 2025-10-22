"use client";

import { useEffect, useState } from "react";
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
import {
  Search,
  Edit,
  Trash2,
  Star,
  StarOff,
  BookCheck,
  BookDashed,
} from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import api from "@/lib/axios";
import { KeyedMutator } from "swr";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ICategory } from "@/types/category.type";

interface CategoriesTableProps {
  categories?: ICategory[];
  className?: string;
  onEditCategory?: (category: ICategory) => void;
  onTogglePublish?: (categoryId: string, value: boolean) => void;
  onSelectionChange?: (selected: ICategory[]) => void;
  mutateCategoriesData?: KeyedMutator<{ data: ICategory[] }>;
}

export function CategoriesTable({
  categories = [],
  className,
  onEditCategory,
  onTogglePublish,
  onSelectionChange,
  mutateCategoriesData,
}: CategoriesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // -------------------- Filtering --------------------
  let filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filterBy === "published") {
    filtered = filtered.filter((c) => c.isPublished);
  } else if (filterBy === "unpublished") {
    filtered = filtered.filter((c) => !c.isPublished);
  }

  // -------------------- Pagination --------------------
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  // -------------------- Handlers --------------------
  // Handler for select all categories
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCategories(categories?.map((p) => p._id) || []);
    } else {
      setSelectedCategories([]);
    }
  };

  // Handler for select single category
  const handleSelectCategory = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
  };

  // Sync selected category objects with parent (if provided)
  useEffect(() => {
    const selectedObjects = categories.filter((c) =>
      selectedCategories.includes(c._id)
    );
    onSelectionChange?.(selectedObjects);
  }, [selectedCategories, categories, onSelectionChange]);

  const handleEdit = (category: ICategory) => {
    onEditCategory?.(category);
  };

  // Handler for delete single category
  const handleDeleteOne = async (id: string) => {
    try {
      const res = await api.delete(`/categories/${id}`);
      if (res.status === 200) {
        toast.success("Category deleted successfully");
        await mutateCategoriesData?.(); // refresh categories
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error deleting category");
      // Handle error
    }
  };

  // Handler for delete many categories
  const handleDeleteMany = async () => {
    try {
      if (selectedCategories.length === 0) {
        toast.error("Please select at least one category to delete.");
        return;
      }

      const res = await api.post(`/categories/delete-many`, {
        ids: selectedCategories,
      });

      if (res.status === 200) {
        toast.success(
          `${res.data.message || "categories deleted successfully"}`
        );
        setSelectedCategories([]); // clear selection
        await mutateCategoriesData?.(); // refresh categories
      }
    } catch (error) {
      console.error("Error deleting categories:", error);
      toast.error("Error deleting categories");
    }
  };

  // Handler for toggle publish single category
  const handleTogglePublish = async (categoryId: string, value: boolean) => {
    onTogglePublish?.(categoryId, value);
    try {
      const res = await api.patch(`/categories/${categoryId}/toggle-published`);
      console.log(res);
      if (res.status === 200) {
        toast.success(`${res.data.message}`);
        await mutateCategoriesData?.(); // refresh categories
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error updating category");
      // Handle error
    }
  };

  // Handler for toggle publish many categories
  const handleTogglePublishMany = async (action: "publish" | "unpublish") => {
    if (selectedCategories.length === 0) {
      toast.error("Please select at least one category.");
      return;
    }

    try {
      const res = await api.patch(`/categories/toggle-multiple-published`, {
        ids: selectedCategories,
        action,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        setSelectedCategories([]);
        await mutateCategoriesData?.();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating categories");
    }
  };

  // Handler for toggle featured for single category
  const handleToggleFeatured = async (categoryId: string, value: boolean) => {
    onTogglePublish?.(categoryId, value);
    try {
      const res = await api.patch(`/categories/${categoryId}/toggle-featured`);
      console.log(res);
      if (res.status === 200) {
        toast.success(`${res.data.message}`);
        await mutateCategoriesData?.(); // refresh categories
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error updating category");
      // Handle error
    }
  };

  // Handler for toggle featured for many categories
  const handleToggleFeaturedMany = async (
    selectedCategories: string[],
    action: "feature" | "unfeature"
  ) => {
    if (selectedCategories.length === 0) {
      toast.error("Please select at least one category.");
      return;
    }

    try {
      const res = await api.patch(`/categories/toggle-multiple-featured`, {
        ids: selectedCategories,
        action,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        await mutateCategoriesData?.(); // refresh categories
      }
    } catch (error) {
      console.error("Error updating categories:", error);
      toast.error("Error updating categories");
    }
  };

  // -------------------- Render --------------------
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center md:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          {/* Publish many categories - Unpublish many categories */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-green-600 hover:text-green-700"
                disabled={selectedCategories.length === 0}
                onClick={() => handleTogglePublishMany("publish")}
              >
                <BookCheck />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-sm">
              Publish Selected
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
                disabled={selectedCategories.length === 0}
                onClick={() => handleTogglePublishMany("unpublish")}
              >
                <BookDashed />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-sm">
              Remove from Publish
            </TooltipContent>
          </Tooltip>

          {/* Publish many categories - un publish many categories */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-yellow-600 hover:text-yellow-700"
                disabled={selectedCategories.length === 0}
                onClick={() =>
                  handleToggleFeaturedMany(selectedCategories, "feature")
                }
              >
                <Star />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-sm">
              Mark as Featured
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
                disabled={selectedCategories.length === 0}
                onClick={() =>
                  handleToggleFeaturedMany(selectedCategories, "unfeature")
                }
              >
                <StarOff className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-sm">
              Remove from Featured
            </TooltipContent>
          </Tooltip>

          {/* Delete many categories */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-red-100 text-red-700 border-red-200 hover:bg-red-500 hover:text-white"
                disabled={selectedCategories.length === 0} // ✅ disables button if none selected
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-accent">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  selected categories.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 text-white"
                  onClick={handleDeleteMany}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger size="sm" className="w-[140px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="unpublished">Unpublished</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg capitalize">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    paginated.length > 0 &&
                    paginated.every((c) => selectedCategories.includes(c._id))
                  }
                  onCheckedChange={(checked) =>
                    handleSelectAll(Boolean(checked))
                  }
                />
              </TableHead>
              <TableHead className="font-semibold">NAME</TableHead>
              <TableHead className="font-semibold">DESCRIPTION</TableHead>
              <TableHead className="font-semibold">Parent Category</TableHead>
              <TableHead className="font-semibold">PUBLISHED</TableHead>
              <TableHead className="font-semibold">Featured</TableHead>
              <TableHead className="font-semibold">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.map((category) => (
              <TableRow key={category?._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCategories.includes(category._id)}
                    onCheckedChange={(checked) =>
                      handleSelectCategory(category?._id, Boolean(checked))
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Image
                          src={category?.image || "/category-placeholder.png"}
                          alt={category?.name}
                          width={32}
                          height={32}
                          className="rounded cursor-pointer hover:scale-105 transition-transform"
                        />
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl p-0 bg-transparent border-none shadow-none">
                        <Image
                          src={category?.image || "/category-placeholder.png"}
                          alt={category?.name}
                          width={800}
                          height={800}
                          className="rounded-lg mx-auto"
                        />
                      </DialogContent>
                    </Dialog>
                    <span className="font-medium ">{category?.name}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {category?.description}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Image
                          src={
                            category?.parent?.image ||
                            "/category-placeholder.png"
                          }
                          alt={category?.parent?.name ?? "Default Alt Text"}
                          width={32}
                          height={32}
                          className="rounded cursor-pointer hover:scale-105 transition-transform"
                        />
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl p-0 bg-transparent border-none shadow-none">
                        <Image
                          src={
                            category?.parent?.image ||
                            "/category-placeholder.png"
                          }
                          alt={category?.parent?.name ?? "Default Alt Text"}
                          width={32}
                          height={32}
                          className="rounded cursor-pointer hover:scale-105 transition-transform"
                        />
                      </DialogContent>
                    </Dialog>
                    {category?.parent?.name || "None"}
                  </div>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={category?.isPublished}
                    onCheckedChange={(value) =>
                      handleTogglePublish(category?._id, value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={category?.isFeatured}
                    onCheckedChange={(value) =>
                      handleToggleFeatured(category?._id, value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {/* Edit */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {/* Delete */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="bg-accent">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete{" "}
                            <span className="font-semibold text-red-600">
                              “{category.name}”
                            </span>{" "}
                            category.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 text-white hover:bg-red-700"
                            onClick={() => handleDeleteOne(category._id)} // ✅ Correct placement
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {paginated.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-6"
                >
                  No category found
                </TableCell>
              </TableRow>
            )}
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
