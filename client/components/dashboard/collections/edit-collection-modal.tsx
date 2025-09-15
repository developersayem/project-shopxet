"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CollectionForm } from "./collection-form";
import { ICollection } from "@/types/collection.type";

// Demo products
const demoProducts = [
  { _id: "prod1", name: "Rolex Daytona - Racing Chronograph" },
  { _id: "prod2", name: "Product 2" },
  { _id: "prod3", name: "Product 3" },
];

interface EditCollectionModalProps {
  open: boolean;
  onClose: () => void;
  collection: ICollection | null;
}

export function EditCollectionModal({
  open,
  onClose,
  collection,
}: EditCollectionModalProps) {
  const handleSubmit = (data: FormData) => {
    console.log("Update collection:", Object.fromEntries(data.entries()));
    // 👉 API PUT /api/collections/:id
    onClose();
  };

  if (!collection) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-lg bg-accent"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit Collection</DialogTitle>
        </DialogHeader>
        <CollectionForm
          initialData={collection}
          productsOptions={demoProducts}
          onSubmit={handleSubmit}
          submitLabel="Update"
        />
      </DialogContent>
    </Dialog>
  );
}
