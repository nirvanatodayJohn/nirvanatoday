"use client";

import { useMemo, useState } from "react";

import type { Product } from "@/lib/shopify";

export default function ProductDescriptionSection({
  product,
}: {
  product: Product;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionHtml = (product.descriptionHtml || product.description || "")
    .replace(/\\n/g, "<br />")
    .trim();
  const shouldCollapse = useMemo(() => {
    const plainText = descriptionHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const headingCount = (descriptionHtml.match(/<h[1-6]\b/gi) || []).length;

    return plainText.length > 900 || headingCount > 3;
  }, [descriptionHtml]);

  if (!descriptionHtml) {
    return null;
  }

  return (
    <section className="border-t border-border/40 pt-16 sm:pt-20">
      <div className="space-y-4">
        <p className="font-semibold">
          Product Details
        </p>

        <article
          className=""
        >
          <div className="relative">
            <div
              className={`${shouldCollapse && !isExpanded ? "max-h-144 overflow-hidden" : ""}`}
            >
              <div
                className="product-description-html max-w-none"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            </div>

            {shouldCollapse && !isExpanded && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background via-background to-transparent" />
            )}
          </div>

          {shouldCollapse && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setIsExpanded((current) => !current)}
                className="inline-flex min-w-36 items-center justify-center rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
