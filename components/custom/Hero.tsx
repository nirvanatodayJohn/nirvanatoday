'use client';

import Image from "next/image";
import Link from "next/link";
import { HERO_CONTENT } from "@/lib/data";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export default function Hero() {

    return (
        <section className="bg-card px-10">
            <div className="mx-auto w-full max-w-7xl sm:py-0 py-8">
                <div className="grid min-h-[calc(80svh-4rem)] items-center gap-12 lg:grid-cols-5 lg:gap-16">
                    <div className="space-y-7 text-left lg:col-span-3">
                        <h1 className="text-pretty font-serif text-4xl font-black tracking-normal text-foreground md:text-5xl lg:text-6xl">
                            {HERO_CONTENT.title.prefix}
                            <br />
                            <span className="text-primary"> {HERO_CONTENT.title.emphasis}</span>
                            <br />
                            {HERO_CONTENT.title.suffix}
                        </h1>

                        <p className="text-base leading-tight text-muted-foreground lg:mx-0">
                            {HERO_CONTENT.description}
                        </p>

                        <div className="flex items-center justify-center gap-2 sm:flex-row sm:gap-4 lg:justify-start">
                            {HERO_CONTENT.ctas.map((cta, index) => (
                                <Link
                                    key={cta.href}
                                    href={cta.href}
                                    className={cn(
                                        buttonVariants({ variant: cta.variant ?? "default", size: "lg" }),
                                        "h-11 rounded-full px-5 text-xs font-semibold tracking-widest sm:h-12 sm:px-8",
                                        index === 0 && "shadow-sm"
                                    )}
                                >
                                    {cta.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="relative mx-auto w-full lg:col-span-2 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-[280px] xl:max-w-[340px]">
                            <div className="relative overflow-hidden">
                                <Image
                                    src={HERO_CONTENT.image.src}
                                    width={HERO_CONTENT.image.width}
                                    height={HERO_CONTENT.image.height}
                                    alt={HERO_CONTENT.image.alt}
                                    className="h-auto w-full bg-transparent object-contain animate-fade-in"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-border/60 bg-card">
                <div className="mx-auto w-full max-w-7xl px-10">
                    <div className="flex justify-evenly gap-8 py-7 sm:py-8 md:grid-cols-4">
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