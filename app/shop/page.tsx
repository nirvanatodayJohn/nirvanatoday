import Image from "next/image"
import Link from "next/link"
import {
    FilterIcon,
    Sorting02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { getProducts } from "@/lib/shopify"
import AddToCartButton from "@/components/custom/AddToCartButton"

const CATEGORIES = ["All", "Gummies", "Tinctures", "Vapes", "Capsules", "Pets", "Flower"]

export default async function ShopPage() {
    const products = await getProducts();

    return (
        <main className="flex-1 bg-background">
            <section className="border-b border-border/40 py-16 sm:py-24">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-5xl font-bold tracking-tighter text-foreground sm:text-7xl">
                            Shop <span className="text-muted-foreground">All.</span>
                        </h1>
                        <p className="mt-8 max-w-2xl text-xl font-medium tracking-tight text-muted-foreground">
                            Clean, lab-tested formulas built for your daily wellness routine.
                            Direct pricing with no hidden gimmicks.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter & Sort Bar */}
            <div className="z-30 bg-muted">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 ${cat === "All"
                                    ? "bg-foreground text-background"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="hidden items-center gap-6 sm:flex">
                        <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground group">
                            <HugeiconsIcon icon={FilterIcon} strokeWidth={2.5} className="size-4" />
                            Filter
                        </button>
                        <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground group">
                            <HugeiconsIcon icon={Sorting02Icon} strokeWidth={2.5} className="size-4" />
                            Sort
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <section className="py-12 sm:py-20 lg:py-24">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <article key={product.id} className="group flex flex-col h-full bg-background transition-all duration-300">
                                <Link
                                    href={`/shop/product/${product.handle}`}
                                    className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-muted/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                                >
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                                    />

                                    {product.badge && (
                                        <div className="absolute left-6 top-6 z-10">
                                            <span className="inline-flex items-center rounded-full border border-black/5 bg-white/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-black shadow-xs backdrop-blur-xl">
                                                {product.badge}
                                            </span>
                                        </div>
                                    )}
                                </Link>

                                <div className="mt-8 flex flex-1 flex-col px-1">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-1">
                                            <Link href={`/shop/product/${product.handle}`}>
                                                <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary">
                                                    {product.title}
                                                </h3>
                                            </Link>
                                            <p className="text-sm font-medium tracking-tight text-muted-foreground">
                                                {product.category}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end pt-1">
                                            <span className="text-xl font-extrabold text-foreground tracking-tighter">{product.price}</span>
                                            {product.compareAtPrice && (
                                                <span className="text-[11px] font-bold text-muted-foreground line-through opacity-50">
                                                    {product.compareAtPrice}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                        <AddToCartButton product={product} />
                                        <Link href={`/shop/product/${product.handle}`} className="w-full">
                                            <Button variant="outline" className="w-full font-bold transition-all active:scale-95">
                                                Details
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Pagination teaser */}
                    <div className="mt-24 flex flex-col items-center gap-8 border-t border-border/40 pt-16">
                        <p className="text-lg font-medium text-muted-foreground">Showing {products.length} products</p>
                        <Button variant="outline" className="h-14 rounded-full px-12 text-base font-bold transition-all hover:scale-105">
                            Load More Products
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}

