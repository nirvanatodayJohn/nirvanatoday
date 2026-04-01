"use client"

import Image from "next/image"
import Link from "next/link"
import {
    FilterIcon,
    Sorting02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"

type Product = {
    id: string
    name: string
    category: string
    price: string
    compareAtPrice?: string
    image: string
    badge?: string
}

// Reuse the artwork generation logic or mock images for now
const PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Twilight Nootropic Capsules",
        category: "Capsules",
        price: "$26.99",
        compareAtPrice: "$34.99",
        image: "https://nirvanatoday.com/wp-content/uploads/2026/04/Capsules.png",
        badge: "Sleep Support",
    },
    {
        id: "2",
        name: "Energy Nootropic Capsules",
        category: "Capsules",
        price: "$26.99",
        image: "https://nirvanatoday.com/wp-content/uploads/2026/04/Capsules.png",
        badge: "Focus",
    },
    {
        id: "3",
        name: "Premium CBD Gummies",
        category: "Gummies",
        price: "$29.99",
        compareAtPrice: "$39.99",
        image: "https://nirvanatoday.com/wp-content/uploads/2026/04/Gummies.png",
        badge: "Best Seller",
    },
    {
        id: "4",
        name: "Sleep Oil Tincture",
        category: "Tinctures",
        price: "$34.99",
        image: "https://nirvanatoday.com/wp-content/uploads/2026/04/T2.png",
        badge: "1500mg",
    },
    {
        id: "5",
        name: "THCP Vape - Blue Dream",
        category: "Vapes",
        price: "$44.99",
        image: "https://nirvanatoday.com/wp-content/uploads/2026/04/THCPVape.png",
        badge: "Trending",
    },
    {
        id: "6",
        name: "Pet Calm Tincture",
        category: "Pets",
        price: "$19.99",
        image: "https://nirvanatoday.com/wp-content/uploads/2026/04/PetsTincture.png",
        badge: "For Dogs & Cats",
    },
    {
        id: "7",
        name: "THCA Flower - Indoor Grown",
        category: "Flower",
        price: "$39.99",
        image: "https://nirvanatoday.com/wp-content/uploads/2026/04/CBDHemp.png",
        badge: "Premium Grade",
    },
    {
        id: "8",
        name: "Full Spectrum CBD Capsules",
        category: "Capsules",
        price: "$32.99",
        image: "https://nirvanatoday.com/wp-content/uploads/2026/04/Capsules.png",
    },
]

const CATEGORIES = ["All", "Gummies", "Tinctures", "Vapes", "Capsules", "Pets", "Flower"]

export default function ShopPage() {
    return (
        <main className="flex-1 bg-background">
            {/* Shop Header */}
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
            <div className="sticky top-20 z-30 border-b border-border/40 bg-background/80 backdrop-blur-xl">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                className="whitespace-nowrap rounded-full border border-border/60 bg-muted/50 px-5 py-2 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-95"
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="hidden items-center gap-4 sm:flex">
                        <button className="flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
                            <HugeiconsIcon icon={FilterIcon} strokeWidth={2} className="size-4" />
                            Filter
                        </button>
                        <button className="flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
                            <HugeiconsIcon icon={Sorting02Icon} strokeWidth={2} className="size-4" />
                            Sort
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <section className="py-12 sm:py-20">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {PRODUCTS.map((product) => (
                            <div key={product.id} className="group relative flex flex-col">
                                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-border/40 bg-muted/30 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                                    />

                                    {product.badge && (
                                        <div className="absolute left-6 top-6 z-10">
                                            <span className="inline-flex items-center rounded-full border border-black/5 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black shadow-xs backdrop-blur-md">
                                                {product.badge}
                                            </span>
                                        </div>
                                    )}

                                    <div className="absolute inset-x-0 bottom-0 translate-y-full p-6 transition-transform duration-500 group-hover:translate-y-0">
                                        <Button className="w-full rounded-2xl bg-foreground py-6 text-base font-bold text-background hover:bg-foreground/90">
                                            Quick Add
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col gap-2 px-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
                                            <Link href={`/shop/${product.id}`}>
                                                {product.name}
                                            </Link>
                                        </h3>
                                        <div className="flex flex-col items-end">
                                            <span className="text-lg font-bold text-foreground">{product.price}</span>
                                            {product.compareAtPrice && (
                                                <span className="text-xs text-muted-foreground line-through opacity-70">
                                                    {product.compareAtPrice}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium tracking-tight text-muted-foreground">
                                        {product.category}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination teaser */}
                    <div className="mt-24 flex flex-col items-center gap-8 border-t border-border/40 pt-16">
                        <p className="text-lg font-medium text-muted-foreground">Showing {PRODUCTS.length} of 48 products</p>
                        <Button variant="outline" className="h-14 rounded-full px-12 text-base font-bold transition-all hover:scale-105">
                            Load More Products
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}
