"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [api, isPaused]);

  return (
    <section className="bg-secondary/20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl lg:text-5xl">
            Shop by category. <span className="text-muted-foreground font-semibold">Take a look at what's right for you.</span>
          </h2>
        </div>
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
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
            <CarouselContent className="flex -ml-4 sm:-ml-6 lg:-ml-8">
              {SHOP_CATEGORIES.map((category) => (
                <CarouselItem key={category.name} className="basis-auto py-4 pl-4 sm:pl-6 lg:pl-8">
                  <Link
                    href={category.href}
                    className="group relative block h-80 w-72 shrink-0 overflow-hidden rounded-[2rem] border border-border/40 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/5 sm:w-80 md:h-120 md:w-96"
                  >
                    <Image
                      loading="eager"
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 28vw"
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
                      <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {category.name}
                      </h3>

                      <div className="mt-2 flex items-center gap-2 tracking-wide text-foreground transition-all group-hover:text-primary">
                        <span className="text-sm font-bold">
                          Explore collection
                        </span>
                        <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2.5} className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                      </div>
                    </div>

                    <ProgressiveBlur height="40%" position="bottom" className="z-10" />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="absolute left-2 top-1/2 z-40 size-12 border-border/40 bg-background/80 shadow-xs backdrop-blur-xl transition-all hover:bg-muted disabled:hidden" />
              <CarouselNext className="absolute right-2 top-1/2 z-40 size-12 border-border/40 bg-background/80 shadow-xs backdrop-blur-xl transition-all hover:bg-muted disabled:hidden" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
