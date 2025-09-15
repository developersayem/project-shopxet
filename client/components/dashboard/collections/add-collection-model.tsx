"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CollectionForm } from "./collection-form";
import api from "@/lib/axios";
import { toast } from "sonner";
import { KeyedMutator } from "swr";
import { ICollection } from "@/types/collection.type";
import { IProduct } from "@/types/product.type";

// Demo products
const demoProducts = [
  { _id: "prod1", name: "Rolex Daytona - Racing Chronograph" },
  { _id: "prod2", name: "Product 2" },
  { _id: "prod3", name: "Product 3" },
];

interface AddCollectionModalProps {
  products?: IProduct[];
  mutateCollectionsData: KeyedMutator<{ data: ICollection[] }>;
}

export function AddCollectionModal({
  // products,
  mutateCollectionsData,
}: AddCollectionModalProps) {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (data: FormData) => {
    try {
      const res = await api.post("/collections", data);
      if (res.status === 201) {
        toast.success("Collection created successfully");
        setOpen(false); // close modal
        await mutateCollectionsData(); // refresh collections
      }
    } catch (error: unknown) {
      console.error("Error creating collection:", error);

      // If backend sends a structured error
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Collection</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-lg bg-accent"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add New Collection</DialogTitle>
        </DialogHeader>
        <CollectionForm
          productsOptions={demoProducts}
          onSubmit={handleSubmit}
          submitLabel="Create"
        />
      </DialogContent>
    </Dialog>
  );
}
