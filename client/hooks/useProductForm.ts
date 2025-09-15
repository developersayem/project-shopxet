import { useState } from "react";
import { IProduct, IProductAttribute, IProductVariation } from "@/types/product.type";

interface ProductFormState {
  formData: Partial<IProduct>; // Use Partial because some fields may be empty initially
  thumbnail: string | null;
  gallery: string[];
  tags: string[];
  isFeatured: boolean;
  hasVariants: boolean;
  attributes: IProductAttribute[];
  variations: IProductVariation[];
}

export function useProductForm(initialData?: Partial<IProduct>) {
  const [formData, setFormData] = useState<Partial<IProduct>>(initialData || {});
  const [thumbnail, setThumbnail] = useState<string | null>(initialData?.thumbnail || null);
  const [gallery, setGallery] = useState<string[]>(initialData?.gallery || []);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  const [hasVariants, setHasVariants] = useState(false); // default false
  const [attributes, setAttributes] = useState<IProductAttribute[]>(initialData?.attributes || []);
  const [variations, setVariations] = useState<IProductVariation[]>(initialData?.variations || []);

  const submit = () => {
    console.log({
      ...formData,
      thumbnail,
      gallery,
      tags,
      isFeatured,
      hasVariants,
      attributes,
      variations,
    });
  };

  return {
    formData,
    setFormData,
    thumbnail,
    setThumbnail,
    gallery,
    setGallery,
    tags,
    setTags,
    isFeatured,
    setIsFeatured,
    hasVariants,
    setHasVariants,
    attributes,
    setAttributes,
    variations,
    setVariations,
    submit,
  } as ProductFormState & { submit: () => void };
}
