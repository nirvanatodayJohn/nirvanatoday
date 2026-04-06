"use client"
import Image from "next/image";
import Link from "next/link";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import AddToCartButton from "@/components/custom/AddToCartButton";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/shopify";
import ReviewStars from "@/components/custom/ReviewStars";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group relative flex flex-col h-full rounded-2xl bg-muted border p-4">
      <Link
        href={`/shop/product/${product.handle}`}
        className="relative aspect-square w-full block overflow-hidden rounded-xl bg-background"
      >
        <div className="absolute inset-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain object-center mix-blend-multiply dark:mix-blend-normal"
          />
        </div>
        {product.badge && (
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center rounded-full border border-black/5 bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-black shadow-sm backdrop-blur-md">
              {product.badge}
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 pt-4 text-left">
        <Link href={`/shop/product/${product.handle}`} className="focus:outline-none">
          <div className="space-y-1.5">
            <ReviewStars
              rating={product.rating}
              count={product.reviewCount}
              showCount
              className="scale-[0.8] origin-left -ml-0.5"
            />
            <h3 className="text-sm font-bold leading-tight text-foreground line-clamp-2 transition-colors group-hover:text-primary">
              {product.title}
            </h3>
          </div>
        </Link>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-extrabold tracking-tight text-foreground">{product.price}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-muted-foreground line-through opacity-50">{product.compareAtPrice}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4">
          <AddToCartButton product={product} />
          <Link href={`/shop/product/${product.handle}`} className="flex-1">
            <Button className="w-full font-bold group/btn">
              Buy Now <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
