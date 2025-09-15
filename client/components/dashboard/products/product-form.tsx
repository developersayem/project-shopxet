/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, Tag, Star, Plus, Trash2 } from "lucide-react";
import { useProductForm } from "@/hooks/useProductForm";

interface Attribute {
  name: string;
  values: string[];
}

interface Variation {
  sku?: string;
  purchasePrice: string;
  regularPrice: string;
  salePrice: string;
  stock: string;
  attributes: { name: string; value: string }[];
}

interface ProductFormProps extends ReturnType<typeof useProductForm> {
  initialData?: {
    name?: string;
    description?: string;
    purchasePrice?: string;
    regularPrice?: string;
    salePrice?: string;
    stock?: string;
    category?: string;
    thumbnail?: string;
    gallery?: string[];
    tags?: string[];
    isFeatured?: boolean;
    hasVariants?: boolean;
    attributes?: Attribute[];
    variations?: Variation[];
  };
}

const categories = [
  { id: "64cat1", name: "Fresh Vegetables" },
  { id: "64cat2", name: "Fresh Fruits" },
  { id: "64cat3", name: "Skin Care" },
];

const attributeOptions: Record<string, string[]> = {
  Color: ["Red", "Blue", "Green", "Black", "White"],
  Size: ["S", "M", "L", "XL"],
  Material: ["Cotton", "Polyester", "Silk"],
};

