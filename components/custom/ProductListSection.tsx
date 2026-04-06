import Link from "next/link";
import {
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/shopify";
import ProductCard from "@/components/custom/ProductCard";

export default async function ProductListSection() {
  const allProducts = await getProducts();

  const filteredBestSellers = allProducts
    .filter((product) =>
      product.tags.some(tag => tag.toLowerCase().trim() === "best-seller")
    );

  const featuredProducts = filteredBestSellers.length > 0
    ? filteredBestSellers.slice(0, 8)
    : allProducts.slice(0, 4);

  return (
    <section className="border-t py-16">
      <div className="flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl lg:text-6xl">
            Best Sellers
          </h2>
          <Link href="/shop" className="hidden md:flex items-center gap-1.5 text-lg font-medium text-primary hover:underline underline-offset-4 transition-all">
            Shop all <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2.5} className="size-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-2">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
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
