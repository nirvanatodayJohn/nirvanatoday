import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getCustomer } from "@/lib/shopify";

/**
 * Lightweight endpoint that checks if a user is logged in.
 * Called client-side by the Navbar so the root layout stays static.
 */
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("shopify_customer_token")?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    const customer = await getCustomer(token);
    if (!customer) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        name: `${customer.firstName} ${customer.lastName}`.trim(),
        email: customer.email,
      },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}
