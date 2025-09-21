import { IProduct } from "@/types/product.type"

export const products: IProduct[] =  [
  {
    "_id": "p1",
    "name": "Nike Air Max 270",
    "description": "Breathable mesh sneakers with max air cushioning.",
    "purchasePrice": 90,
    "regularPrice": 140,
    "salePrice": 120,
    "category": { "_id": "c1", "name": "Shoes" },
    "brand": { "_id": "b1", "name": "Nike" },
    "tags": ["sneakers", "men", "running"],
    "thumbnail": "https://images.unsplash.com/photo-1600180758895-45cf1f2a4c8f",
    "gallery": [
      "https://images.unsplash.com/photo-1606813908985-cb9e86f73aa2",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    ],
    "stock": 50,
    "attributes": [{ "name": "Color", "value": "Black" }, { "name": "Size", "value": "42" }],
    "variations": [
      {
        "_id": "v1",
        "sku": "NA270-BLK-42",
        "price": 140,
        "stock": 20,
        "attributes": [{ "name": "Color", "value": "Black" }, { "name": "Size", "value": "42" }],
        "images": ["https://images.unsplash.com/photo-1542291026-7eec264c27ff"]
      }
    ],
    "isFeatured": true,
    "createdAt": "2025-09-01T10:00:00Z",
    "updatedAt": "2025-09-10T12:00:00Z"
  },
  {
    "_id": "p2",
    "name": "Adidas Ultraboost 22",
    "description": "High-performance running shoes with responsive cushioning.",
    "purchasePrice": 100,
    "regularPrice": 160,
    "salePrice": 150,
    "category": { "_id": "c1", "name": "Shoes" },
    "brand": { "_id": "b2", "name": "Adidas" },
    "tags": ["sneakers", "running", "sport"],
    "thumbnail": "https://images.unsplash.com/photo-1584735174313-7e0f66f9a7d1",
    "gallery": [
      "https://images.unsplash.com/photo-1595950653175-9a5b0e1c5bb3",
      "https://images.unsplash.com/photo-1595950653275-28b1f1b2f8f4"
    ],
    "stock": 35,
    "attributes": [{ "name": "Color", "value": "White" }, { "name": "Size", "value": "43" }],
    "variations": [],
    "isFeatured": true,
    "createdAt": "2025-08-20T08:30:00Z",
    "updatedAt": "2025-09-05T09:00:00Z"
  },
  {
    "_id": "p3",
    "name": "Apple iPhone 15 Pro",
    "description": "Latest iPhone with A17 Bionic chip and titanium body.",
    "purchasePrice": 900,
    "regularPrice": 1200,
    "salePrice": 1150,
    "category": { "_id": "c2", "name": "Smartphones" },
    "brand": { "_id": "b3", "name": "Apple" },
    "tags": ["smartphone", "ios", "apple"],
    "thumbnail": "https://images.unsplash.com/photo-1695040045467-6d4cb112a1ce",
    "gallery": [
      "https://images.unsplash.com/photo-1695748357224-42d8f1adcb2a",
      "https://images.unsplash.com/photo-1695748362122-0d77e7b92ce7"
    ],
    "stock": 100,
    "attributes": [{ "name": "Color", "value": "Titanium" }, { "name": "Storage", "value": "256GB" }],
    "variations": [],
    "isFeatured": true,
    "createdAt": "2025-09-05T15:00:00Z",
    "updatedAt": "2025-09-18T15:00:00Z"
  },
  {
    "_id": "p4",
    "name": "Samsung Galaxy S24 Ultra",
    "description": "Flagship Android phone with 200MP camera and S Pen.",
    "purchasePrice": 850,
    "regularPrice": 1150,
    "salePrice": 1100,
    "category": { "_id": "c2", "name": "Smartphones" },
    "brand": { "_id": "b4", "name": "Samsung" },
    "tags": ["android", "samsung", "flagship"],
    "thumbnail": "https://images.unsplash.com/photo-1610722122583-08f6f52c16e7",
    "gallery": [
      "https://images.unsplash.com/photo-1610722122458-54a58c41d1e5",
      "https://images.unsplash.com/photo-1610722122685-fdff7f1f8ec2"
    ],
    "stock": 90,
    "attributes": [{ "name": "Color", "value": "Gray" }, { "name": "Storage", "value": "512GB" }],
    "variations": [],
    "isFeatured": true,
    "createdAt": "2025-08-28T11:00:00Z",
    "updatedAt": "2025-09-10T11:00:00Z"
  },
  {
    "_id": "p5",
    "name": "Sony WH-1000XM5",
    "description": "Industry-leading noise-cancelling wireless headphones.",
    "purchasePrice": 250,
    "regularPrice": 400,
    "salePrice": 380,
    "category": { "_id": "c3", "name": "Headphones" },
    "brand": { "_id": "b5", "name": "Sony" },
    "tags": ["headphones", "wireless", "noise-cancelling"],
    "thumbnail": "https://images.unsplash.com/photo-1587138318056-89e59f7d94a3",
    "gallery": [
      "https://images.unsplash.com/photo-1587138317990-61a2f508d57f",
      "https://images.unsplash.com/photo-1587138318123-2e672ff7e94d"
    ],
    "stock": 60,
    "attributes": [{ "name": "Color", "value": "Black" }],
    "variations": [],
    "isFeatured": false,
    "createdAt": "2025-09-01T09:30:00Z",
    "updatedAt": "2025-09-12T09:30:00Z"
  },
  {
    "_id": "p6",
    "name": "Dell XPS 15",
    "description": "Premium laptop with 4K OLED display and Intel i9 processor.",
    "purchasePrice": 1400,
    "regularPrice": 2000,
    "salePrice": 1899,
    "category": { "_id": "c4", "name": "Laptops" },
    "brand": { "_id": "b6", "name": "Dell" },
    "tags": ["laptop", "windows", "dell"],
    "thumbnail": "https://images.unsplash.com/photo-1587202372775-989c8e02176c",
    "gallery": [
      "https://images.unsplash.com/photo-1587202372442-b85a918a2dd5",
      "https://images.unsplash.com/photo-1587202372738-5a3d1d5df2e5"
    ],
    "stock": 40,
    "attributes": [{ "name": "Color", "value": "Silver" }, { "name": "RAM", "value": "32GB" }],
    "variations": [],
    "isFeatured": true,
    "createdAt": "2025-08-15T10:00:00Z",
    "updatedAt": "2025-09-05T10:00:00Z"
  },
  {
    "_id": "p7",
    "name": "MacBook Air M3",
    "description": "Lightweight Apple laptop with M3 chip and Retina display.",
    "purchasePrice": 1000,
    "regularPrice": 1400,
    "salePrice": 1350,
    "category": { "_id": "c4", "name": "Laptops" },
    "brand": { "_id": "b3", "name": "Apple" },
    "tags": ["macbook", "apple", "laptop"],
    "thumbnail": "https://images.unsplash.com/photo-1593642533144-3d62f04b25d2",
    "gallery": [
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5",
      "https://images.unsplash.com/photo-1593642532973-d31b6557fa68"
    ],
    "stock": 70,
    "attributes": [{ "name": "Color", "value": "Space Gray" }, { "name": "RAM", "value": "16GB" }],
    "variations": [],
    "isFeatured": true,
    "createdAt": "2025-09-02T11:00:00Z",
    "updatedAt": "2025-09-15T11:00:00Z"
  }
  // ... (continue up to p20 with similar structure for TVs, Cameras, Smartwatches, Furniture, etc.)
]
