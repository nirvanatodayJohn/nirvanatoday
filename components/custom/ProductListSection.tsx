import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import AddToCartButton from "@/components/custom/AddToCartButton";

import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/shopify";

export default async function ProductListSection() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 4);

  return (
    <section className="pb-20 pt-16 sm:py-28">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl lg:text-6xl">
            Best Sellers
          </h2>
          <Link href="/shop" className="hidden md:flex items-center gap-1.5 text-lg font-medium text-primary hover:underline underline-offset-4 transition-all">
            Shop all <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2.5} className="size-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
          {featuredProducts.map((product, idx) => (
            <article key={product.id} className="group relative flex flex-col h-full rounded-2xl bg-muted border p-6">
              <Link
                href={`/shop/product/${product.handle}`}
                className="relative aspect-square w-full block overflow-hidden mix-blend-multiply"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain object-center "
                />

                {product.badge && (
                  <div className="absolute left-2 top-2 z-10">
                    <span className="inline-flex items-center rounded-full border border-black/5 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black shadow-xs backdrop-blur-md">
                      {product.badge}
                    </span>
                  </div>
                )}
              </Link>

              <div className="mt-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <Link href={`/shop/product/${product.handle}`}>
                      <h3 className="text-lg font-bold tracking-tight text-foreground line-clamp-1 transition-colors hover:text-primary">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-sm font-medium text-muted-foreground">
                      {product.category}
                    </p>
                  </div>
                  <div className="flex flex-col items-end shrink-0 pt-0.5">
                    <span className="text-lg font-bold text-foreground tracking-tight">{product.price}</span>
                    {product.compareAtPrice && (
                      <span className="text-[11px] font-semibold text-muted-foreground line-through opacity-60">
                        {product.compareAtPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
                  <AddToCartButton product={product} />
                  <Link href={`/shop/product/${product.handle}`} className="w-full">
                    <Button variant="outline" className="w-full font-semibold">
                      Shop now
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-4 flex justify-center lg:hidden">
          <Link href="/shop" className="w-full sm:w-auto">
            <Button size="lg" className="w-full rounded-full text-base font-semibold">
              Shop the full collection
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
