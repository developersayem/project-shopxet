"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { X, Folder } from "lucide-react";

interface BulkActionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  onBulkUpdate: (updates: BulkUpdateData) => void;
}

interface BulkUpdateData {
  category?: string;
  defaultCategory?: string;
  published?: boolean;
  tags?: string[];
}

export function BulkActionDrawer({
  isOpen,
  onClose,
  selectedCount,
  onBulkUpdate,
}: BulkActionDrawerProps) {
  const [category, setCategory] = useState("");
  const [defaultCategory, setDefaultCategory] = useState("");
  const [published, setPublished] = useState(true);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleBulkUpdate = () => {
    const updates: BulkUpdateData = {
      category: category || undefined,
      defaultCategory: defaultCategory || undefined,
      published,
      tags: tags.length > 0 ? tags : undefined,
    };
    onBulkUpdate(updates);
    onClose();
  };

  const handleCancel = () => {
    // Reset form
    setCategory("");
    setDefaultCategory("");
    setPublished(true);
    setTags([]);
    setTagInput("");
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[400px] sm:w-[540px]">
        <SheetHeader className="space-y-2 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-xl font-semibold">
                Update Selected Products
              </SheetTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Apply changes to the selected Products from the list
              </p>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Categories Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Categories</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fresh-vegetable">Fresh Vegetable</SelectItem>
                <SelectItem value="fresh-fruits">Fresh Fruits</SelectItem>
                <SelectItem value="skin-care">Skin Care</SelectItem>
                <SelectItem value="home">Home</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Folder className="h-4 w-4 text-yellow-600" />
              <span>Home</span>
            </div>
          </div>

          {/* Default Category Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Default Category</label>
            <Select value={defaultCategory} onValueChange={setDefaultCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Default Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fresh-vegetable">Fresh Vegetable</SelectItem>
                <SelectItem value="fresh-fruits">Fresh Fruits</SelectItem>
                <SelectItem value="skin-care">Skin Care</SelectItem>
                <SelectItem value="home">Home</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Published Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Published</label>
            <div className="flex items-center gap-3">
              <Switch
                checked={published}
                onCheckedChange={setPublished}
                className="data-[state=checked]:bg-green-600"
              />
              <span className="text-sm font-medium text-green-600">
                {published ? "Yes" : "No"}
              </span>
            </div>
          </div>

          {/* Product Tags Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Product Tags</label>
            <Input
              placeholder="Product Tag (Write then press enter to add new tag )"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="bg-gray-50"
            />

            {/* Display added tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-blue-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleBulkUpdate}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Bulk Update Products
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
