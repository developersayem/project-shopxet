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
import { toast } from "sonner";
import { KeyedMutator } from "swr";
import api from "@/lib/axios";

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
  mutateCollectionsData: KeyedMutator<{ data: ICollection[] }>;
}

export function EditCollectionModal({
  open,
  onClose,
  collection,
  mutateCollectionsData,
}: EditCollectionModalProps) {
  const handleSubmit = async (data: FormData) => {
    try {
      const res = await api.put(`/collections/${collection?._id}`, data);
      if (res.status === 200) {
        toast.success("Collection updated successfully");
        await mutateCollectionsData(); // refresh collections
      }
    } catch (error) {
      console.error("Error updating collection:", error);
      toast.error("Error updating collection");
    }
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
