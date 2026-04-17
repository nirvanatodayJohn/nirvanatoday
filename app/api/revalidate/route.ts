import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { CACHE_TAGS } from "@/lib/shopify";

/**
 * 🔔 Shopify Webhook → On-Demand Revalidation
 *
 * Setup in Shopify Admin → Settings → Notifications → Webhooks:
 *   - Product creation/update/deletion → POST https://your-domain.com/api/revalidate
 *   - Blog entry created/updated       → POST https://your-domain.com/api/revalidate
 *
 * Manual trigger from browser:
 *   GET https://your-domain.com/api/revalidate?secret=YOUR_SECRET&tag=products
 */

const WEBHOOK_SECRET = process.env.REVALIDATION_SECRET;
const ALL_CACHE_TAGS = Object.values(CACHE_TAGS);

function resolveCacheTag(tag: string) {
  if (tag in CACHE_TAGS) {
    return CACHE_TAGS[tag as keyof typeof CACHE_TAGS];
  }

  return ALL_CACHE_TAGS.includes(tag as (typeof ALL_CACHE_TAGS)[number])
    ? tag
    : null;
}

// ─── POST: Shopify Webhook Handler ──────────────────────────
export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get("x-revalidation-secret");

    if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const shopifyTopic = request.headers.get("x-shopify-topic") || "";

    // Consume the body so request doesn't hang
    await request.json().catch(() => ({}));

    let revalidatedTags: string[] = [];

    if (shopifyTopic.startsWith("products/")) {
      revalidateTag(CACHE_TAGS.products, "default");
      revalidatedTags.push(CACHE_TAGS.products);
    }

    if (shopifyTopic.startsWith("collections/")) {
      revalidateTag(CACHE_TAGS.collections, "default");
      revalidatedTags.push(CACHE_TAGS.collections);
    }

    if (
      shopifyTopic.startsWith("articles/") ||
      shopifyTopic.startsWith("blogs/")
    ) {
      revalidateTag(CACHE_TAGS.blogs, "default");
      revalidatedTags.push(CACHE_TAGS.blogs);
    }

    if (
      shopifyTopic.startsWith("judgeme/") ||
      shopifyTopic.startsWith("reviews/")
    ) {
      revalidateTag(CACHE_TAGS.judgeMeReviews, "default");
      revalidatedTags.push(CACHE_TAGS.judgeMeReviews);
    }

    // Unknown topic → revalidate everything
    if (revalidatedTags.length === 0) {
      ALL_CACHE_TAGS.forEach((cacheTag) => revalidateTag(cacheTag, "default"));
      revalidatedTags = ALL_CACHE_TAGS;
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
    return NextResponse.json(
      { error: "Revalidation failed" },
      { status: 500 }
    );
  }
}

// ─── GET: Manual Revalidation (trigger from your browser) ───
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const tag = searchParams.get("tag");

  if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const cacheTag = tag ? resolveCacheTag(tag) : null;

  if (cacheTag) {
    revalidateTag(cacheTag, "default");
    return NextResponse.json({
      revalidated: true,
      tag: cacheTag,
      now: Date.now(),
    });
  }

  // No tag specified → revalidate all
  ALL_CACHE_TAGS.forEach((cacheTag) => revalidateTag(cacheTag, "default"));

  return NextResponse.json({
    revalidated: true,
    tags: ALL_CACHE_TAGS,
    now: Date.now(),
  });
}
