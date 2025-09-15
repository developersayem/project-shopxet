import { IProduct } from "./product.type";

export interface ICoupon {
  _id: string;
  code: string; // e.g. "WELCOME10"
  discountType: "percentage" | "fixed";
  discountValue: number;

  startDate?: string; // ISO date
  expiryDate?: string; // ISO date
  usageLimit?: number;
  usedCount: number;

  isActive: boolean;
  appliesToAll: boolean;

  products?: IProduct[];

  createdAt: string;
  updatedAt: string;
}
