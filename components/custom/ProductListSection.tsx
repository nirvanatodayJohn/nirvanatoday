import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight01Icon,
  Leaf01Icon,
  PackageIcon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";

type Product = {
  name: string;
  family: string;
  subtitle: string;
  price: string;
  compareAtPrice: string;
  badge: string;
  imageSrc: string;
  imageAlt: string;
};

function toDataUri(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createBottleArtwork({
  labelTop,
  labelMiddle,
  labelBottom,
  accent = "#6ea94f",
}: {
  labelTop: string;
  labelMiddle: string;
  labelBottom: string;
  accent?: string;
}) {
  return toDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640" fill="none">
      <defs>
        <filter id="shadow" x="0" y="0" width="640" height="640" color-interpolation-filters="sRGB">
          <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#1c2819" flood-opacity="0.18"/>
        </filter>
        <linearGradient id="glass" x1="320" y1="54" x2="320" y2="520" gradientUnits="userSpaceOnUse">
          <stop stop-color="#fffef7"/>
          <stop offset="1" stop-color="#e9eadf"/>
        </linearGradient>
        <linearGradient id="cap" x1="230" y1="40" x2="410" y2="108" gradientUnits="userSpaceOnUse">
          <stop stop-color="#2c2d2d"/>
          <stop offset="0.5" stop-color="#77797c"/>
          <stop offset="1" stop-color="#202123"/>
        </linearGradient>
      </defs>
      <rect width="640" height="640" rx="36" fill="#eef4e4"/>
      <g filter="url(#shadow)">
        <rect x="230" y="42" width="180" height="70" rx="18" fill="url(#cap)"/>
        <rect x="210" y="94" width="220" height="410" rx="100" fill="url(#glass)" stroke="#c9ccc3" stroke-width="6"/>
        <rect x="230" y="168" width="180" height="220" rx="10" fill="#fffefb" stroke="${accent}" stroke-width="4"/>
        <rect x="242" y="180" width="156" height="196" rx="8" fill="#fffefb" stroke="${accent}" stroke-width="2"/>
        <circle cx="285" cy="235" r="34" fill="#d9ebbe"/>
        <path d="M267 248c18-6 31-25 35-48 17 20 21 41 13 62-22 1-36-4-48-14Z" fill="${accent}"/>
        <path d="M284 214c8 17 9 31 3 45" stroke="#fffef7" stroke-width="5" stroke-linecap="round"/>
        <text x="320" y="252" text-anchor="middle" fill="#4c7f3a" font-family="Arial, sans-serif" font-size="21" font-weight="700">Nirvana</text>
        <text x="320" y="278" text-anchor="middle" fill="#4c7f3a" font-family="Arial, sans-serif" font-size="21" font-weight="700">Today</text>
        <text x="320" y="315" text-anchor="middle" fill="#363634" font-family="Arial, sans-serif" font-size="17">${labelTop}</text>
        <text x="320" y="351" text-anchor="middle" fill="#242421" font-family="Georgia, serif" font-size="31">${labelMiddle}</text>
        <text x="320" y="388" text-anchor="middle" fill="#b28f37" font-family="Arial, sans-serif" font-size="17">${labelBottom}</text>
      </g>
    </svg>
  `);
}

function createRollOnArtwork() {
  return toDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640" fill="none">
      <defs>
        <filter id="shadow" x="0" y="0" width="640" height="640" color-interpolation-filters="sRGB">
          <feDropShadow dx="0" dy="18" stdDeviation="20" flood-color="#1c2819" flood-opacity="0.16"/>
        </filter>
        <linearGradient id="body" x1="320" y1="110" x2="320" y2="500" gradientUnits="userSpaceOnUse">
          <stop stop-color="#fffefb"/>
          <stop offset="1" stop-color="#ecece6"/>
        </linearGradient>
        <linearGradient id="cap" x1="282" y1="66" x2="360" y2="186" gradientUnits="userSpaceOnUse">
          <stop stop-color="#d5d5d5"/>
          <stop offset="1" stop-color="#fafafa"/>
        </linearGradient>
      </defs>
      <rect width="640" height="640" rx="36" fill="#eef4e4"/>
      <g filter="url(#shadow)">
        <rect x="186" y="350" width="90" height="120" rx="28" fill="#d6d3d0"/>
        <rect x="276" y="88" width="120" height="82" rx="36" fill="url(#cap)"/>
        <circle cx="336" cy="82" r="42" fill="#a6a6a6"/>
        <rect x="250" y="158" width="160" height="330" rx="70" fill="url(#body)" stroke="#cbcec5" stroke-width="6"/>
        <rect x="268" y="220" width="124" height="188" rx="8" fill="#fffefb" stroke="#6ea94f" stroke-width="3"/>
        <circle cx="308" cy="270" r="26" fill="#d9ebbe"/>
        <path d="M293 279c13-4 22-18 25-35 12 14 15 31 8 46-15 0-25-3-33-11Z" fill="#6ea94f"/>
        <text x="332" y="280" text-anchor="middle" fill="#4c7f3a" font-family="Arial, sans-serif" font-size="16" font-weight="700">Nirvana</text>
        <text x="332" y="300" text-anchor="middle" fill="#4c7f3a" font-family="Arial, sans-serif" font-size="16" font-weight="700">Today</text>
        <text x="330" y="340" text-anchor="middle" fill="#262622" font-family="Georgia, serif" font-size="20">CBD</text>
        <text x="330" y="367" text-anchor="middle" fill="#262622" font-family="Georgia, serif" font-size="20">ROLL-ON GEL</text>
        <text x="330" y="394" text-anchor="middle" fill="#b28f37" font-family="Arial, sans-serif" font-size="18">4500 MG</text>
      </g>
    </svg>
  `);
}

