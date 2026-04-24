"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import AddToCartButton from "@/components/custom/AddToCartButton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@/lib/shopify";
import ReviewStars from "@/components/custom/ReviewStars";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayVariants = (product.variants ?? []).filter(
    (variant) => variant.title && variant.title.toLowerCase() !== "default title"
  );
  const hasMultipleVariants = displayVariants.length > 1;
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    displayVariants.find((variant) => variant.image)?.id ?? displayVariants[0]?.id ?? null
  );
  const selectedVariant = displayVariants.find((variant) => variant.id === selectedVariantId);
  const displayImage = selectedVariant?.image || product.image;
  const displayPrice = selectedVariant?.price || product.price;
  const showCompareAtPrice = !selectedVariant || selectedVariant.price === product.price;
  const displayAlt = selectedVariant
    ? `${product.title} - ${selectedVariant.title}`
    : product.title;
  const selectedVariantTitle = selectedVariant?.title || "Select option";
  const rating = Number(product.rating) || 0;
  const reviewCount = Number(product.reviewCount) || 0;
  const hasReviews = rating > 0 || reviewCount > 0;
  const reviewLabel = reviewCount === 1 ? "review" : "reviews";

  return (
    <article className="group relative flex flex-col h-full rounded-2xl bg-card ring ring-black/10 shadow-sm shadow-black/10 p-4">
      <Link
        href={`/product/${product.handle}`}
        className="relative aspect-square w-full block overflow-hidden rounded-xl "
      >
        <div className="absolute inset-4">
          <Image
            src={displayImage}
            alt={displayAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain object-center mix-blend-multiply transition-all duration-300 dark:mix-blend-normal"
          />
        </div>
        {product.badge && (
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center rounded-full border border-black/5 bg-white/90 px-2 py-0.5 text-xs font-bold tracking-widest text-black shadow-sm backdrop-blur-md">
              {product.badge}
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 pt-4 text-left">
        <Link href={`/product/${product.handle}`} className="focus:outline-none">
          <div className="space-y-1.5">
            <div className={hasReviews ? "min-h-5" : "min-h-0"}>
              {hasReviews ? (
                <div className="flex max-w-full items-center gap-1.5 text-xs text-muted-foreground">
                  <ReviewStars
                    rating={rating}
                    count={reviewCount}
                    showCount={false}
                    className="shrink-0 gap-1 opacity-80"
                    starClassName="size-3"
                  />
                  <span className="font-medium text-foreground/80">
                    {rating.toFixed(1)}
                  </span>
                  {reviewCount > 0 && (
                    <span className="truncate font-medium">
                      {reviewCount} {reviewLabel}
                    </span>
                  )}
                </div>
              ) : (
                <span className="hidden" />
              )}
            </div>
            <h3 className="text-sm font-bold leading-tight text-foreground line-clamp-2 transition-colors group-hover:text-primary">
              {product.title}
            </h3>
          </div>
        </Link>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-base font-extrabold tracking-tight text-foreground">{displayPrice}</span>
          {product.compareAtPrice && showCompareAtPrice && (
            <span className="text-xs text-muted-foreground line-through opacity-50">{product.compareAtPrice}</span>
          )}
        </div>

        {hasMultipleVariants && (
          <div className="mt-2">
            <Select
              value={selectedVariantId ?? ""}
              onValueChange={(value) => setSelectedVariantId(value)}
            >
              <SelectTrigger className="w-full min-w-0 text-xs">
                <SelectValue className="min-w-0 truncate" placeholder="Select option">
                  {selectedVariantTitle}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {displayVariants.map((variant) => (
                  <SelectItem key={variant.id} className="whitespace-normal wrap-break-word leading-snug" value={variant.id}>
                    {variant.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center mt-auto gap-2 pt-2">
          <AddToCartButton product={product} selectedVariant={selectedVariant} />
          <Link href={`/product/${product.handle}`} className="flex-1">
            <Button className="w-full font-bold group/btn">
              Buy Now <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
