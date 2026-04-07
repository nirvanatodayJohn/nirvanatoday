import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

import { getProductByHandle, getProducts } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/custom/ProductCard";
import ProductDescriptionSection from "@/components/custom/ProductDescriptionSection";
import ProductDetailHero from "@/components/custom/ProductDetailHero";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ReviewStars from "@/components/custom/ReviewStars";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product: productHandle } = await params;
  const product = await getProductByHandle(productHandle);

  if (!product) {
    notFound();
  }

  const { products: allProducts } = await getProducts(1, 250);
  const relatedProducts = allProducts
    .filter((p) => p.handle !== product.handle)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl space-y-4 px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {product.category.split(",").map((cat) => {
              const trimmedCat = cat.trim();
              return (
                <React.Fragment key={trimmedCat}>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={`/shop/type/${trimmedCat.toLowerCase().replace(/ /g, "-")}`}
                    >
                      {trimmedCat}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </React.Fragment>
              );
            })}
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <main className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <ProductDetailHero product={product} />
        <ProductDescriptionSection product={product} />

        <section className="mt-32 border-t border-border/40 pt-24 text-left">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tighter text-foreground">
                Customer <span className="text-muted-foreground">Reviews.</span>
              </h2>
              <ReviewStars
                rating={product.rating}
                count={product.reviewCount}
                showCount={false}
                className="origin-left scale-110"
              />
              <p className="text-lg font-medium text-muted-foreground">
                {product.reviewCount
                  ? `Based on ${product.reviewCount} verified reviews`
                  : "Share your experience with this product."}
              </p>
            </div>
            <Button variant="outline" className="h-12 rounded-xl font-bold">
              Write a Review
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {!product.reviewCount && (
              <div className="col-span-full rounded-3xl bg-muted/30 p-12 text-center">
                <p className="text-muted-foreground">
                  Share your thoughts with other customers!
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-border/40 pt-16">
          <div className="flex items-end justify-between">
            <h2 className="text-left text-4xl font-bold tracking-tighter text-foreground">
              Pairs <span className="text-muted-foreground">Well.</span>
            </h2>
            <Link
              href="/shop"
              className="hidden font-bold text-foreground underline decoration-2 underline-offset-8 transition-opacity hover:opacity-70 sm:block"
            >
              View All Products
            </Link>
          </div>

          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
