"use server";

import { subscribeEmailMarketing } from "@/lib/shopify";

export type NewsletterSubscribeResult = {
  success: boolean;
  message: string;
};

export async function subscribeNewsletterAction(
  formData: FormData
): Promise<NewsletterSubscribeResult> {
  const email = formData.get("email");

  if (typeof email !== "string" || !email.trim()) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  try {
    const payload = await subscribeEmailMarketing(email.trim());

    if (!payload) {
      return {
        success: false,
        message: "We couldn't reach Shopify right now. Please try again soon.",
      };
    }

    if (payload.customerUserErrors?.length) {
      return {
        success: false,
        message:
          payload.customerUserErrors[0]?.message ??
          "We couldn't subscribe you at this time.",
      };
    }

    if (!payload.customer?.id) {
      return {
        success: false,
        message:
          "Something unexpected happened while creating the subscription.",
      };
    }

    return {
      success: true,
      message: "You're on the list! Expect mindful updates in your inbox.",
    };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again in a moment.",
    };
  }
}
