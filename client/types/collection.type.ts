export interface ICollection {
  _id: string;               // MongoDB document id
  name: string;              // Collection name
  slug: string;              // URL-friendly identifier
  description?: string;      // Optional description
  products?: string[];        // Array of product IDs (or full product objects if you populate)
  isFeatured: boolean;       // Highlight on homepage
  isPublished: boolean;      // Visibility toggle
  image?: string;            // Thumbnail/banner URL
  createdAt: string;         // ISO date string
  updatedAt: string;         // ISO date string
}
