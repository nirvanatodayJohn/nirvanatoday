"use server"

import { createCheckout } from "@/lib/shopify";

export async function handleCheckoutAction(items: { id: string; quantity: number }[]) {
  try {
    const result = await createCheckout(items);
    return { 
      webUrl: result?.checkout?.webUrl || null,
      errors: result?.errors || []
    };
  } catch (error) {
    console.error("Server Action Checkout Error:", error);
    return { webUrl: null, errors: [{ message: "Internal server error" }] };
  }
}
