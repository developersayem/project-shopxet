"use client";

import ProductForm from "@/components/dashboard/products/product-form";
import { useProductForm } from "@/hooks/useProductForm";

export default function AddProductPage() {
  const productForm = useProductForm();

  return (
    <div className="">
      <ProductForm {...productForm} />

      {/* Submit button outside the form */}
      {/* <div className="mt-6">
        <button
          onClick={productForm.submit} // <-- use the instance, not the hook itself
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Submit Product
        </button>
      </div> */}
    </div>
  );
}
