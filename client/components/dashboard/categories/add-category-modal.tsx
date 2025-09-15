/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ParentCategorySelect } from "./parent-category-selector";

// 🔥 Demo parent categories
const demoParents = [
  { _id: "66e1f1000000000000000001", name: "Clothing" },
  { _id: "66e1f1000000000000000002", name: "Electronics" },
];

export function AddCategoryModal() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    image: null as File | null,
    imagePreview: "",
    isFeatured: false,
    isPublished: true,
    parent: "", // store parent category id
  });

  const handleChange = (
    key: keyof typeof formData,
    value: string | boolean | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleChange("image", file);
      handleChange("imagePreview", URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert to FormData for API
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);
    data.append("isFeatured", String(formData.isFeatured));
    data.append("isPublished", String(formData.isPublished));
    if (formData.parent) data.append("parent", formData.parent);

    console.log("FormData ready:", Object.fromEntries(data.entries()));
    // 👉 API POST /api/categories with FormData

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Category</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-lg bg-accent"
        // Prevent dialog from closing when clicking outside
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Category Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Short description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:border-primary transition">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {formData.imagePreview ? (
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-md border"
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            {/* Parent Category */}
            <ParentCategorySelect
              options={demoParents} // your parent categories
              value={formData.parent}
              onChange={(val) => handleChange("parent", val)}
            />

            {/* Switches */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="isFeatured">Featured</Label>
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(val) => handleChange("isFeatured", val)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="isPublished">Published</Label>
                <Switch
                  id="isPublished"
                  checked={formData.isPublished}
                  onCheckedChange={(val) => handleChange("isPublished", val)}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
