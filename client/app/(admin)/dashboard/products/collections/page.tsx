"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Download, FileText, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { AddCollectionModal } from "@/components/dashboard/collections/add-collection-model";
import { ICollection } from "@/types/collection.type";
import { CollectionsTable } from "@/components/dashboard/collections/collection-table";
import { EditCollectionModal } from "@/components/dashboard/collections/edit-collection-modal";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import LoadingCom from "@/components/shared/loading-com";
import api from "@/lib/axios";
import { toast } from "sonner";

const CollectionsPages = () => {
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [openImport, setOpenImport] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingCollection, setEditingCollection] =
    useState<ICollection | null>(null);

  // fetch all collection data
  const {
    data: collectionsRes,
    isLoading: isCollectionLoading,
    mutate: mutateCollectionsData,
  } = useSWR<{ data: ICollection[] }>("/collections", fetcher);

  const collectionsData = collectionsRes?.data || [];

  // function to handle export collections
  const handleExport = (format: "csv" | "json") => {
    // timestamp for file name
    // helper function to format date like 09_16_2025 that
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    if (format === "json") {
      const dataStr = JSON.stringify(collectionsData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `collections-${formattedDate}.json`;
      link.click();
    } else if (format === "csv") {
      const headers = [
        "_id",
        "Name",
        "Slug",
        "Description",
        "Products",
        "Featured",
        "Published",
        "Image",
        "Created At",
        "Updated At",
      ];

      const csvContent = [
        headers.join(","),

        ...collectionsData.map((p: ICollection) =>
          [
            p._id,
            `"${p.name}"`,
            `"${p.slug}"`,
            `"${p.description || ""}"`,
            `"${(p.products || []).join("|")}"`, // join array with |
            p.isFeatured,
            p.isPublished,
            `"${p.image || ""}"`,
            p.createdAt,
            p.updatedAt,
          ].join(",")
        ),
      ].join("\n");

      const dataBlob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `collections-${formattedDate}.csv`;
      link.click();
    }
  };

  // main handler to upload file
  const onImport = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/collections/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        toast.success(res.data.message || "Collections imported successfully");
        await mutateCollectionsData(); // refresh list after import
      }
    } catch (error: unknown) {
      console.error("Import error:", error);
      const msg =
        (error as { response?: { data?: { message: string } } }).response?.data
          ?.message || "Failed to import collections";
      toast.error(msg);
    }
  };

  // input change handler
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImport(file);
    e.target.value = ""; // reset file input for re-upload
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCollections(collectionsData?.map((p) => p._id) || []);
    } else {
      setSelectedCollections([]);
    }
  };

  const handleSelectCollection = (collectionId: string, checked: boolean) => {
    if (checked) {
      setSelectedCollections([...selectedCollections, collectionId]);
    } else {
      setSelectedCollections(
        selectedCollections.filter((id) => id !== collectionId)
      );
    }
  };

  // Handle open edit Collection modal
  const handleEditCollection = (collection: ICollection) => {
    setEditingCollection(collection);
    setEditOpen(true);
  };

  // function to handle delete one or many collections
  const handleDelete = async (
    collectionId: string,
    methods?: "one" | "many"
  ) => {
    try {
      if (methods === "one") {
        const res = await api.delete(`/collections/${collectionId}`);
        if (res.status === 200) {
          toast.success("Collection deleted successfully");
          await mutateCollectionsData(); // refresh collections
        }
      } else if (methods === "many") {
        const selected = collectionsData.filter((p) =>
          selectedCollections.includes(p._id)
        );
        const ids = selected.map((p: ICollection) => p._id);
        const res = await api.post(`/collections/bulk-delete`, {
          ids: ids,
        });
        if (res.status === 200) {
          toast.success("Collection deleted successfully");
          await mutateCollectionsData(); // refresh collections
        }
      }
    } catch (error) {
      console.error("Error deleting collection:", error);
      toast.error("Error deleting collection");
      // Handle error
    }
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

          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                variant="outline"
                size="sm"
                className="bg-red-100 text-red-700 border-red-200 hover:bg-red-500 hover:text-white"
                disabled={selectedCollections.length === 0}
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
                  selected collection .
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 text-white"
                  onClick={() => {
                    selectedCollections.forEach((id) =>
                      handleDelete(id, "many")
                    );
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/* Add Collection modal */}
          <AddCollectionModal mutateCollectionsData={mutateCollectionsData} />
        </div>
      </div>

      {/* Products Table */}

      {isCollectionLoading ? (
        <div>
          <LoadingCom displayText="Loading" />
        </div>
      ) : (
        <CollectionsTable
          collections={collectionsData}
          selectedCollections={selectedCollections}
          onSelectAll={handleSelectAll}
          onSelectCollection={handleSelectCollection}
          onEditCollection={handleEditCollection}
          onDeleteCollection={handleDelete}
          mutateCollectionsData={mutateCollectionsData}
        />
      )}
      {/* Edit Modal */}
      <EditCollectionModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        collection={editingCollection}
        mutateCollectionsData={mutateCollectionsData}
      />
    </div>
  );
};

export default CollectionsPages;
