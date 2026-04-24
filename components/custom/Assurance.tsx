"use client"

import {
    ArrowRight01Icon,
    Certificate01Icon,
    CheckmarkCircle02Icon,
    FlowerIcon,
    GlobalIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

const ASSURANCES = [
    {
        icon: CheckmarkCircle02Icon,
        label: "3rd-Party Tested.",
        description: "Rigorous independent lab testing for verifiable purity and precision potency across our entire lineup.",
    },
    {
        icon: GlobalIcon,
        label: "Made in USA.",
        description: "Proudly grown, harvested, and manufactured natively within the United States with strict oversight.",
    },
    {
        icon: FlowerIcon,
        label: "Organic Hemp.",
        description: "Exclusively sourced from premium, sustainably farmed organic hemp crops for the cleanest extracts seamlessly.",
    },
    {
        icon: Certificate01Icon,
        label: "GMP Certified.",
        description: "Produced in Good Manufacturing Practice certified and heavily regulated facilities you can completely trust.",
    },
]

export default function Assurance() {
    return (
        <section className="border-t py-16">
            <div className="w-full px-4">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

                    {/* Left Column: Sticky Title (Apple style scroll effect) */}
                    <div className="flex flex-col items-start lg:py-8">
                        <div className="sticky top-32 space-y-4">
                            <div className="space-y-4">
                                <h2 className="text-2xl leading-15 font-bold tracking-tighter text-foreground sm:text-3xl">
                                    Absolute <br />
                                    <span className="text-primary">transparency.</span>
                                </h2>
                                <p className="max-w-md text-base font-medium tracking-tight text-muted-foreground lg:text-base">
                                    We publish Certificates of Analysis for potency and purity on every product, so you know exactly what you are getting.
                                </p>
                            </div>
                            <div>
                                <Link
                                    href="/lab-results"
                                    className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-background"
                                >
                                    View Lab Results
                                    <HugeiconsIcon
                                        icon={ArrowRight01Icon}
                                        strokeWidth={2}
                                        className="size-5 transition-transform group-hover:translate-x-1"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Premium feature list */}
                    <div className="flex flex-col gap-4">
                        {ASSURANCES.map((item, index) => (
                            <div
                                key={index}
                                className="group flex flex-col gap-4 border bg-card rounded-2xl py-12 px-8 sm:py-14"
                            >
                                <HugeiconsIcon
                                    icon={item.icon}
                                    strokeWidth={0.5}
                                    className="size-24 text-foreground transition-transform duration-700 ease-out group-hover:scale-110 sm:size-32"
                                />
                                <div className="mt-2 flex flex-col gap-3">
                                    <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                        {item.label}
                                    </h3>
                                    <p className="max-w-xl text-base font-medium tracking-tight text-muted-foreground sm:text-lg">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
