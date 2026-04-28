"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ProgressiveBlur } from "../ui/progressive-blur";
import { SHOP_CATEGORIES } from "@/lib/data";


export default function ShopByCategory() {
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!api || isPaused) return;

    const intervalId = setInterval(() => {
      // Don't scroll if user is in another tab or the app is hidden
      if (document.hidden) return;

      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [api, isPaused]);

  return (
    <section className="border-t px-10 py-16 bg-card">
      <div className="w-full max-w-7xl">
        <div className="mb-2 space-y-1">
          <h2 className="text-2xl font-bold tracking-tighter text-foreground sm:text-3xl lg:text-4xl">
            Shop by category.
          </h2>
          <p className="text-muted-foreground font-semibold">Take a look at what's right for you.</p>
        </div>
      </div>
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative px-4"
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
          className="relative w-full"
        >
          <CarouselContent className="flex -ml-4 pr-4 sm:-ml-6 sm:pr-6 lg:-ml-8 lg:pr-8">
            {SHOP_CATEGORIES.map((category) => (
              <CarouselItem key={category.name} className="basis-auto py-4 pl-4 sm:pl-6 lg:pl-8">
                <Link
                  href={category.href}
                  className="group relative block h-96 sm:h-72 w-[78vw] max-w-sm shrink-0 overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/5 sm:w-80 md:h-120 md:w-96"
                >
                  <Image
                    priority
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 35vw, 28vw"
                    className="object-cover object-center"
                  />

                  {category.pill && (
                    <div className="absolute left-6 top-6 z-30 sm:left-8 sm:top-8">
                      <span className="inline-flex items-center rounded-full border border-black/5 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-black shadow-xs backdrop-blur-md">
                        {category.pill}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end p-6 sm:p-6">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {category.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 tracking-wide text-foreground transition-all group-hover:text-primary">
                      <span className="text-sm font-bold">
                        Shop
                      </span>
                      <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2.5} className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                    </div>
                  </div>

                  <ProgressiveBlur height="40%" position="bottom" className="z-10" />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute sm:block hidden inset-y-0 -right-1 z-30 w-10 bg-linear-to-l from-white via-white/95 to-transparent sm:w-14 lg:w-20"
          />
          <div className="hidden md:block">
            <button
              type="button"
              aria-label="Previous category"
              onClick={() => api?.scrollPrev()}
              className="absolute left-2 top-1/2 z-40 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-border/40 bg-background/85 text-foreground shadow-xs backdrop-blur-xl transition-all hover:scale-95 hover:bg-muted lg:left-4"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2.2} className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next category"
              onClick={() => api?.scrollNext()}
              className="absolute right-4 top-1/2 z-40 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-border/40 bg-background/85 text-foreground shadow-xs backdrop-blur-xl transition-all hover:scale-95 hover:bg-muted"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2.2} className="size-5" />
            </button>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
