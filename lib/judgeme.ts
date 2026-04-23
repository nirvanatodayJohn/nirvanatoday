import { CACHE_TAGS } from "@/lib/shopify";

export interface JudgeMeReview {
  id: number;
  title: string;
  body: string;
  rating: number;
  reviewer: {
    name: string;
  };
  created_at: string;
  product_handle?: string;
}

const PER_PAGE = 100;

async function fetchReviewPage(
  token: string,
  shop: string,
  page: number
): Promise<JudgeMeReview[]> {
  const params = new URLSearchParams({
    api_token: token,
    shop_domain: shop,
    per_page: String(PER_PAGE),
    page: String(page),
  });

  const res = await fetch(`https://judge.me/api/v1/reviews?${params.toString()}`, {
    cache: "force-cache",
    next: {
      tags: [CACHE_TAGS.judgeMeReviews],
    },
  });

  if (!res.ok) return [];
  const data = await res.json();

  // Log first review structure once so we can verify the product_handle field
  if (page === 1 && data.reviews?.length > 0) {
    console.log("[Judge.me] First review keys:", Object.keys(data.reviews[0]));
  }

  return (data.reviews ?? []) as JudgeMeReview[];
}

export async function getJudgeMeReviews(handle: string): Promise<JudgeMeReview[]> {
  const shop = process.env.JUDGEME_SHOP_DOMAIN;
  const token = process.env.JUDGEME_PRIVATE_TOKEN;

  if (!shop || !token) {
    console.warn("[Judge.me] Missing JUDGEME_SHOP_DOMAIN or JUDGEME_PRIVATE_TOKEN");
    return [];
  }

  try {
    // Fetch up to 3 pages (300 reviews) in parallel — cached indefinitely,
    // purged only when /api/revalidate receives a Judge.me webhook
    const pages = await Promise.all([
      fetchReviewPage(token, shop, 1),
      fetchReviewPage(token, shop, 2),
      fetchReviewPage(token, shop, 3),
    ]);

    const allReviews = pages.flat();
    const productReviews = allReviews.filter((r) => r.product_handle === handle);

    console.log(
      `[Judge.me] ${allReviews.length} total cached → ${productReviews.length} for "${handle}"`
    );

    return productReviews;
  } catch (error) {
    console.error("[Judge.me] Fetch error:", error);
    return [];
  }
}
