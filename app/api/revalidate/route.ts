import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { CACHE_TAGS } from "@/lib/shopify";

/**
 * 🔔 Shopify Webhook → On-Demand Revalidation
 *
 * Setup in Shopify Admin → Settings → Notifications → Webhooks:
 *   - Product creation/update/deletion → POST https://nirvanatoday.com/api/revalidate
 *   - Blog entry created/updated       → POST https://nirvanatoday.com/api/revalidate
 *
 * Shopify signs every webhook with HMAC-SHA256 using the secret they show
 * in the webhook setup screen. Store that value as SHOPIFY_WEBHOOK_SECRET.
 *
 * Manual trigger from browser:
 *   GET https://nirvanatoday.com/api/revalidate?secret=YOUR_REVALIDATION_SECRET&tag=products
 */

const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET ?? "";
const MANUAL_SECRET = process.env.REVALIDATION_SECRET;
const ALL_CACHE_TAGS = Object.values(CACHE_TAGS);

function resolveCacheTag(tag: string) {
  if (tag in CACHE_TAGS) {
    return CACHE_TAGS[tag as keyof typeof CACHE_TAGS];
  }
  return ALL_CACHE_TAGS.includes(tag as (typeof ALL_CACHE_TAGS)[number])
    ? tag
    : null;
}

/**
 * Verify Shopify's HMAC-SHA256 webhook signature using the Web Crypto API.
 * Shopify sends the digest as base64 in X-Shopify-Hmac-Sha256.
 */
async function verifyShopifyWebhook(
  rawBody: ArrayBuffer,
  signature: string,
  shopifyTopic: string
): Promise<boolean> {
  if (!SHOPIFY_WEBHOOK_SECRET) {
    console.error("[Revalidate] SHOPIFY_WEBHOOK_SECRET is not set in environment variables!");
    return false;
  }
  if (!signature) {
    console.warn(`[Revalidate] Missing signature header for topic: "${shopifyTopic}"`);
    return false;
  }
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(SHOPIFY_WEBHOOK_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const digest = await crypto.subtle.sign("HMAC", key, rawBody);
    const digestBase64 = btoa(String.fromCharCode(...new Uint8Array(digest)));
    
    const isValid = digestBase64 === signature;
    if (!isValid) {
      console.warn(
        `[Revalidate] HMAC signature mismatch for topic "${shopifyTopic}". Received: "${signature}", Generated: "${digestBase64}"`
      );
    }
    return isValid;
  } catch (error) {
    console.error("[Revalidate] Error verifying Shopify webhook signature:", error);
    return false;
  }
}

// ─── POST: Shopify Webhook Handler ──────────────────────────
export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-shopify-hmac-sha256") ?? "";
    const shopifyTopic = request.headers.get("x-shopify-topic") ?? "";

    console.log(`[Revalidate] Received webhook. Topic: "${shopifyTopic}", Signature length: ${signature.length}`);

    // Read raw body as ArrayBuffer for HMAC verification
    const rawBody = await request.arrayBuffer();

    if (!(await verifyShopifyWebhook(rawBody, signature, shopifyTopic))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let revalidatedTags: string[] = [];

    if (shopifyTopic.startsWith("products/")) {
      revalidateTag(CACHE_TAGS.products, { expire: 0 });
      revalidatedTags.push(CACHE_TAGS.products);
    }

    if (shopifyTopic.startsWith("collections/")) {
      revalidateTag(CACHE_TAGS.collections, { expire: 0 });
      revalidatedTags.push(CACHE_TAGS.collections);
    }

    if (
      shopifyTopic.startsWith("articles/") ||
      shopifyTopic.startsWith("blogs/")
    ) {
      revalidateTag(CACHE_TAGS.blogs, { expire: 0 });
      revalidatedTags.push(CACHE_TAGS.blogs);
    }

    if (
      shopifyTopic.startsWith("judgeme/") ||
      shopifyTopic.startsWith("reviews/")
    ) {
      revalidateTag(CACHE_TAGS.judgeMeReviews, { expire: 0 });
      revalidatedTags.push(CACHE_TAGS.judgeMeReviews);
    }

    // Unknown topic → revalidate everything
    if (revalidatedTags.length === 0) {
      ALL_CACHE_TAGS.forEach((tag) => revalidateTag(tag, { expire: 0 }));
      revalidatedTags = [...ALL_CACHE_TAGS];
    }

    console.log(
      `✅ Revalidated: [${revalidatedTags.join(", ")}] via topic: "${shopifyTopic}"`
    );

    return NextResponse.json({
      revalidated: true,
      tags: revalidatedTags,
      now: Date.now(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Revalidation error:", message);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}

// ─── GET: Manual Revalidation (trigger from your browser) ───
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const tag = searchParams.get("tag");

  if (MANUAL_SECRET && secret !== MANUAL_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const cacheTag = tag ? resolveCacheTag(tag) : null;

  if (cacheTag) {
    revalidateTag(cacheTag, { expire: 0 });
    return NextResponse.json({ revalidated: true, tag: cacheTag, now: Date.now() });
  }

  // No tag specified → revalidate all
  ALL_CACHE_TAGS.forEach((t) => revalidateTag(t, { expire: 0 }));
  return NextResponse.json({ revalidated: true, tags: ALL_CACHE_TAGS, now: Date.now() });
}