export default function ProductForm({ initialData }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    purchasePrice: initialData?.purchasePrice || "",
    regularPrice: initialData?.regularPrice || "",
    salePrice: initialData?.salePrice || "",
    stock: initialData?.stock || "",
    category: initialData?.category || "",
  });

  const [thumbnail, setThumbnail] = useState<string | null>(
    initialData?.thumbnail || null
  );
  const [gallery, setGallery] = useState<string[]>(initialData?.gallery || []);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [isFeatured, setIsFeatured] = useState(
    initialData?.isFeatured || false
  );
  const [hasVariants, setHasVariants] = useState(
    initialData?.hasVariants || false
  );
  const [attributes, setAttributes] = useState<Attribute[]>(
    initialData?.attributes || []
  );
  const [variations, setVariations] = useState<Variation[]>(
    initialData?.variations || []
  );

  // ---------- Image Handlers ----------
  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setThumbnail(URL.createObjectURL(file));
  };
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImgs = Array.from(e.target.files).map((f) =>
        URL.createObjectURL(f)
      );
      setGallery([...gallery, ...newImgs]);
    }
  };

  // ---------- Tags ----------
  const addTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput("");
    }
  };
  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  // ---------- Attributes ----------
  const addAttribute = () =>
    setAttributes([...attributes, { name: "", values: [] }]);
  const updateAttributeName = (index: number, name: string) => {
    const updated = [...attributes];
    updated[index].name = name;
    updated[index].values = [];
    setAttributes(updated);
  };
  const addAttributeValue = (index: number, value: string) => {
    if (!value) return;
    const updated = [...attributes];
    if (!updated[index].values.includes(value))
      updated[index].values.push(value);
    setAttributes(updated);
  };
  const removeAttribute = (index: number) =>
    setAttributes(attributes.filter((_, idx) => idx !== index));

  // ---------- Variations ----------
  const generateVariations = () => {
    if (!attributes.length) return;

    const combine = (
      attrs: Attribute[],
      index = 0,
      current: { name: string; value: string }[] = []
    ): Array<{ attributes: { name: string; value: string }[] }> => {
      if (index === attrs.length) return [{ attributes: current }];
      const res: Array<{ attributes: { name: string; value: string }[] }> = [];
      for (const val of attrs[index].values) {
        res.push(
          ...combine(attrs, index + 1, [
            ...current,
            { name: attrs[index].name, value: val },
          ])
        );
      }
      return res;
    };

    const combos = combine(attributes);
    setVariations(
      combos.map((c) => ({
        sku: "",
        purchasePrice: "",
        regularPrice: "",
        salePrice: "",
        stock: "",
        attributes: c.attributes,
      }))
    );
  };

  const updateVariationField = (
    idx: number,
    field: keyof Omit<Variation, "attributes">,
    value: string
  ) => {
    const updated = [...variations];
    updated[idx][field] = value;
    setVariations(updated);
  };

  const deleteVariation = (idx: number) => {
    setVariations(variations.filter((_, i) => i !== idx));
  };

  // ---------- Submit ----------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      thumbnail,
      gallery,
      tags,
      isFeatured,
      hasVariants,
      attributes,
      variations,
    };
    console.log("Submitted product:", productData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* LEFT MAIN CONTENT */}
      <div className="space-y-3 lg:col-span-2">
        {/* Product Name */}
        <div className="bg-white dark:bg-accent p-5 rounded-xl shadow">
          <Label className="text-lg">Product Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-2"
            required
          />
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-accent p-5 rounded-xl shadow">
          <Label className="text-lg">Description</Label>
          <Textarea
            rows={6}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Write product description..."
            className="mt-2 min-h-56"
          />
        </div>

        {/* CATEGORY AND COLLECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Category */}
          <div className="bg-white dark:bg-accent p-5 rounded-xl shadow">
            <Label className="text-lg">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(val) =>
                setFormData({ ...formData, category: val })
              }
            >
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Collection */}
          <div className="bg-white dark:bg-accent p-5 rounded-xl shadow">
            <Label className="text-lg">Collection</Label>
            <Select
              value={formData.category}
              onValueChange={(val) =>
                setFormData({ ...formData, category: val })
              }
            >
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Pricing + Stock */}
        {!hasVariants && (
          <>
            <div className="bg-white dark:bg-accent p-5 rounded-xl shadow">
              <Label className="text-lg pb-1">Pricing</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  type="number"
                  placeholder="Purchase Price"
                  value={formData.purchasePrice}
                  onChange={(e) =>
                    setFormData({ ...formData, purchasePrice: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Regular Price"
                  value={formData.regularPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, regularPrice: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Sale Price"
                  value={formData.salePrice}
                  onChange={(e) =>
                    setFormData({ ...formData, salePrice: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="bg-white dark:bg-accent p-5 rounded-xl shadow">
              <Label className="text-lg">Stock</Label>
              <Input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
              />
            </div>
          </>
        )}

        {/* Variations Table */}
        {hasVariants && variations.length > 0 && (
          <div className="bg-white dark:bg-accent p-5 rounded-xl shadow space-y-3">
            <Label className="text-lg">Product Variations</Label>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border">
                <thead>
                  <tr>
                    <th className="p-2 border">SKU</th>
                    <th className="p-2 border">Purchase Price</th>
                    <th className="p-2 border">Regular Price</th>
                    <th className="p-2 border">Sale Price</th>
                    <th className="p-2 border">Stock</th>
                    <th className="p-2 border">Attributes</th>
                    <th className="p-2 border text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {variations.map((v, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2 border">
                        <Input
                          value={v.sku}
                          onChange={(e) =>
                            updateVariationField(idx, "sku", e.target.value)
                          }
                        />
                      </td>
                      <td className="p-2 border">
                        <Input
                          value={v.purchasePrice}
                          type="number"
                          onChange={(e) =>
                            updateVariationField(
                              idx,
                              "purchasePrice",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="p-2 border">
                        <Input
                          value={v.regularPrice}
                          type="number"
                          onChange={(e) =>
                            updateVariationField(
                              idx,
                              "regularPrice",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="p-2 border">
                        <Input
                          value={v.salePrice}
                          type="number"
                          onChange={(e) =>
                            updateVariationField(
                              idx,
                              "salePrice",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="p-2 border">
                        <Input
                          value={v.stock}
                          type="number"
                          onChange={(e) =>
                            updateVariationField(idx, "stock", e.target.value)
                          }
                        />
                      </td>
                      <td className="p-2 border">
                        {v.attributes
                          .map((a) => `${a.name}: ${a.value}`)
                          .join(", ")}
                      </td>
                      <td className="p-2 border text-center">
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteVariation(idx)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="space-y-3">
        {/* Images */}
        <div className="bg-white dark:bg-accent p-5 rounded-xl shadow space-y-4">
          <div className="flex items-center gap-4">
            {/* Thumbnail */}
            <div>
              <Label className="text-lg">Thumbnail</Label>
              <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition">
                {thumbnail ? (
                  <div className="relative">
                    <img
                      src={thumbnail}
                      alt="Thumbnail"
                      className="h-36 w-36 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setThumbnail(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Upload className="h-6 w-6 mb-2" />
                    <span className="text-sm">Click or drag</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
              </label>
            </div>
            {/* Gallery */}
            <div>
              <Label className="text-lg">Gallery</Label>
              <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <div className="flex flex-col items-center text-gray-500">
                  <Upload className="h-6 w-6 mb-2" />
                  <span className="text-sm">Click or drag images</span>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-3">
            {gallery.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={img}
                  alt={`Gallery ${i}`}
                  className="h-24 w-full object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() =>
                    setGallery(gallery.filter((_, idx) => idx !== i))
                  }
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Tags */}
        <div className="bg-white dark:bg-accent p-5 rounded-xl shadow">
          <Label className="text-lg">Tags</Label>
          <div className="flex gap-2 mt-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag())
              }
            />
            <Button type="button" onClick={addTag} variant="outline">
              <Tag className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {tags.map((t) => (
              <span
                key={t}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1"
              >
                {t}
                <button type="button" onClick={() => removeTag(t)}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
        {/* Featured */}
        <div className="bg-white dark:bg-accent p-5 rounded-xl shadow flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" /> Featured
          </span>
          <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
        </div>

        {/* Variants Toggle */}
        <div className="bg-white dark:bg-accent p-5 rounded-xl shadow flex items-center justify-between">
          <span className="flex items-center gap-2">Has Variants?</span>
          <Switch checked={hasVariants} onCheckedChange={setHasVariants} />
        </div>

        {/* Add Product Variants */}
        {hasVariants && (
          <div className="bg-white dark:bg-accent p-5 rounded-xl shadow space-y-4">
            <div className="flex justify-between">
              <Label>Attributes</Label>
              <Button type="button" onClick={addAttribute} variant="outline">
                <Plus className="h-4 w-4 mr-1" /> Add Attribute
              </Button>
            </div>
            {attributes.map((attr, idx) => (
              <div key={idx} className="flex justify-around items-center gap-2">
                <div className="w-full grid sm:grid-cols-2 gap-3">
                  <Select
                    value={attr.name}
                    onValueChange={(val) => updateAttributeName(idx, val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Attribute" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {Object.keys(attributeOptions).map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {attr.name && (
                    <Select
                      onValueChange={(val) => addAttributeValue(idx, val)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Value" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {attributeOptions[attr.name].map((val) => (
                          <SelectItem key={val} value={val}>
                            {val}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeAttribute(idx)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {attributes.length > 0 && (
              <Button
                type="button"
                onClick={generateVariations}
                className="mt-2 w-full"
              >
                Generate Variations
              </Button>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
