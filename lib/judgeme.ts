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
}

export async function getJudgeMeReviews(handle: string) {
  const shop = process.env.JUDGEME_SHOP_DOMAIN;
  const token = process.env.JUDGEME_PRIVATE_TOKEN;

  if (!shop || !token) {
    console.warn("[Judge.me] Missing JUDGEME_SHOP_DOMAIN or JUDGEME_PRIVATE_TOKEN");
    return [];
  }

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 10000);

    const params = new URLSearchParams({
      api_token: token,
      shop_domain: shop,
      handle,
    });
    const url = `https://judge.me/api/v1/reviews?${params.toString()}`;
    console.log(`[Judge.me] Fetching reviews for product handle: ${handle}`);

    const res = await fetch(url, {
      cache: "force-cache",
      next: {
        tags: [CACHE_TAGS.judgeMeReviews],
      },
      signal: controller.signal,
    });
    clearTimeout(id);
    console.log(`[Judge.me] Status: ${res.status}`);

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data.reviews as JudgeMeReview[];
  } catch (error) {
    console.error("Error fetching Judge.me reviews:", error);
    return [];
  }
}
