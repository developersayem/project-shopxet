import mongoose, { Schema, Document } from "mongoose";

interface INavItem {
  name: string;
  link: string;
  order: number;
  isVisible: boolean;
}

interface IButtonStyle {
  bgColor: string;
  textColor: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  fontWeight?: "normal" | "bold";
}

interface IProductCardStyle {
  priceColor: string;
  borderColor: string;
  borderWidth: number;
  hoverBorderColor: string;
  contentAlignment: "start" | "center" | "end";
  currency: string;

  buyNowButton: IButtonStyle;
  addToCartButton: IButtonStyle;
}

interface ISection {
  type: "product-showcase";
  title: string;
  collectionId: mongoose.Types.ObjectId; // link to Collection model
  productsLimit?: number;
  order: number;
  styles?: Partial<IProductCardStyle>;
}

interface IPage {
  name: "home" | "products" | "categories" | "flash-sale" | "brands" | "product-details";
  sections?: ISection[]; // only "home" has multiple
  styles?: {
    // generic page-level styles
    navbarBgColor?: string;
    navbarTextColor?: string;
    navbarHoverColor?: string;
    navbarFontWeight?: "normal" | "bold";

    productCard?: Partial<IProductCardStyle>; // product, flash-sale, brands, categories
    productDetails?: {
      titleColor?: string;
      buttonStyles?: {
        buyNowButton: IButtonStyle;
        addToCartButton: IButtonStyle;
      };
    };
    brandCard?: {
      bgColor?: string;
      textColor?: string;
      hoverColor?: string;
    };
    categoryCard?: {
      bgColor?: string;
      textColor?: string;
      hoverColor?: string;
      fontWeight?: "normal" | "bold";
    };
  };
}

export interface ISiteCustomization extends Document {
  navItems: INavItem[];
  pages: IPage[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    footerBgColor: string;
    footerTextColor: string;
  };
}

const SiteCustomizationSchema = new Schema<ISiteCustomization>(
  {
    navItems: [
      {
        name: { type: String, required: true },
        link: { type: String, required: true },
        order: { type: Number, default: 0 },
        isVisible: { type: Boolean, default: true },
      },
    ],
    pages: [
      {
        name: {
          type: String,
          enum: ["home", "products", "categories", "flash-sale", "brands", "product-details"],
          required: true,
        },
        sections: [
          {
            type: {
              type: String,
              enum: ["product-showcase"],
              required: true,
            },
            title: String,
            collectionId: { type: Schema.Types.ObjectId, ref: "Collection" },
            productsLimit: { type: Number, default: 6 },
            order: { type: Number, default: 0 },
            styles: { type: Schema.Types.Mixed },
          },
        ],
        styles: { type: Schema.Types.Mixed },
      },
    ],
    theme: {
      primaryColor: { type: String, default: "#16a34a" },
      secondaryColor: { type: String, default: "#22c55e" },
      footerBgColor: { type: String, default: "#111827" },
      footerTextColor: { type: String, default: "#ffffff" },
    },
  },
  { timestamps: true }
);

export const SiteCustomization = mongoose.model<ISiteCustomization>(
  "SiteCustomization",
  SiteCustomizationSchema
);
