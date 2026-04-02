"use client"

import {
    Award01Icon,
    Certificate01Icon,
    FlowerIcon,
    SmileIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "@/lib/utils"

const FEATURES = [
    {
        title: "Third-Party Tested.",
        description: "Zero guesswork. Every batch comes with a rigorous Certificate of Analysis for absolute peace of mind.",
        icon: Certificate01Icon,
        className: "md:col-span-3",
        iconClassName: "size-48 sm:size-64",
    },
    {
        title: "Veteran Owned.",
        description: "Built strictly on integrity. Honest pricing. Proudly made in the USA.",
        icon: Award01Icon,
        className: "md:col-span-2",
        iconClassName: "size-40 sm:size-52",
    },
    {
        title: "For Pets.",
        description: "Trusted, specialized formulas safe enough for your furry companions.",
        icon: SmileIcon,
        className: "md:col-span-2",
        iconClassName: "size-40 sm:size-52",
    },
    {
        title: "Full-Spectrum Range.",
        description: "Premium CBD, THCA flower, kratom, and nootropics engineered for calm, focus, and rapid recovery.",
        icon: FlowerIcon,
        className: "md:col-span-3",
        iconClassName: "size-48 sm:size-64",
    },
]

export default function WhyChooseUs() {
    return (
        <section className="py-24 sm:py-32">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-20 flex max-w-4xl flex-col items-center text-center">
                    <h2 className="text-5xl font-bold tracking-tighter text-foreground sm:text-7xl">
                        Uncompromising quality.<br />
                        <span className="text-muted-foreground">For everyone.</span>
                    </h2>
                </div>

                {/* 3:2 / 2:3 Asymmetric Bento Grid - Ultra clean, margin-based */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:grid-rows-2">
                    {FEATURES.map((feature, index) => (
                        <div
                            key={index}
                            className={cn(
                                "group relative flex min-h-96 flex-col items-center justify-between overflow-hidden rounded-3xl bg-muted p-8 pt-12 text-center sm:p-12 sm:pt-16",
                                feature.className
                            )}
                        >
                            <div className="z-10 flex flex-col items-center gap-4">
                                <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                    {feature.title}
                                </h3>
                                <p className="max-w-md text-lg font-medium tracking-tight text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>

                            <div className="pointer-events-none mt-12 flex w-full flex-1 items-end justify-center">
                                {/* Ultra-thin, massive centerpiece icon */}
                                <HugeiconsIcon
                                    icon={feature.icon}
                                    strokeWidth={0.5}
                                    className={cn(
                                        "text-muted-foreground",
                                        feature.iconClassName
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
