'use client';

import Image from "next/image";
import Link from "next/link";
import { HERO_CONTENT } from "@/lib/data";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export default function Hero() {
    
    return (
        <section className="relative isolate bg-card">
            <div className="container px-6">
                <div className="grid min-h-[calc(92svh-4rem)] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 ">
                    <div className="max-w-2xl space-y-7 text-center lg:text-left">
                        <h1 className="text-pretty text-4xl leading-[1.02] font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                            {HERO_CONTENT.title.prefix}
                            <br className="hidden sm:block" />
                            <span className="text-primary"> {HERO_CONTENT.title.emphasis}</span>
                            <br className="hidden sm:block" />
                            {HERO_CONTENT.title.suffix}
                        </h1>

                        <p className="max-w-xl text-base leading-tight text-muted-foreground lg:mx-0">
                            {HERO_CONTENT.description}
                        </p>

                        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 lg:justify-start">
                            {HERO_CONTENT.ctas.map((cta, index) => (
                                <Link
                                    key={cta.href}
                                    href={cta.href}
                                    className={cn(
                                        buttonVariants({ variant: cta.variant ?? "default", size: "lg" }),
                                        "h-11 rounded-full px-7 text-xs font-semibold tracking-widest sm:h-12 sm:px-8",
                                        index === 0 && "shadow-sm"
                                    )}
                                >
                                    {cta.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-2xl">
                        <div className="relative">
                            <div className="relative overflow-hidden">
                                <Image
                                    src={HERO_CONTENT.image.src}
                                    width={HERO_CONTENT.image.width}
                                    height={HERO_CONTENT.image.height}
                                    alt={HERO_CONTENT.image.alt}
                                    className="size-full bg-transparent object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-border/60 bg-card">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-8 py-7 sm:py-8 md:grid-cols-4">
                        {HERO_CONTENT.stats.map((stat) => (
                            <div key={stat.label} className="space-y-1.5">
                                <p className="text-[0.7rem] font-semibold text-muted-foreground">
                                    {stat.label}
                                </p>
                                <p className="text-3xl leading-none font-light tracking-tight text-foreground sm:text-4xl">
                                    {stat.value}
                                </p>
                                {stat.detail ? (
                                    <p className="text-xs leading-relaxed text-muted-foreground">{stat.detail}</p>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}