"use server"

import { cookies } from "next/headers";
import { createCheckout } from "@/lib/shopify";

export async function handleCheckoutAction(items: { id: string; quantity: number }[]) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("shopify_customer_token")?.value;

    const result = await createCheckout(items, token);
    return { 
      webUrl: result?.checkout?.webUrl || null,
      errors: result?.errors || []
    };
  } catch (error) {
    console.error("Server Action Checkout Error:", error);
    return { webUrl: null, errors: [{ message: "Internal server error" }] };
  }
}
