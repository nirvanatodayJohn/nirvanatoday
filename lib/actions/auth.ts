"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAccessToken, createCustomer } from "@/lib/shopify";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const result = await createAccessToken(email, password);

    if (result.customerUserErrors && result.customerUserErrors.length > 0) {
      return { error: result.customerUserErrors[0].message };
    }

    const { accessToken, expiresAt } = result.customerAccessToken;

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("shopify_customer_token", accessToken, {
      expires: new Date(expiresAt),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." };
  }
}

export async function registerAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string || "";
  const lastName = formData.get("lastName") as string || "";

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const result = await createCustomer(email, password, firstName, lastName);

    if (result.customerUserErrors && result.customerUserErrors.length > 0) {
      return { error: result.customerUserErrors[0].message };
    }

    // After registration, log them in automatically
    return await loginAction(formData);
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("shopify_customer_token");
  redirect("/");
}
