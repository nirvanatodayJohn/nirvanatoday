import Image from "next/image"
import { notFound } from "next/navigation"
import { getProductByHandle, getProducts } from "@/lib/shopify"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    CheckmarkCircle01Icon,
    TruckIcon,
    Shield01Icon,
    ArrowLeft01Icon
} from "@hugeicons/core-free-icons"
import AddToCartButton from "@/components/custom/AddToCartButton"
import { HugeiconsIcon } from "@hugeicons/react"

export default async function ProductPage({ params }: { params: { handle: string } }) {
    const product = await getProductByHandle(params.handle);

    if (!product) {
        notFound();
    }

    const allProducts = await getProducts();
    const relatedProducts = allProducts.filter(p => p.handle !== product.handle).slice(0, 4);

    return (
        <div className="min-h-screen bg-background pt-16">
            {/* Breadcrumb / Back Navigation */}
            <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <Link
                    href="/shop"
                    className="group inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
                >
                    <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4 transition-transform group-hover:-translate-x-1" />
                    Back to Shop
                </Link>
            </div>

            <main className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                    {/* Media Gallery */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-[3rem] border border-border/40 bg-muted/30">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-contain p-12 mix-blend-multiply dark:mix-blend-normal"
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
                    <div className="flex flex-col justify-center">
                        <div className="space-y-4">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                {product.category}
                            </span>
                            <h1 className="text-5xl font-bold tracking-tighter text-foreground sm:text-7xl">
                                {product.title}
                            </h1>
                        </div>

                        <div className="mt-8 flex items-baseline gap-4">
                            <span className="text-4xl font-bold tracking-tight text-foreground">
                                {product.price}
                            </span>
                            {product.compareAtPrice && (
                                <span className="text-xl text-muted-foreground line-through opacity-50">
                                    {product.compareAtPrice}
                                </span>
                            )}
                        </div>

                        <div className="mt-8 prose prose-neutral max-w-none text-lg leading-relaxed text-muted-foreground"
                            dangerouslySetInnerHTML={{ __html: product.description }} />

                        {/* USP Grid */}
                        <div className="mt-12 grid grid-cols-1 gap-6 border-y border-border/40 py-10 sm:grid-cols-2">
                            <div className="flex items-center gap-3">
                                <HugeiconsIcon icon={CheckmarkCircle01Icon} className="size-5 text-foreground" />
                                <span className="text-sm font-bold text-foreground">3rd Party Lab Tested</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <HugeiconsIcon icon={TruckIcon} className="size-5 text-foreground" />
                                <span className="text-sm font-bold text-foreground">Free US Shipping</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <HugeiconsIcon icon={Shield01Icon} className="size-5 text-foreground" />
                                <span className="text-sm font-bold text-foreground">Non-GMO Ingredients</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">US</div>
                                <span className="text-sm font-bold text-foreground">Crafted in the USA</span>
                            </div>
                        </div>

                        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                            <AddToCartButton product={product} />
                            <Button variant="outline" className="h-16 flex-1 rounded-2xl text-lg font-bold transition-all hover:scale-[1.02] active:scale-95">
                                Subscribe & Save 15%
                            </Button>
                        </div>

                        <p className="mt-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                            Secure Checkout • Fast Shipping • Discreet Packaging
                        </p>
                    </div>
                </div>

                {/* Related Products Section */}
                <section className="mt-32 border-t border-border/40 pt-24">
                    <div className="flex items-end justify-between">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold tracking-tighter text-foreground">
                                Pairs <span className="text-muted-foreground">Well.</span>
                            </h2>
                            <p className="text-lg font-medium text-muted-foreground">Everything you need for a complete ritual.</p>
                        </div>
                        <Link href="/shop" className="hidden font-bold text-foreground underline decoration-2 underline-offset-8 transition-opacity hover:opacity-70 sm:block">
                            View All Products
                        </Link>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedProducts.map((rel) => (
                            <Link key={rel.id} href={`/shop/product/${rel.handle}`} className="group relative flex flex-col">
                                <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl border border-border/40 bg-muted/30 transition-all duration-500 hover:shadow-xl">
                                    <Image
                                        src={rel.image}
                                        alt={rel.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>
                                <div className="mt-6 space-y-1">
                                    <h3 className="text-lg font-bold tracking-tight text-foreground">{rel.title}</h3>
                                    <p className="text-base font-bold text-muted-foreground">{rel.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}
