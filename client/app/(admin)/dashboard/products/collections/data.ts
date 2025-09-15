import { ICollection } from "@/types/collection.type";

// Fake product IDs for demo
const ProductIds = {
  mens: [
    "77e1f2000000000000000001",
    "77e1f2000000000000000002",
    "77e1f2000000000000000003",
  ],
  womens: [
    "77e1f2000000000000000004",
    "77e1f2000000000000000005",
    "77e1f2000000000000000006",
  ],
  kids: [
    "77e1f2000000000000000007",
    "77e1f2000000000000000008",
  ],
  shoes: [
    "77e1f2000000000000000009",
    "77e1f200000000000000000a",
    "77e1f200000000000000000b",
  ],
  bags: [
    "77e1f200000000000000000c",
    "77e1f200000000000000000d",
  ],
};

const CollectionsDemoData: ICollection[] = [
  {
    _id: "66e1f1000000000000000001",
    name: "Men's Clothing",
    slug: "mens-clothing",
    description: "Trendy and comfortable apparel for men.",
    image: "",
    products: ProductIds.mens,
    isFeatured: true,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "66e1f1000000000000000002",
    name: "Women's Clothing",
    slug: "womens-clothing",
    description: "Fashionable wear for women of all styles.",
    image: "",
    products: ProductIds.womens,
    isFeatured: true,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "66e1f1000000000000000003",
    name: "Kids Clothing",
    slug: "kids-clothing",
    description: "Cute and durable clothes for kids.",
    image: "",
    products: ProductIds.kids,
    isFeatured: false,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "66e1f1000000000000000004",
    name: "Shoes",
    slug: "shoes",
    description: "Latest collections of shoes for all occasions.",
    image: "",
    products: ProductIds.shoes,
    isFeatured: true,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "66e1f1000000000000000005",
    name: "Bags & Accessories",
    slug: "bags-accessories",
    description: "Stylish bags, wallets, and fashion accessories.",
    image: "",
    products: ProductIds.bags,
    isFeatured: false,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default CollectionsDemoData;
