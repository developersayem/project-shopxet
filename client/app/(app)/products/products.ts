import { IProduct } from "@/types/product.type";

export const products: IProduct[] = [
  {
    _id: "p1",
    name: "Nike Air Max 270",
    description: "Breathable mesh sneakers with max air cushioning.",
    purchasePrice: 90,
    regularPrice: 140,
    salePrice: 120,
    category: { _id: "c1", name: "Shoes" },
    brand: { _id: "b1", name: "Nike" },
    tags: ["sneakers", "men", "running"],
    thumbnail: "https://images.unsplash.com/photo-1600180758895-45cf1f2a4c8f?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606813908985-cb9e86f73aa2?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 50,
    sold: 12,
    attributes: [
      { name: "Color", value: "Black" },
      { name: "Size", value: "42" }
    ],
    variations: [
      {
        _id: "v1",
        sku: "NA270-BLK-42",
        price: 120,
        stock: 20,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "42" }
        ],
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80"
        ]
      }
    ],
    isFeatured: true,
    ratings: 4.5,
    createdAt: "2025-09-01T10:00:00Z",
    updatedAt: "2025-09-10T12:00:00Z"
  },
  {
    _id: "p2",
    name: "Adidas Ultraboost 22",
    description: "High-performance running shoes with responsive cushioning.",
    purchasePrice: 100,
    regularPrice: 160,
    salePrice: 150,
    category: { _id: "c1", name: "Shoes" },
    brand: { _id: "b2", name: "Adidas" },
    tags: ["sneakers", "running", "sport"],
    thumbnail: "https://images.unsplash.com/photo-1584735174313-7e0f66f9a7d1?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595950653175-9a5b0e1c5bb3?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1595950653275-28b1f1b2f8f4?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 35,
    sold: 5,
    attributes: [
      { name: "Color", value: "White" },
      { name: "Size", value: "43" }
    ],
    variations: [],
    isFeatured: true,
    ratings: 4.2,
    createdAt: "2025-08-20T08:30:00Z",
    updatedAt: "2025-09-05T09:00:00Z"
  },
  {
    _id: "p3",
    name: "Apple iPhone 15 Pro",
    description: "Latest iPhone with A17 Bionic chip and titanium body.",
    purchasePrice: 900,
    regularPrice: 1200,
    salePrice: 1150,
    category: { _id: "c2", name: "Smartphones" },
    brand: { _id: "b3", name: "Apple" },
    tags: ["smartphone", "ios", "apple"],
    thumbnail: "https://images.unsplash.com/photo-1695040045467-6d4cb112a1ce?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1695748357224-42d8f1adcb2a?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1695748362122-0d77e7b92ce7?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 100,
    sold: 40,
    attributes: [
      { name: "Color", value: "Titanium" },
      { name: "Storage", value: "256GB" }
    ],
    variations: [],
    isFeatured: true,
    ratings: 4.8,
    createdAt: "2025-09-05T15:00:00Z",
    updatedAt: "2025-09-18T15:00:00Z"
  },
  {
    _id: "p4",
    name: "Samsung Galaxy S24 Ultra",
    description: "Flagship Android phone with 200MP camera and S Pen.",
    purchasePrice: 850,
    regularPrice: 1150,
    salePrice: 1100,
    category: { _id: "c2", name: "Smartphones" },
    brand: { _id: "b4", name: "Samsung" },
    tags: ["android", "samsung", "flagship"],
    thumbnail: "https://images.unsplash.com/photo-1610722122583-08f6f52c16e7?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610722122458-54a58c41d1e5?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1610722122685-fdff7f1f8ec2?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 90,
    sold: 25,
    attributes: [
      { name: "Color", value: "Gray" },
      { name: "Storage", value: "512GB" }
    ],
    variations: [],
    isFeatured: true,
    ratings: 4.7,
    createdAt: "2025-08-28T11:00:00Z",
    updatedAt: "2025-09-10T11:00:00Z"
  },
  {
    _id: "p5",
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise-cancelling wireless headphones.",
    purchasePrice: 250,
    regularPrice: 400,
    salePrice: 380,
    category: { _id: "c3", name: "Headphones" },
    brand: { _id: "b5", name: "Sony" },
    tags: ["headphones", "wireless", "noise-cancelling"],
    thumbnail: "https://images.unsplash.com/photo-1587138318056-89e59f7d94a3?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587138317990-61a2f508d57f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1587138318123-2e672ff7e94d?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 60,
    sold: 15,
    attributes: [
      { name: "Color", value: "Black" }
    ],
    variations: [],
    isFeatured: false,
    ratings: 4.4,
    createdAt: "2025-09-01T09:30:00Z",
    updatedAt: "2025-09-12T09:30:00Z"
  },
  {
    _id: "p6",
    name: "Dell XPS 15 OLED",
    description: "Premium laptop with 4K OLED display and Intel i9 processor.",
    purchasePrice: 1400,
    regularPrice: 2000,
    salePrice: 1899,
    category: { _id: "c4", name: "Laptops" },
    brand: { _id: "b6", name: "Dell" },
    tags: ["laptop", "windows", "dell"],
    thumbnail: "https://images.unsplash.com/photo-1587202372775-989c8e02176c?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587202372442-b85a918a2dd5?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1587202372738-5a3d1d5df2e5?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 40,
    sold: 8,
    attributes: [
      { name: "Color", value: "Silver" },
      { name: "RAM", value: "32GB" }
    ],
    variations: [],
    isFeatured: true,
    ratings: 4.6,
    createdAt: "2025-08-15T10:00:00Z",
    updatedAt: "2025-09-05T10:00:00Z"
  },
  {
    _id: "p7",
    name: "MacBook Air M3 13\"",
    description: "Lightweight Apple laptop with M3 chip and Retina display.",
    purchasePrice: 1000,
    regularPrice: 1400,
    salePrice: 1350,
    category: { _id: "c4", name: "Laptops" },
    brand: { _id: "b3", name: "Apple" },
    tags: ["macbook", "apple", "laptop"],
    thumbnail: "https://images.unsplash.com/photo-1593642533144-3d62f04b25d2?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 70,
    sold: 20,
    attributes: [
      { name: "Color", value: "Space Gray" },
      { name: "RAM", value: "16GB" }
    ],
    variations: [],
    isFeatured: true,
    ratings: 4.9,
    createdAt: "2025-09-02T11:00:00Z",
    updatedAt: "2025-09-15T11:00:00Z"
  },
  {
    _id: "p8",
    name: "Canon EOS R5 Camera",
    description: "45MP full-frame mirrorless camera with 8K video.",
    purchasePrice: 3200,
    regularPrice: 3900,
    salePrice: 3750,
    category: { _id: "c5", name: "Cameras" },
    brand: { _id: "b7", name: "Canon" },
    tags: ["camera", "photography", "mirrorless"],
    thumbnail: "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600172456927-5c9e0e61dc92?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1615030711674-51dbd1d7f191?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 25,
    sold: 3,
    attributes: [
      { name: "Color", value: "Black" }
    ],
    variations: [],
    isFeatured: false,
    ratings: 4.7,
    createdAt: "2025-07-15T14:00:00Z",
    updatedAt: "2025-08-20T14:00:00Z"
  },
  {
    _id: "p9",
    name: "Sony Alpha A7 IV",
    description: "Versatile full-frame mirrorless with 33MP resolution.",
    purchasePrice: 2500,
    regularPrice: 3000,
    salePrice: 2800,
    category: { _id: "c5", name: "Cameras" },
    brand: { _id: "b8", name: "Sony" },
    tags: ["camera", "mirrorless", "4k"],
    thumbnail: "https://images.unsplash.com/photo-1579547621706-a4a04a9aaf4b?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1593642632823-8e018f8b9f1d?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1593642632955-7f2cc6f15864?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 15,
    sold: 2,
    attributes: [
      { name: "Color", value: "Black" }
    ],
    variations: [],
    isFeatured: false,
    ratings: 4.5,
    createdAt: "2025-06-10T10:30:00Z",
    updatedAt: "2025-07-05T10:30:00Z"
  },
  {
    _id: "p10",
    name: "Bose QuietComfort Earbuds",
    description: "Noise-canceling earbuds with excellent fit and audio quality.",
    purchasePrice: 200,
    regularPrice: 300,
    salePrice: 280,
    category: { _id: "c3", name: "Headphones" },
    brand: { _id: "b9", name: "Bose" },
    tags: ["earbuds", "wireless", "noise cancelling"],
    thumbnail: "https://images.unsplash.com/photo-1617049117208-3c251d9f71fd?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617049117031-8e2a8b1d9447?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1617049117374-24b0600bb9bd?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 80,
    sold: 30,
    attributes: [
      { name: "Color", value: "White" }
    ],
    variations: [],
    isFeatured: false,
    ratings: 4.3,
    createdAt: "2025-09-04T08:00:00Z",
    updatedAt: "2025-09-12T08:30:00Z"
  },
  {
    _id: "p11",
    name: "Apple Watch Series 9",
    description: "Latest smartwatch with cellular and health tracking features.",
    purchasePrice: 399,
    regularPrice: 499,
    salePrice: 479,
    category: { _id: "c6", name: "Wearables" },
    brand: { _id: "b3", name: "Apple" },
    tags: ["smartwatch", "apple", "wearable"],
    thumbnail: "https://images.unsplash.com/photo-1603791440384-56cd371ee9b?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603791423685-898f24f1905f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1603791406555-4c7f202f74a4?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 100,
    sold: 25,
    attributes: [
      { name: "Color", value: "Silver" },
      { name: "Band", value: "Sport" }
    ],
    variations: [],
    isFeatured: true,
    ratings: 4.8,
    createdAt: "2025-08-30T12:00:00Z",
    updatedAt: "2025-09-10T12:00:00Z"
  },
  {
    _id: "p12",
    name: "Google Pixel 8 Pro",
    description: "Flagship Android phone with excellent camera performance.",
    purchasePrice: 799,
    regularPrice: 1099,
    salePrice: 1049,
    category: { _id: "c2", name: "Smartphones" },
    brand: { _id: "b10", name: "Google" },
    tags: ["android", "google", "camera"],
    thumbnail: "https://images.unsplash.com/photo-1682673520129-15b044c4ca5c?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1682673519952-8c6a6aabb1db?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1682673519834-f9c3c9a03ae7?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 60,
    sold: 10,
    attributes: [
      { name: "Color", value: "Black" },
      { name: "Storage", value: "256GB" }
    ],
    variations: [],
    isFeatured: false,
    ratings: 4.6,
    createdAt: "2025-08-22T14:00:00Z",
    updatedAt: "2025-09-08T14:30:00Z"
  },
  {
    _id: "p13",
    name: "LG OLED55 C2 TV",
    description: "55-inch OLED with perfect blacks and intense contrast.",
    purchasePrice: 1000,
    regularPrice: 1499,
    salePrice: 1399,
    category: { _id: "c7", name: "TVs" },
    brand: { _id: "b11", name: "LG" },
    tags: ["tv", "oled", "home entertainment"],
    thumbnail: "https://images.unsplash.com/photo-1600124057579-8f72bcc3cd67?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600124057524-448541668f34?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1600124057582-3d2c240d7d38?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 20,
    sold: 4,
    attributes: [
      { name: "Size", value: "55 inch" },
      { name: "Resolution", value: "4K OLED" }
    ],
    variations: [],
    isFeatured: true,
    ratings: 4.7,
    createdAt: "2025-07-01T09:00:00Z",
    updatedAt: "2025-07-25T09:00:00Z"
  },
  {
    _id: "p14",
    name: "Bissell Featherweight Vacuum",
    description: "Lightweight vacuum for quick clean ups.",
    purchasePrice: 80,
    regularPrice: 120,
    salePrice: 110,
    category: { _id: "c8", name: "Home & Kitchen" },
    brand: { _id: "b12", name: "Bissell" },
    tags: ["vacuum", "home appliance", "cleaning"],
    thumbnail: "https://images.unsplash.com/photo-1586201375761-83865001f1cc?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586201375694-5ed5c9ea144d?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1586201375909-5c942baa3020?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 75,
    sold: 22,
    attributes: [],
    variations: [],
    isFeatured: false,
    ratings: 4.1,
    createdAt: "2025-08-10T08:00:00Z",
    updatedAt: "2025-08-30T08:00:00Z"
  },
  {
    _id: "p15",
    name: "KitchenAid Artisan Stand Mixer",
    description: "5 Quart stand mixer with tilt-head design.",
    purchasePrice: 350,
    regularPrice: 450,
    salePrice: 420,
    category: { _id: "c9", name: "Appliances" },
    brand: { _id: "b13", name: "KitchenAid" },
    tags: ["kitchen", "baking", "appliance"],
    thumbnail: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1511455162415-8b80f0ba8238?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 30,
    sold: 10,
    attributes: [],
    variations: [],
    isFeatured: true,
    ratings: 4.8,
    createdAt: "2025-06-20T10:00:00Z",
    updatedAt: "2025-07-15T10:00:00Z"
  },
  {
    _id: "p16",
    name: "Nikon Z7 II Mirrorless",
    description: "High resolution 45.7MP sensor & improved autofocus.",
    purchasePrice: 2500,
    regularPrice: 3000,
    salePrice: 2850,
    category: { _id: "c5", name: "Cameras" },
    brand: { _id: "b14", name: "Nikon" },
    tags: ["camera", "mirrorless", "photography"],
    thumbnail: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549924234-0884cdbc8c79?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1549924230-2ebd33b56b54?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 18,
    sold: 5,
    attributes: [],
    variations: [],
    isFeatured: false,
    ratings: 4.5,
    createdAt: "2025-05-10T11:00:00Z",
    updatedAt: "2025-06-20T11:00:00Z"
  },
  {
    _id: "p17",
    name: "Samsung Galaxy Buds2 Pro",
    description: "True wireless earbuds with immersive sound and ANC.",
    purchasePrice: 150,
    regularPrice: 200,
    salePrice: 190,
    category: { _id: "c3", name: "Headphones" },
    brand: { _id: "b4", name: "Samsung" },
    tags: ["earbuds", "wireless", "ANC"],
    thumbnail: "https://images.unsplash.com/photo-1646785541337-c1953642b8b7?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1646785541365-12a4c0c68134?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1646785541321-e2c9f2b9a4f2?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 65,
    sold: 20,
    attributes: [
      { name: "Color", value: "Black" }
    ],
    variations: [],
    isFeatured: false,
    ratings: 4.3,
    createdAt: "2025-09-03T09:00:00Z",
    updatedAt: "2025-09-11T09:00:00Z"
  },
  {
    _id: "p18",
    name: "LG Tone Free HBS-FN6 Earbuds",
    description: "Bluetooth earbuds with UV nano charging case.",
    purchasePrice: 180,
    regularPrice: 220,
    salePrice: 200,
    category: { _id: "c3", name: "Headphones" },
    brand: { _id: "b15", name: "LG" },
    tags: ["earbuds", "wireless"],
    thumbnail: "https://images.unsplash.com/photo-1616587892000-1f9e01f0bba6?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1616587892053-8b8087f11eba?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1616587892017-0c993f7e4edc?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 50,
    sold: 10,
    attributes: [],
    variations: [],
    isFeatured: false,
    ratings: 4.1,
    createdAt: "2025-08-25T08:00:00Z",
    updatedAt: "2025-09-08T08:00:00Z"
  },
  {
    _id: "p19",
    name: "Beats Studio3 Wireless Headphones",
    description: "Over-ear noise cancelling with Apple W1 chip.",
    purchasePrice: 250,
    regularPrice: 350,
    salePrice: 330,
    category: { _id: "c3", name: "Headphones" },
    brand: { _id: "b16", name: "Beats" },
    tags: ["over-ear", "wireless"],
    thumbnail: "https://images.unsplash.com/photo-1573496771264-66a97aac0e12?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1573496771288-2a8a3d19ec24?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1573496771302-ea7d66e03d78?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 45,
    sold: 7,
    attributes: [
      { name: "Color", value: "Matte Black" }
    ],
    variations: [],
    isFeatured: false,
    ratings: 4.0,
    createdAt: "2025-08-18T09:30:00Z",
    updatedAt: "2025-09-07T09:30:00Z"
  },
  {
    _id: "p20",
    name: "Sony Bravia 65″ OLED TV",
    description: "65 inch 4K OLED TV with immersive display.",
    purchasePrice: 1200,
    regularPrice: 1800,
    salePrice: 1750,
    category: { _id: "c7", name: "TVs" },
    brand: { _id: "b11", name: "Sony" },
    tags: ["tv", "oled", "4k", "home entertainment"],
    thumbnail: "https://images.unsplash.com/photo-1593642532871-8b12e7829f36?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1593642532888-e1a5f1f2d1c1?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1593642532898-f5c1c1f1b1b2?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 18,
    sold: 2,
    attributes: [
      { name: "Size", value: "65 inch" },
      { name: "Type", value: "OLED" }
    ],
    variations: [],
    isFeatured: true,
    ratings: 4.6,
    createdAt: "2025-07-30T10:00:00Z",
    updatedAt: "2025-08-25T10:00:00Z"
  },
  {
    _id: "p21",
    name: "Kindle Paperwhite 11th Gen",
    description: "Waterproof e-reader with high-resolution display.",
    purchasePrice: 120,
    regularPrice: 180,
    salePrice: 160,
    category: { _id: "c10", name: "E-readers" },
    brand: { _id: "b17", name: "Amazon" },
    tags: ["ebook", "kindle"],
    thumbnail: "https://images.unsplash.com/photo-1573497019417-5e63484aa8b1?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1573497019434-3fa26b8fa3df?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1573497019456-7be0c6d0a3b5?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 70,
    sold: 20,
    attributes: [],
    variations: [],
    isFeatured: false,
    ratings: 4.5,
    createdAt: "2025-09-02T07:00:00Z",
    updatedAt: "2025-09-10T07:00:00Z"
  },
  {
    _id: "p22",
    name: "GoPro HERO11 Black",
    description: "Action camera with 5.3K video and stabilized capture.",
    purchasePrice: 450,
    regularPrice: 550,
    salePrice: 520,
    category: { _id: "c5", name: "Cameras" },
    brand: { _id: "b18", name: "GoPro" },
    tags: ["action cam", "outdoor", "adventure"],
    thumbnail: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1526170375875-4d8ecf77b99e?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1526170375895-abcdef77b99f?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 30,
    sold: 5,
    attributes: [],
    variations: [],
    isFeatured: true,
    ratings: 4.4,
    createdAt: "2025-08-01T12:00:00Z",
    updatedAt: "2025-09-01T12:00:00Z"
  },
  {
    _id: "p23",
    name: "Fitbit Charge 6",
    description: "Fitness tracker with built-in GPS and health metrics.",
    purchasePrice: 130,
    regularPrice: 180,
    salePrice: 170,
    category: { _id: "c6", name: "Wearables" },
    brand: { _id: "b19", name: "Fitbit" },
    tags: ["fitness", "tracker", "wearable"],
    thumbnail: "https://images.unsplash.com/photo-1582719478170-fb2e19d02b38?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478620-828ad0d87c99?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1582719478705-1e4dcd16d77a?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 90,
    sold: 35,
    attributes: [],
    variations: [],
    isFeatured: false,
    ratings: 4.2,
    createdAt: "2025-09-04T13:00:00Z",
    updatedAt: "2025-09-12T13:00:00Z"
  },
  {
    _id: "p24",
    name: "Fossil Gen 6 Smartwatch",
    description: "Smartwatch with rapid charging and stylish design.",
    purchasePrice: 250,
    regularPrice: 299,
    salePrice: 279,
    category: { _id: "c6", name: "Wearables" },
    brand: { _id: "b20", name: "Fossil" },
    tags: ["smartwatch", "fashion", "wearable"],
    thumbnail: "https://images.unsplash.com/photo-1603791440384-56cd371ee9b?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603791423685-898f24f1905f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1603791406555-4c7f202f74a4?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 75,
    sold: 30,
    attributes: [],
    variations: [],
    isFeatured: false,
    ratings: 4.4,
    createdAt: "2025-08-25T14:00:00Z",
    updatedAt: "2025-09-11T14:00:00Z"
  },
  {
    _id: "p25",
    name: "JBL Flip 6 Bluetooth Speaker",
    description: "Portable speaker with punchy bass and waterproof design.",
    purchasePrice: 80,
    regularPrice: 120,
    salePrice: 110,
    category: { _id: "c11", name: "Audio" },
    brand: { _id: "b21", name: "JBL" },
    tags: ["speaker", "bluetooth", "portable"],
    thumbnail: "https://images.unsplash.com/photo-1585386959984-a415522e3a05?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585386959984-a415522e3a05?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1585386959984-a415522e3a06?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 60,
    sold: 18,
    attributes: [],
    variations: [],
    isFeatured: true,
    ratings: 4.1,
    createdAt: "2025-08-20T10:00:00Z",
    updatedAt: "2025-09-08T10:00:00Z"
  },
  {
    _id: "p26",
    name: "Dyson V11 Torque Drive Vacuum",
    description: "High performance cordless vacuum cleaner.",
    purchasePrice: 450,
    regularPrice: 650,
    salePrice: 620,
    category: { _id: "c8", name: "Home & Kitchen" },
    brand: { _id: "b12", name: "Bissell" },
    tags: ["vacuum", "cordless", "cleaning"],
    thumbnail: "https://images.unsplash.com/photo-1592752943236-4a6f4bed9a0f?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592752943236-4a6f4bed9a0f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1592752943237-4a6f4bed9a0g?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 40,
    sold: 10,
    attributes: [],
    variations: [],
    isFeatured: false,
    ratings: 4.5,
    createdAt: "2025-07-25T12:00:00Z",
    updatedAt: "2025-08-25T12:00:00Z"
  },
  {
    _id: "p27",
    name: "Instant Pot Duo 7-in-1",
    description: "Versatile electric pressure cooker for fast cooking.",
    purchasePrice: 80,
    regularPrice: 120,
    salePrice: 110,
    category: { _id: "c9", name: "Appliances" },
    brand: { _id: "b22", name: "Instant Pot" },
    tags: ["cooking", "kitchen", "appliance"],
    thumbnail: "https://images.unsplash.com/photo-1560847761-3ae0be3a31b2?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560847761-3ae0be3a31b2?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1560847761-3ae0be3a31b3?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 55,
    sold: 20,
    attributes: [],
    variations: [],
    isFeatured: false,
    ratings: 4.0,
    createdAt: "2025-08-12T08:00:00Z",
    updatedAt: "2025-09-08T08:00:00Z"
  },
  {
    _id: "p28",
    name: "Oculus Quest 3",
    description: "Next-gen standalone VR headset by Meta.",
    purchasePrice: 300,
    regularPrice: 499,
    salePrice: 480,
    category: { _id: "c6", name: "Wearables" },
    brand: { _id: "b23", name: "Meta" },
    tags: ["vr", "game", "technology"],
    thumbnail: "https://images.unsplash.com/photo-1587829741301-dc798b82b5f5?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587829741340-5c88813036f3?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1587829741305-6f5e88213036?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 45,
    sold: 12,
    attributes: [],
    variations: [],
    isFeatured: false,
    ratings: 4.3,
    createdAt: "2025-09-01T13:00:00Z",
    updatedAt: "2025-09-10T13:00:00Z"
  },
  {
    _id: "p29",
    name: "Echo Dot (5th Gen)",
    description: "Smart speaker with better sound and light ring.",
    purchasePrice: 45,
    regularPrice: 60,
    salePrice: 55,
    category: { _id: "c11", name: "Audio" },
    brand: { _id: "b24", name: "Amazon" },
    tags: ["smart home", "audio", "speaker"],
    thumbnail: "https://images.unsplash.com/photo-1570818895202-2708c2563c07?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570818895202-2708c2563c07?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1570818895203-2708c2563c08?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 150,
    sold: 90,
    attributes: [],
    variations: [],
    isFeatured: false,
    ratings: 4.2,
    createdAt: "2025-09-03T14:00:00Z",
    updatedAt: "2025-09-11T14:00:00Z"
  },
  {
    _id: "p30",
    name: "Logitech MX Master 3 Mouse",
    description: "Ergonomic wireless mouse with high precision scroll wheel.",
    purchasePrice: 90,
    regularPrice: 130,
    salePrice: 120,
    category: { _id: "c11", name: "Audio" },
    brand: { _id: "b25", name: "Logitech" },
    tags: ["accessory", "peripherals", "computer"],
    thumbnail: "https://images.unsplash.com/photo-1617057132621-91b4ef17139d?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617057132624-91b4ef17139a?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1617057132625-91b4ef17139b?auto=format&fit=crop&w=400&q=80"
    ],
    stock: 80,
    sold: 40,
    attributes: [
      { name: "Color", value: "Graphite" }
    ],
    variations: [],
    isFeatured: false,
    ratings: 4.6,
    createdAt: "2025-08-25T12:00:00Z",
    updatedAt: "2025-09-05T12:00:00Z"
  }
];
