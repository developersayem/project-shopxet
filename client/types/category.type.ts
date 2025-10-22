export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parent?: ICategory;
  image?: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