function createDropperArtwork() {
  return toDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640" fill="none">
      <defs>
        <filter id="shadow" x="0" y="0" width="640" height="640" color-interpolation-filters="sRGB">
          <feDropShadow dx="0" dy="18" stdDeviation="20" flood-color="#1c2819" flood-opacity="0.18"/>
        </filter>
        <linearGradient id="glass" x1="320" y1="160" x2="320" y2="470" gradientUnits="userSpaceOnUse">
          <stop stop-color="#d9981f"/>
          <stop offset="1" stop-color="#7d4f10"/>
        </linearGradient>
      </defs>
      <rect width="640" height="640" rx="36" fill="#eef4e4"/>
      <g filter="url(#shadow)">
        <rect x="300" y="60" width="40" height="90" rx="18" fill="#262727"/>
        <rect x="274" y="132" width="92" height="74" rx="22" fill="#1f2021"/>
        <rect x="250" y="194" width="140" height="252" rx="34" fill="url(#glass)"/>
        <rect x="267" y="258" width="106" height="120" rx="10" fill="#fffefb" stroke="#6ea94f" stroke-width="3"/>
        <circle cx="302" cy="301" r="20" fill="#d9ebbe"/>
        <path d="M290 307c10-3 17-14 19-27 9 11 11 24 6 35-11 1-19-2-25-8Z" fill="#6ea94f"/>
        <text x="322" y="306" text-anchor="middle" fill="#4c7f3a" font-family="Arial, sans-serif" font-size="13" font-weight="700">Nirvana</text>
        <text x="322" y="323" text-anchor="middle" fill="#4c7f3a" font-family="Arial, sans-serif" font-size="13" font-weight="700">Today</text>
        <text x="320" y="346" text-anchor="middle" fill="#262622" font-family="Georgia, serif" font-size="17">SLEEP</text>
        <text x="320" y="370" text-anchor="middle" fill="#262622" font-family="Georgia, serif" font-size="16">OIL TINCTURE</text>
        <text x="320" y="394" text-anchor="middle" fill="#b28f37" font-family="Arial, sans-serif" font-size="17">1500 MG</text>
      </g>
    </svg>
  `);
}

const PRODUCTS: Product[] = [
  {
    name: "Twilight Capsules",
    family: "Nootropic",
    subtitle: "Natural evening support",
    price: "$26.99",
    compareAtPrice: "$34.99",
    badge: "Night formula",
    imageSrc: createBottleArtwork({
      labelTop: "NOOTROPIC",
      labelMiddle: "TWILIGHT",
      labelBottom: "CAPSULES",
    }),
    imageAlt: "Nirvana Today Twilight Capsules bottle illustration",
  },
  {
    name: "Energy Capsules",
    family: "Nootropic",
    subtitle: "Clean daytime focus",
    price: "$26.99",
    compareAtPrice: "$34.99",
    badge: "Day formula",
    imageSrc: createBottleArtwork({
      labelTop: "NOOTROPIC",
      labelMiddle: "ENERGY",
      labelBottom: "CAPSULES",
    }),
    imageAlt: "Nirvana Today Energy Capsules bottle illustration",
  },
  {
    name: "CBD Roll-On Gel",
    family: "Topical",
    subtitle: "Targeted recovery feel",
    price: "$39.99",
    compareAtPrice: "$49.99",
    badge: "4500 mg",
    imageSrc: createRollOnArtwork(),
    imageAlt: "Nirvana Today CBD Roll-On Gel illustration",
  },
  {
    name: "Sleep Oil Tincture",
    family: "Tincture",
    subtitle: "Evening wind-down",
    price: "$34.99",
    compareAtPrice: "$44.99",
    badge: "1500 mg",
    imageSrc: createDropperArtwork(),
    imageAlt: "Nirvana Today Sleep Oil Tincture bottle illustration",
  },
];

export default function ProductListSection() {
  return (
    <section className="border-b border-border/60 bg-linear-to-b from-background via-background to-muted/20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-sm font-medium text-primary">
              <HugeiconsIcon icon={Leaf01Icon} strokeWidth={1.8} className="size-4" />
              Featured products
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                A tighter, more balanced product shelf built around your actual lineup.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                The card proportions are smaller, the spacing is calmer, and the content hierarchy is
                cleaner so the section feels premium instead of oversized.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-sm text-muted-foreground">
              <HugeiconsIcon icon={Shield01Icon} strokeWidth={1.8} className="size-4 text-primary" />
              Lab-tested quality
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-sm text-muted-foreground">
              <HugeiconsIcon icon={PackageIcon} strokeWidth={1.8} className="size-4 text-primary" />
              Discreet shipping
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <article
              key={product.name}
              className="group flex h-full flex-col rounded-xl border border-border/70 bg-card p-2.5  transition-all duration-300 shadow-md"
            >
              <div className="relative overflow-hidden rounded-2xl border border-primary/12">
                <span className="rounded-full absolute inset-x-3 top-3 z-10 border bg-white/75 px-2.5 py-1 text-xs font-medium w-fit text-muted-foreground backdrop-blur">
                  {product.family}
                </span>

                <div className="relative aspect-[1.02/1] px-4 pb-2 pt-9">
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    fill
                    unoptimized
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col px-1 pb-1 pt-3.5">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {product.name}
                </h3>
                <div className="mt-auto pt-2">
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex items-end gap-2">
                      <span className="text-xl font-semibold text-foreground">
                        {product.price}
                      </span>
                      <span className="pb-0.5 text-xs text-muted-foreground line-through">
                        {product.compareAtPrice}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button className="min-w-0">Add to cart</Button>
                    <Button variant="outline" className="min-w-0 px-3">
                      Shop now
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
