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

import { ICollection } from "@/types/collection.type";
import api from "@/lib/axios";
import { KeyedMutator } from "swr";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface CollectionsTableProps {
  collections?: ICollection[];
  className?: string;
  onEditCollection?: (collection: ICollection) => void;
  onTogglePublish?: (collectionId: string, value: boolean) => void;
  mutateCollectionsData?: KeyedMutator<{ data: ICollection[] }>;
}

export function CollectionsTable({
  collections = [],
  className,
  onEditCollection,
  onTogglePublish,
  mutateCollectionsData,
}: CollectionsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

  // -------------------- Filtering --------------------
  let filtered = collections.filter((c) =>
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
  // Handler for select all collections
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCollections(collections?.map((p) => p._id) || []);
    } else {
      setSelectedCollections([]);
    }
  };

  // Handler for select single collection
  const handleSelectCollection = (collectionId: string, checked: boolean) => {
    if (checked) {
      setSelectedCollections([...selectedCollections, collectionId]);
    } else {
      setSelectedCollections(
        selectedCollections.filter((id) => id !== collectionId)
      );
    }
  };

  const handleEdit = (collection: ICollection) => {
    onEditCollection?.(collection);
  };

  // Handler for delete single collection
  const handleDeleteOne = async (id: string) => {
    try {
      const res = await api.delete(`/collections/${id}`);
      if (res.status === 200) {
        toast.success("Collection deleted successfully");
        await mutateCollectionsData?.(); // refresh collections
      }
    } catch (error) {
      console.error("Error deleting collection:", error);
      toast.error("Error deleting collection");
      // Handle error
    }
  };

  // Handler for delete many collections
  const handleDeleteMany = async () => {
    try {
      if (selectedCollections.length === 0) {
        toast.error("Please select at least one collection to delete.");
        return;
      }

      const res = await api.post(`/collections/delete-many`, {
        ids: selectedCollections,
      });

      if (res.status === 200) {
        toast.success(
          `${res.data.message || "Collections deleted successfully"}`
        );
        setSelectedCollections([]); // clear selection
        await mutateCollectionsData?.(); // refresh collections
      }
    } catch (error) {
      console.error("Error deleting collections:", error);
      toast.error("Error deleting collections");
    }
  };

  // Handler for toggle publish single collection
  const handleTogglePublish = async (collectionId: string, value: boolean) => {
    onTogglePublish?.(collectionId, value);
    try {
      const res = await api.patch(
        `/collections/${collectionId}/toggle-published`
      );
      console.log(res);
      if (res.status === 200) {
        toast.success(`${res.data.message}`);
        await mutateCollectionsData?.(); // refresh collections
      }
    } catch (error) {
      console.error("Error updating collection:", error);
      toast.error("Error updating collection");
      // Handle error
    }
  };

  // Handler for toggle publish many collections
  const handleTogglePublishMany = async (action: "publish" | "unpublish") => {
    if (selectedCollections.length === 0) {
      toast.error("Please select at least one collection.");
      return;
    }

    try {
      const res = await api.patch(`/collections/toggle-multiple-published`, {
        ids: selectedCollections,
        action,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        setSelectedCollections([]);
        await mutateCollectionsData?.();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating collections");
    }
  };

  // Handler for toggle featured for single collection
  const handleToggleFeatured = async (collectionId: string, value: boolean) => {
    onTogglePublish?.(collectionId, value);
    try {
      const res = await api.patch(
        `/collections/${collectionId}/toggle-featured`
      );
      console.log(res);
      if (res.status === 200) {
        toast.success(`${res.data.message}`);
        await mutateCollectionsData?.(); // refresh collections
      }
    } catch (error) {
      console.error("Error updating collection:", error);
      toast.error("Error updating collection");
      // Handle error
    }
  };

  // Handler for toggle featured for many collections
  const handleToggleFeaturedMany = async (
    selectedCollections: string[],
    action: "feature" | "unfeature"
  ) => {
    if (selectedCollections.length === 0) {
      toast.error("Please select at least one collection.");
      return;
    }

    try {
      const res = await api.patch(`/collections/toggle-multiple-featured`, {
        ids: selectedCollections,
        action,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        await mutateCollectionsData?.(); // refresh collections
      }
    } catch (error) {
      console.error("Error updating collections:", error);
      toast.error("Error updating collections");
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
            placeholder="Search collections"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          {/* Publish many collections - Unpublish many collections */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-green-600 hover:text-green-700"
                disabled={selectedCollections.length === 0}
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
                disabled={selectedCollections.length === 0}
                onClick={() => handleTogglePublishMany("unpublish")}
              >
                <BookDashed />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-sm">
              Remove from Publish
            </TooltipContent>
          </Tooltip>

          {/* Publish many collections - un publish many collections */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-yellow-600 hover:text-yellow-700"
                disabled={selectedCollections.length === 0}
                onClick={() =>
                  handleToggleFeaturedMany(selectedCollections, "feature")
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
                disabled={selectedCollections.length === 0}
                onClick={() =>
                  handleToggleFeaturedMany(selectedCollections, "unfeature")
                }
              >
                <StarOff className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-sm">
              Remove from Featured
            </TooltipContent>
          </Tooltip>

          {/* Delete many collections */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-red-100 text-red-700 border-red-200 hover:bg-red-500 hover:text-white"
                disabled={selectedCollections.length === 0} // ✅ disables button if none selected
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
                  selected collections.
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
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    paginated.length > 0 &&
                    paginated.every((c) => selectedCollections.includes(c._id))
                  }
                  onCheckedChange={(checked) =>
                    handleSelectAll(Boolean(checked))
                  }
                />
              </TableHead>
              <TableHead className="font-semibold">NAME</TableHead>
              <TableHead className="font-semibold">DESCRIPTION</TableHead>
              <TableHead className="font-semibold">PRODUCTS</TableHead>
              <TableHead className="font-semibold">PUBLISHED</TableHead>
              <TableHead className="font-semibold">Featured</TableHead>
              <TableHead className="font-semibold">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.map((collection) => (
              <TableRow key={collection?._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCollections.includes(collection._id)}
                    onCheckedChange={(checked) =>
                      handleSelectCollection(collection?._id, Boolean(checked))
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Image
                          src={collection?.image || "/category-placeholder.png"}
                          alt={collection?.name}
                          width={32}
                          height={32}
                          className="rounded cursor-pointer hover:scale-105 transition-transform"
                        />
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl p-0 bg-transparent border-none shadow-none">
                        <Image
                          src={collection?.image || "/category-placeholder.png"}
                          alt={collection?.name}
                          width={800}
                          height={800}
                          className="rounded-lg mx-auto"
                        />
                      </DialogContent>
                    </Dialog>
                    <span className="font-medium">{collection?.name}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {collection?.description}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {collection?.products?.length}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={collection?.isPublished}
                    onCheckedChange={(value) =>
                      handleTogglePublish(collection?._id, value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={collection?.isFeatured}
                    onCheckedChange={(value) =>
                      handleToggleFeatured(collection?._id, value)
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
                      onClick={() => handleEdit(collection)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {/* Delete */}
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteOne(collection._id)}
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
                            delete
                            <span>&quot;{collection.name}&quot;</span>{" "}
                            collection .
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 text-white">
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
                  No collections found
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
