"use client"

import {
    ArrowRight01Icon,
    Certificate01Icon,
    CheckmarkCircle02Icon,
    FlowerIcon,
    Heart,
    PackageIcon,
    SecurityIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

export default function AboutUsPage() {
    return (
        <main className="flex-1 bg-background">
            {/* Hero Section */}
            <section className="py-24 sm:py-32 lg:py-40">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl lg:text-6xl">
                            About <br />
                            <span className="text-muted-foreground">Nirvana Today.</span>
                        </h1>
                        <p className="mt-12 max-w-3xl text-xl font-medium tracking-tight text-muted-foreground sm:text-2xl lg:text-3xl">
                            Nirvana Today is a company that promotes wellness through the use of hemp products.
                            Hemp is a natural plant that has been used for thousands of years to promote health and well-being.
                        </p>
                    </div>
                </div>
            </section>

            {/* High-Quality Hemp & Healthy Living (Side-by-side style) */}
            <section className="bg-muted py-24 sm:py-32">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
                        <div className="flex flex-col gap-8">
                            <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
                                High-Quality <br />
                                <span className="text-muted-foreground">Hemp.</span>
                            </h2>
                            <p className="text-lg font-medium tracking-tight text-muted-foreground sm:text-xl">
                                Nirvana Today uses non-GMO plants to ensure our products are safe and healthy.
                                Our hemp is grown organically, without pesticides or other harmful chemicals.
                                We strive to provide customers with the highest quality products while ensuring the health and safety of all our CBD oil users.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="flex size-14 items-center justify-center rounded-2xl bg-background text-primary shadow-xs">
                                    <HugeiconsIcon icon={FlowerIcon} strokeWidth={1.5} className="size-7" />
                                </div>
                                <span className="text-sm font-bold uppercase tracking-widest text-foreground">Non-GMO & Organic</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
                                Healthy <br />
                                <span className="text-muted-foreground">Living.</span>
                            </h2>
                            <p className="text-lg font-medium tracking-tight text-muted-foreground sm:text-xl">
                                Hemp has been used for centuries to promote mind and body wellness.
                                The popular plant contains over 500 naturally occurring compounds, including more than 100 phytocannabinoids similar to CBD.
                                The organic formula also has terpenes, which account for the sweet aromas, and plenty of nutrients ideal for your well-being.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="flex size-14 items-center justify-center rounded-2xl bg-background text-primary shadow-xs">
                                    <HugeiconsIcon icon={Heart} strokeWidth={1.5} className="size-7" />
                                </div>
                                <span className="text-sm font-bold uppercase tracking-widest text-foreground">500+ Natural Compounds</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mid-page Statement */}
            <section className="py-24 sm:py-32 lg:py-48">
                <div className="mx-auto w-full max-w-5xl px-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl lg:text-5xl">
                        Reach Nirvana with premium CBD products.
                    </h2>
                    <p className="mt-12 text-xl font-medium tracking-tight text-muted-foreground sm:text-2xl">
                        Hemp CBD oil is a natural anti-inflammatory and can help reduce everyday discomforts,
                        such as common complaints following a challenging workout.
                        The ancient compound also helps promote better sleep, mood, and focus by balancing the body’s endocannabinoid system.
                    </p>
                </div>
            </section>

            {/* Calmness & Daily Challenges (Bento-style Cards) */}
            <section className="bg-muted py-24 sm:py-32">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="flex flex-col justify-between rounded-[2.5rem] bg-background p-8 sm:p-12 lg:p-16 transition-transform hover:scale-[1.01]">
                            <div className="flex flex-col gap-8">
                                <h3 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
                                    Experience Calmness.
                                </h3>
                                <p className="text-lg font-medium tracking-tight text-muted-foreground sm:text-xl">
                                    The hemp-based CBD oil used in Nirvana Today products is a highly effective natural remedy for reducing stress.
                                    Our organic product is non-psychoactive, meaning it doesn’t produce a “high”.
                                    Experience the benefits of reduced anxious thoughts without worrying about side effects.
                                </p>
                            </div>
                            <div className="mt-12 flex items-center gap-3 text-primary">
                                <HugeiconsIcon icon={SecurityIcon} strokeWidth={2} className="size-6" />
                                <span className="text-sm font-bold uppercase tracking-widest">Non-Psychoactive</span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between rounded-[2.5rem] bg-background p-8 sm:p-12 lg:p-16 transition-transform hover:scale-[1.01]">
                            <div className="flex flex-col gap-8">
                                <h3 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
                                    Overcome Daily Challenges.
                                </h3>
                                <p className="text-lg font-medium tracking-tight text-muted-foreground sm:text-xl">
                                    Our tinctures, gummies, capsules, and topicals are the ideal plant-based supplements to add to your daily wellness routine.
                                    The formulas are non-addictive and safe for all ages, helping reduce discomfort from muscle aches, sleeplessness, or mental fatigue.
                                </p>
                            </div>
                            <Link
                                href="/shop"
                                className="mt-12 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary transition-all hover:gap-3"
                            >
                                Shop the collection
                                <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2.5} className="size-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Safe & Pure / Customer Service (Minimal List) */}
            <section className="py-24 sm:py-32 lg:py-48">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
                        <div className="flex flex-col gap-12">
                            <div className="flex flex-col gap-6">
                                <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
                                    Safe. Pure. <br />
                                    <span className="text-muted-foreground">Certified.</span>
                                </h2>
                                <p className="text-lg font-medium tracking-tight text-muted-foreground sm:text-xl">
                                    All batches go through third-party testing to ensure purity and potency.
                                    Independent labs verify our products are free from chemicals, molds, heavy metals, and other contaminants.
                                </p>
                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col items-center gap-2">
                                        <HugeiconsIcon icon={Certificate01Icon} strokeWidth={1} className="size-16 text-foreground/20" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Lab Tested</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={1} className="size-16 text-foreground/20" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">COA Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-12 rounded-[2.5rem] border border-border/60 bg-muted/30 p-8 sm:p-12">
                            <h3 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
                                Highest Customer <br /> Service Standards.
                            </h3>
                            <p className="text-lg font-medium tracking-tight text-muted-foreground sm:text-xl">
                                Nirvana Today is dedicated to ensuring our customers receive the best experience possible.
                                Our team’s always available to help you find the right hemp CBD supplements for your wellness needs.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="flex size-14 items-center justify-center rounded-2xl bg-background text-primary shadow-xs">
                                    <HugeiconsIcon icon={PackageIcon} strokeWidth={1.5} className="size-7" />
                                </div>
                                <span className="text-sm font-bold uppercase tracking-widest text-foreground">Dedicated Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-foreground py-24 sm:py-32 lg:py-48 text-center text-background">
                <div className="mx-auto w-full max-w-5xl px-4">
                    <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                        Believe in a product you can trust.
                    </h2>
                    <p className="mt-12 text-xl font-medium tracking-tight text-background/70 sm:text-2xl">
                        Achieve a new level of calm with Nirvana Today.
                    </p>
                    <div className="mt-16">
                        <Link
                            href="/shop"
                            className="inline-flex h-16 items-center justify-center rounded-full bg-background px-12 text-lg font-bold text-foreground transition-transform hover:scale-105 active:scale-95"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
