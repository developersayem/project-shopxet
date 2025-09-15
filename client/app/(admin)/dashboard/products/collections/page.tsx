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
import CollectionsDemoData from "./data";
import { ICollection } from "@/types/collection.type";
import { CollectionsTable } from "@/components/dashboard/collections/collection-table";
import { EditCollectionModal } from "@/components/dashboard/collections/edit-collection-modal";

const CollectionsPages = () => {
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [openImport, setOpenImport] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingCollection, setEditingCollection] =
    useState<ICollection | null>(null);

  // function to handle export
  const handleExport = (format: "csv" | "json") => {
    if (format === "json") {
      const dataStr = JSON.stringify(CollectionsDemoData, null, 2);
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
        ...CollectionsDemoData.map((p) =>
          [
            p._id,
            `"${p.name}"`,
            p.image,
            p.products,
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
          const importedProducts = JSON.parse(content) as ICollection[];
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
      setSelectedCollections(CollectionsDemoData?.map((p) => p._id) || []);
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

  // Handle Edit Collection
  const handleEditCollection = (collection: ICollection) => {
    setEditingCollection(collection);
    setEditOpen(true);
  };

  const handleDeleteCollection = (categoryId: string) => {
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

          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                variant="outline"
                size="sm"
                className="bg-red-100 text-red-700 border-red-200 hover:bg-red-500 hover:text-white"
                disabled={selectedCollections.length === 0}
                onClick={() => {
                  selectedCollections.forEach((id) =>
                    handleDeleteCollection(id)
                  );
                }}
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
                <AlertDialogAction className="bg-red-600 text-white">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/* Add Collection modal */}
          <AddCollectionModal />
        </div>
      </div>

      {/* Products Table */}

      <CollectionsTable
        collections={CollectionsDemoData}
        selectedCollections={selectedCollections}
        onSelectAll={handleSelectAll}
        onSelectCollection={handleSelectCollection}
        onEditCollection={handleEditCollection}
        onDeleteCollection={handleDeleteCollection}
      />
      {/* Edit Modal */}
      <EditCollectionModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        collection={editingCollection}
      />
    </div>
  );
};

export default CollectionsPages;
