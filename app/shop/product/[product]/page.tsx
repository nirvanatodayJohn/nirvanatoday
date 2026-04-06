import React from "react"
import NextImage from "next/image"
import { notFound } from "next/navigation"
import { getProductByHandle, getProducts } from "@/lib/shopify"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    CheckmarkCircle01Icon,
    TruckIcon,
    Shield01Icon,
    ArrowDown01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import ProductCard from "@/components/custom/ProductCard"
import ProductActions from "@/components/custom/ProductActions"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ReviewStars from "@/components/custom/ReviewStars"

export default async function ProductPage({ params }: { params: Promise<{ product: string }> }) {
    const { product: productHandle } = await params;
    const product = await getProductByHandle(productHandle);

    if (!product) {
        notFound();
    }

    const { products: allProducts } = await getProducts(1, 250);
    const relatedProducts = allProducts.filter(p => p.handle !== product.handle).slice(0, 4);

    return (
        <div className="min-h-screen bg-background">
            {/* Breadcrumb / Back Navigation */}
            <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-4">
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
                        {product.category.split(',').map((cat, index) => {
                            const trimmedCat = cat.trim();
                            return (
                                <React.Fragment key={trimmedCat}>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={`/shop/type/${trimmedCat.toLowerCase().replace(/ /g, '-')}`}>
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
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                    {/* Media Gallery */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-[3rem] border border-border/40 bg-muted/30">
                        <NextImage
                            src={product.image}
                            alt={product.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover object-center"
                            priority
                        />
                        {product.badge && (
                            <div className="absolute left-8 top-8">
                                <span className="inline-flex items-center rounded-full border border-black/5 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-black shadow-lg backdrop-blur-md">
                                    {product.badge}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center text-left">
                        <h1 className="text-5xl font-bold tracking-tighter text-foreground">
                            {product.title}
                        </h1>

                        <div className="mt-4 flex items-center gap-4">
                            <ReviewStars rating={product.rating} count={product.reviewCount} />
                        </div>

                        <div className="mt-8 flex items-baseline gap-4">
                            <span className="text-3xl font-bold tracking-tight text-foreground">
                                {product.price}
                            </span>
                            {product.compareAtPrice && (
                                <span className="text-xl text-muted-foreground line-through opacity-50">
                                    {product.compareAtPrice}
                                </span>
                            )}
                        </div>

                        {/* Smart Description Display */}
                        <div className="mt-8 divide-y divide-border/40 border-t border-border/40">
                            {(() => {
                                // Split by common headers if they exist
                                const sections = product.description.split(/(?=Overview|Feel & Effects|Usage|Lab Results|Compliance|Quick FAQ|Strain Varieties|Product Insights|Key Features|Usage Instructions|Why Our)/i);
                                const overview = sections.find(s => s.toLowerCase().includes("overview")) || sections[0];
                                const otherSections = sections.filter(s => s !== overview);

                                return (
                                    <>
                                        <div className="">
                                            <div className="prose prose-neutral max-w-none text-muted-foreground whitespace-pre-wrap"
                                                dangerouslySetInnerHTML={{ __html: overview.replace(/Overview/i, "").replace(/\\n/g, '<br />') }} />
                                        </div>

                                        {otherSections.length > 0 && (
                                            <div className="space-y-0">
                                                {otherSections.map((section, idx) => {
                                                    const [title, ...content] = section.split(/\n+/);
                                                    const mainContent = content.join("\n");
                                                    if (!title || !mainContent) return null;

                                                    return (
                                                        <details key={idx} className="group border-b border-border/40 last:border-b-0">
                                                            <summary className="flex cursor-pointer list-none items-center justify-between py-6 text-sm font-bold tracking-widest text-foreground transition-colors hover:text-primary">
                                                                {title.trim()}
                                                                <span className="text-muted-foreground/40 transition-transform group-open:rotate-180">
                                                                    <HugeiconsIcon icon={ArrowDown01Icon} className="size-4" />
                                                                </span>
                                                            </summary>
                                                            <div className="pb-4 prose prose-neutral max-w-none text-base leading-relaxed text-muted-foreground whitespace-pre-wrap"
                                                                dangerouslySetInnerHTML={{ __html: mainContent.trim().replace(/\\n/g, '<br />') }} />
                                                        </details>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </>
                                );
                            })()}
                        </div>

                        {/* USP Quick Grid */}
                        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-border/40 pt-8">
                            <div className="flex items-center gap-2">
                                <HugeiconsIcon icon={CheckmarkCircle01Icon} className="size-4 text-muted-foreground" />
                                <span className="text-[13px] font-bold text-muted-foreground uppercase tracking-widest">Lab Tested</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <HugeiconsIcon icon={TruckIcon} className="size-4 text-muted-foreground" />
                                <span className="text-[13px] font-bold text-muted-foreground uppercase tracking-widest">Free Shipping</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <HugeiconsIcon icon={Shield01Icon} className="size-4 text-muted-foreground" />
                                <span className="text-[13px] font-bold text-muted-foreground uppercase tracking-widest">Non-GMO</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex size-4 items-center justify-center rounded-full bg-muted-foreground/20 text-[8px] font-bold text-muted-foreground">US</div>
                                <span className="text-[13px] font-bold text-muted-foreground uppercase tracking-widest">USA Crafted</span>
                            </div>
                        </div>

                        <ProductActions product={product} />


                        <p className="mt-4 text-xs font-semibold text-muted-foreground">
                            Secure Checkout • Fast Shipping • Discreet Packaging
                        </p>
                    </div>
                </div>

                {/* Reviews Section Placeholder */}
                <section className="mt-32 border-t border-border/40 pt-24 text-left">
                    <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold tracking-tighter text-foreground">
                                Customer <span className="text-muted-foreground">Reviews.</span>
                            </h2>
                            <ReviewStars rating={product.rating} count={product.reviewCount} showCount={false} className="scale-110 origin-left" />
                            <p className="text-lg font-medium text-muted-foreground">
                                {product.reviewCount ? `Based on ${product.reviewCount} verified reviews` : "No reviews yet. Be the first to share your experience!"}
                            </p>
                        </div>
                        <Button variant="outline" className="h-12 rounded-xl font-bold">
                            Write a Review
                        </Button>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        {/* 
                            This is where the review app widget would go. 
                            If you use Judge.me or Stamped.io, we can inject their iframe here. 
                        */}
                        {!product.reviewCount && (
                            <div className="col-span-full rounded-3xl bg-muted/30 p-12 text-center">
                                <p className="text-muted-foreground">Share your thoughts with other customers!</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Related Products Section */}
                <section className="mt-16 border-t border-border/40 pt-24">
                    <div className="flex items-end justify-between">
                        <h2 className="text-4xl font-bold tracking-tighter text-foreground text-left">
                            Pairs <span className="text-muted-foreground">Well.</span>
                        </h2>
                        <Link href="/shop" className="hidden font-bold text-foreground underline decoration-2 underline-offset-8 transition-opacity hover:opacity-70 sm:block">
                            View All Products
                        </Link>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-2">
                        {relatedProducts.map((rel) => (
                            <ProductCard key={rel.id} product={rel} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}
