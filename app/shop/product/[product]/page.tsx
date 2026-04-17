import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

import { getProductByHandle, getProducts } from "@/lib/shopify";
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
import ReviewsList from "@/components/custom/Product/ReviewsList";
import { getJudgeMeReviews } from "@/lib/judgeme";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string }>;
}): Promise<Metadata> {
  const { product: productHandle } = await params;
  const product = await getProductByHandle(productHandle);

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} | Nirvana Today`,
    description: product.description,
    keywords: [...(product.tags || []), product.category || "", "Nirvana Today"],
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product: productHandle } = await params;
  const product = await getProductByHandle(productHandle);

  if (!product) {
    console.log(`[ProductPage] Product NOT found for handle: ${productHandle}`);
    notFound();
  }

  console.log(`[ProductPage] Product found: ${product.title}`);

  // Fetch reviews from Judge.me API
  const reviews = await getJudgeMeReviews(product.handle);

  // Generate JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.image,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Nirvana Today",
    },
    offers: {
      "@type": "Offer",
      price: (product.price || "0").replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://nirvanatoday.com/shop/product/${product.handle}`,
    },
  };

  const productJsonLd =
    product.rating && product.reviewCount
      ? {
          ...jsonLd,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }
      : jsonLd;

  const { products: allProducts } = await getProducts(1, 250);
  const relatedProducts = allProducts
    .filter((p) => p.handle !== product.handle)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Dynamic SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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

        {/* Custom API-driven Reviews */}
        <div className="border-t border-border/40 mt-16 pt-16">
          <ReviewsList reviews={reviews} />
        </div>

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
