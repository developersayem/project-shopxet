"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryForm } from "./category-form";
import { toast } from "sonner";
import { KeyedMutator } from "swr";
import api from "@/lib/axios";
import { ICategory } from "@/types/category.type";

interface EditCategoryModalProps {
  open: boolean;
  onClose: () => void;
  category: ICategory | null;
  categories: ICategory[];
  mutateCategoriesData: KeyedMutator<{ data: ICategory[] }>;
}

export function EditCategoryModal({
  open,
  onClose,
  category,
  categories,
  mutateCategoriesData,
}: EditCategoryModalProps) {
  const handleSubmit = async (data: FormData) => {
    try {
      const res = await api.put(`/categories/${category?._id}`, data);
      if (res.status === 200) {
        toast.success("Category updated successfully");
        await mutateCategoriesData(); // refresh categories
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error updating category");
    }
    onClose();
  };

  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-lg bg-accent"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <CategoryForm
          initialData={category}
          parentOptions={categories.map((category) => ({
            _id: category._id,
            name: category.name,
          }))}
          onSubmit={handleSubmit}
          submitLabel="Update"
        />
      </DialogContent>
    </Dialog>
  );
}
