import { Coupon } from "../models/coupon.model";
import { Product } from "../models/product.model";

// Define what a cart item looks like
interface CartItem {
  productId: string;
  quantity: number;
  price: number; // regular or sale price
}

// Result returned by the service
interface CouponResult {
  valid: boolean;
  message: string;
  discount?: number;
  finalTotal?: number;
}

export const applyCoupon = async (
  couponCode: string,
  cart: CartItem[]
): Promise<CouponResult> => {
  // ---------------- Step 1: Find the coupon ----------------
  const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() }).populate(
    "products",
    "name regularPrice salePrice thumbnail"
  );

  if (!coupon) {
    return { valid: false, message: "Coupon not found" };
  }

  // ---------------- Step 2: Check if coupon is active ----------------
  if (!coupon.isActive) {
    return { valid: false, message: "Coupon is not active" };
  }

  // ---------------- Step 3: Check expiration & start date ----------------
  const now = new Date();
  if (coupon.startDate && coupon.startDate > now) {
    return { valid: false, message: "Coupon is not valid yet" };
  }
  if (coupon.expiryDate && coupon.expiryDate < now) {
    return { valid: false, message: "Coupon has expired" };
  }

  // ---------------- Step 4: Check usage limit ----------------
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    return { valid: false, message: "Coupon usage limit reached" };
  }

  // ---------------- Step 5: Calculate cart total ----------------
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ---------------- Step 6: Check if coupon applies to cart ----------------
  let eligibleTotal = 0;

  if (coupon.appliesToAll) {
    // Applies to the whole cart
    eligibleTotal = cartTotal;
  } else if (coupon.products && coupon.products.length > 0) {
    // Applies only to selected products
    const eligibleProductIds = coupon.products.map((p: any) => p._id.toString());

    eligibleTotal = cart
      .filter((item) => eligibleProductIds.includes(item.productId))
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (eligibleTotal === 0) {
      return { valid: false, message: "Coupon does not apply to these products" };
    }
  }

  // ---------------- Step 7: Calculate discount ----------------
  let discount = 0;

  if (coupon.discountType === "percentage") {
    discount = (eligibleTotal * coupon.discountValue) / 100;
  } else if (coupon.discountType === "fixed") {
    discount = coupon.discountValue;
  }

  // Ensure discount does not exceed cart total
  if (discount > cartTotal) discount = cartTotal;

  const finalTotal = cartTotal - discount;

  // ---------------- Step 8: Return result ----------------
  return {
    valid: true,
    message: "Coupon applied successfully",
    discount,
    finalTotal,
  };
};
