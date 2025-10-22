/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ParentCategorySelector } from "./parent-category-selector";
import { ICategory } from "@/types/category.type";

interface ICategoryFormProps {
  initialData?: Partial<ICategory>;
  parentOptions: { _id: string; name: string }[];
  onSubmit: (data: FormData) => void;
  submitLabel?: string;
}

export function CategoryForm({
  initialData = {},
  parentOptions,
  onSubmit,
  submitLabel = "Save",
}: ICategoryFormProps) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = React.useState({
    name: initialData.name || "",
    description: initialData.description || "",
    image: null as File | null,
    imagePreview: initialData.image || "",
    isFeatured: initialData.isFeatured || false,
    isPublished: initialData.isPublished ?? true,
    parent: initialData.parent?._id || "",
  });

  const handleChange = (
    key: keyof typeof formData,
    value: string | boolean | File | string[]
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

  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);
    data.append("isFeatured", String(formData.isFeatured));
    data.append("isPublished", String(formData.isPublished));
    if (formData.parent && typeof formData.parent === "string") {
      data.append("parent", formData.parent);
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Image Upload */}
      <div className="space-y-2">
        <Label>Image</Label>
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:border-primary transition"
          onClick={handleDropzoneClick} // ✅ clicking anywhere triggers file input
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
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

      {/* Products Multi-select */}
      <Label>Parent Category (optional)</Label>
      <ParentCategorySelector
        options={parentOptions}
        value={formData.parent}
        onChange={(val) => handleChange("parent", val)}
      />

      {/* Featured & Published Switch */}
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

      {/* Submit */}
      <div className="flex justify-end">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
