"use client"

import {
    Cancel01Icon,
    CursorMagicSelection01FreeIcons,
    DeliveryTruck01Icon,
    FactoryIcon,
    PercentIcon,
    StarsIcon,
    StopIcon,
    Timer02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

const GIMMICKS = [
    { text: "No phony percentage discount off first order.", icon: PercentIcon },
    { text: "No phony slashed MSRP price.", icon: StopIcon },
    { text: "No phony rewards discount.", icon: StarsIcon },
    { text: "No phony referral discounts.", icon: CursorMagicSelection01FreeIcons },
    { text: "No phony time limit to buy.", icon: Timer02Icon },
    { text: "No phony spin-the-wheel games.", icon: CursorMagicSelection01FreeIcons },
]

export default function NoGimmicksPage() {
    return (
        <main className="flex-1 bg-background">
            {/* Header Section */}
            <section className="py-24 sm:py-32 lg:py-40">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl lg:text-6xl">
                            No <br />
                            <span className="text-muted-foreground">Gimmicks.</span>
                        </h1>
                        <p className="mt-12 max-w-2xl text-xl font-medium tracking-tight text-muted-foreground sm:text-2xl">
                            You are smarter than traditional marketing. It is the bottom line price that matters.
                            We believe in total transparency from the very first click.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="bg-muted py-24 sm:py-32">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
                        <div className="flex flex-col gap-6 rounded-[2.5rem] bg-background p-10 ring-1 ring-border/50">
                            <HugeiconsIcon icon={FactoryIcon} strokeWidth={1.5} className="size-12 text-primary" />
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">Direct Pricing.</h2>
                            <p className="text-base font-medium tracking-tight text-muted-foreground">
                                Direct factory to you pricing. We price our products low, right from the beginning, with your actual cost.
                            </p>
                        </div>
                        <div className="flex flex-col gap-6 rounded-[2.5rem] bg-background p-10 ring-1 ring-border/50">
                            <HugeiconsIcon icon={PercentIcon} strokeWidth={1.5} className="size-12 text-primary" />
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">Low Margins.</h2>
                            <p className="text-base font-medium tracking-tight text-muted-foreground">
                                We work on a low profit margin. No hidden markups just to offer "fake" discounts later.
                            </p>
                        </div>
                        <div className="flex flex-col gap-6 rounded-[2.5rem] bg-background p-10 ring-1 ring-border/50">
                            <HugeiconsIcon icon={DeliveryTruck01Icon} strokeWidth={1.5} className="size-12 text-primary" />
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">Always Free.</h2>
                            <p className="text-base font-medium tracking-tight text-muted-foreground">
                                Free shipping on every order. No minimums, no surprises at checkout. Just simple, honest delivery.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The "No" List Section */}
            <section className="py-24 sm:py-32">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
                        <div className="lg:w-1/3">
                            <h2 className="sticky top-32 text-2xl font-bold tracking-tighter text-foreground sm:text-3xl">
                                We don't <br /> do tricks.
                            </h2>
                        </div>
                        <div className="flex flex-col gap-8 lg:w-2/3">
                            {GIMMICKS.map((gimmick, index) => (
                                <div key={index} className="flex items-start gap-6 border-b border-border/50 pb-8 last:border-0 last:pb-0">
                                    <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                        <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-4" />
                                    </div>
                                    <span className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                                        {gimmick.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* The Rant Section (Popups etc) */}
            <section className="bg-rose-500 py-24 sm:py-32 lg:py-48 text-white">
                <div className="mx-auto w-full max-w-4xl px-4 text-center">
                    <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl lg:text-4xl">
                        No pop-ups. <br />
                        <span className="opacity-70 italic text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mt-4 block">"Pop ups make me puke!"</span>
                    </h2>
                    <p className="mt-12 text-lg font-medium tracking-tight sm:text-xl opacity-90 leading-relaxed">
                        No hoops to jump through. No trickery. We don't wait for you to abandon your cart just to offer a discount we should have given you at the start.
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 sm:py-32 lg:py-48 text-center">
                <div className="mx-auto w-full max-w-5xl px-4">
                    <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl lg:text-5xl">
                        Trust the bottom line.
                    </h2>
                    <p className="mt-12 text-lg font-medium tracking-tight text-muted-foreground sm:text-xl lg:text-2xl">
                        Experience honest pricing and high-quality wellness today.
                    </p>
                    <div className="mt-16">
                        <Link
                            href="/shop"
                            className="inline-flex h-16 items-center justify-center rounded-full bg-primary px-12 text-lg font-bold text-background transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
                        >
                            Shop Nirvana
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
