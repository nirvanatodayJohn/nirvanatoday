"use client"

import {
    Cancel01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

const POINTS = [
    "No phony percentages.",
    "No slashed MSRP prices.",
    "No referral tricks.",
    "No spin-the-wheels.",
    "No last minute discounts.",
    "No pop-ups ever."
]

export default function NoGimmicksMain() {
    return (
        <section className="bg-rose-500 py-16 sm:py-24 overflow-hidden">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="flex flex-col gap-8 text-white">
                        <h2 className="text-5xl font-bold tracking-tighter sm:text-7xl">
                            No Gimmicks. <br/>
                            <span className="opacity-70">Just Wellness.</span>
                        </h2>
                        <p className="max-w-md text-xl font-medium tracking-tight opacity-90 sm:text-2xl">
                            We price our products low from the beginning. No phony games, no trickery, and definitely no pop-ups.
                        </p>
                        <div className="mt-8">
                            <Link 
                                href="/no-gimmicks" 
                                className="inline-flex h-14 items-center justify-center rounded-3xl bg-white px-8 text-lg font-bold text-rose-500 transition-transform hover:scale-105 active:scale-95"
                            >
                                Read the Manifesto
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {POINTS.map((point, index) => (
                            <div 
                                key={index} 
                                className="flex items-center gap-4 rounded-3xl bg-white/10 p-6 text-white backdrop-blur-xl ring-1 ring-white/20 transition-all hover:bg-white/15"
                            >
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20">
                                    <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-4" />
                                </div>
                                <span className="text-lg font-bold tracking-tight">{point}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
