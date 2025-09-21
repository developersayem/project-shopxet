export interface IProductAttribute {
  name: string;   // e.g. "Color"
  value: string;  // e.g. "Red"
}

export interface IProductVariation {
  _id?: string;
  sku?: string;
  price: number;
  stock: number;
  attributes: IProductAttribute[];
  images?: string[];
}

export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  
  purchasePrice: number;
  regularPrice: number;
  salePrice?: number;
  
  category: {
    _id: string;
    name: string;
  };
  
  brand?: {
    _id: string;
    name: string;
  };
  
  tags?: string[];
  
  thumbnail: string;   // main product image
  gallery: string[];   // product gallery images
  
  stock: number;
  sold: number;
  
  attributes?: IProductAttribute[];
  variations?: IProductVariation[];
  
  isFeatured: boolean;
  ratings:number;
  createdAt: string;
  updatedAt: string;
}
