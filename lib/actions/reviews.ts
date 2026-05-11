"use server";

import { cookies } from "next/headers";
import { revalidateTag, revalidatePath } from "next/cache";
import { getCustomer, CACHE_TAGS } from "@/lib/shopify";
import { getCustomerPurchasedProductHandles } from "@/lib/shopify";

export interface SubmitReviewState {
  success?: boolean;
  error?: string;
}

export async function submitReviewAction(
  productId: string,
  productHandle: string,
  rating: number,
  body: string
): Promise<SubmitReviewState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("shopify_customer_token")?.value;

  if (!token) {
    return { error: "You must be logged in to write a review." };
  }

  try {
    // 1. Verify purchase
    const purchasedHandles = await getCustomerPurchasedProductHandles(token);
    if (!purchasedHandles.includes(productHandle)) {
      return { error: "Only verified purchasers of this product can submit a review." };
    }

    // 2. Fetch customer details for the review profile
    const customer = await getCustomer(token);
    if (!customer) {
      return { error: "Could not retrieve customer details. Please try logging in again." };
    }

    const name = `${customer.firstName} ${customer.lastName}`.trim() || "Verified Buyer";
    const email = customer.email;

    // 3. Submit to Judge.me REST API
    const shopDomain = process.env.JUDGEME_SHOP_DOMAIN;
    const privateToken = process.env.JUDGEME_PRIVATE_TOKEN;

    if (!shopDomain || !privateToken) {
      console.error("[Judge.me] Server configuration missing JUDGEME_SHOP_DOMAIN or JUDGEME_PRIVATE_TOKEN");
      return { error: "Review submission is temporarily unavailable due to system configuration." };
    }

    const payload = {
      shop_domain: shopDomain,
      platform: "shopify",
      id: productId, // external product ID (e.g., numeric Shopify ID)
      name,
      email,
      rating,
      body,
    };

    const response = await fetch("https://judge.me/api/v1/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Token": privateToken,
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("[Judge.me] API submission failed:", response.status, responseData);
      return { error: responseData.message || "Failed to submit review to Judge.me." };
    }

    console.log("[Judge.me] Review successfully submitted:", responseData);

    // 4. Revalidate cache so the user sees the new review right away
    revalidateTag(CACHE_TAGS.judgeMeReviews, { expire: 0 });
    revalidatePath(`/product/${productHandle}`);

    return { success: true };
  } catch (error: any) {
    console.error("[Judge.me] Error during review submission action:", error);
    return { error: error.message || "An unexpected error occurred while submitting your review." };
  }
}
