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

// Demo products
const demoProducts = [
  { _id: "prod1", name: "Rolex Daytona - Racing Chronograph" },
  { _id: "prod2", name: "Product 2" },
  { _id: "prod3", name: "Product 3" },
];

export function AddCollectionModal() {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (data: FormData) => {
    console.log("Create collection:", Object.fromEntries(data.entries()));
    // 👉 API POST /api/collections
    setOpen(false);
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
