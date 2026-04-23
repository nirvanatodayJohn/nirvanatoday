"use client";

import { useState } from "react";
import NextImage from "next/image";
import {
  CheckmarkCircle01Icon,
  SearchAddIcon,
  Shield01Icon,
  TruckIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import type { Product } from "@/lib/shopify";
import ProductActions from "@/components/custom/ProductActions";
import ReviewStars from "@/components/custom/ReviewStars";

const productTrustPoints = [
  { icon: CheckmarkCircle01Icon, label: "Lab Tested" },
  { icon: TruckIcon, label: "Free Shipping" },
  { icon: Shield01Icon, label: "Non-GMO" },
] as const;

export default function ProductDetailHero({ product }: { product: Product }) {
  const interactiveVariants = (product.variants ?? []).filter(
    (variant) => variant.title && variant.title.toLowerCase() !== "default title"
  );
  const initialVariantId =
    (interactiveVariants.length > 0) ? (interactiveVariants.find((variant) => variant.image)?.id ??
    interactiveVariants[0]?.id) : product.id;
  
  const [selectedVariantId, setSelectedVariantId] = useState(initialVariantId || product.id);
  const [zoomPosition, setZoomPosition] = useState({
    x: 50,
    y: 50,
    active: false,
  });

  const selectedVariant = interactiveVariants.find(
    (variant) => variant.id === selectedVariantId
  );
  const displayImage = selectedVariant?.image || product.image;
  const displayPrice = selectedVariant?.price || product.price;
  const showCompareAtPrice =
    !selectedVariant || selectedVariant.price === product.price;

  const handleImageMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setZoomPosition({ x, y, active: true });
  };

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
      <div className="space-y-2">
        <div
          className="relative aspect-square w-full overflow-hidden"
          onMouseMove={handleImageMove}
          onMouseLeave={() =>
            setZoomPosition((current) => ({ ...current, active: false }))
          }
        >
          <NextImage
            src={displayImage}
            alt={
              selectedVariant
                ? `${product.title} - ${selectedVariant.title}`
                : product.title
            }
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-10 transition-transform duration-200 ease-out"
            style={{
              transform: zoomPosition.active ? "scale(1.9)" : "scale(1)",
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
            priority
          />
          {product.badge && (
            <div className="absolute left-4 top-4">
              <span className="inline-flex items-center rounded-full border border-black/5 bg-white/90 px-4 py-1.5 text-xs font-bold tracking-[0.22em] text-black shadow-lg backdrop-blur-md">
                {product.badge}
              </span>
            </div>
          )}
          <div className="absolute bottom-5 right-5 hidden items-center gap-2 rounded-full border bg-white p-2 text-xs font-semibold tracking-wide text-foreground shadow-sm backdrop-blur-md md:inline-flex">
            <HugeiconsIcon icon={SearchAddIcon} className="size-4" />
          </div>
        </div>

        {interactiveVariants.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {interactiveVariants.map((variant) => {
              const variantImage = variant.image || product.image;
              const isSelected = selectedVariantId === variant.id;

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`group flex items-center gap-2 rounded-2xl border px-2 py-2 text-left transition-all ${isSelected
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border bg-card hover:border-primary"
                    }`}
                >
                  <div className="relative size-14 overflow-hidden rounded-xl">
                    <NextImage
                      src={variantImage}
                      alt={`${product.title} - ${variant.title}`}
                      fill
                      sizes="56px"
                      className="object-contain p-1.5"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <p
                      className={`text-sm font-bold ${isSelected
                        ? "text-foreground"
                        : "text-muted-foreground"
                        }`}
                    >
                      {variant.title}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">
                      {variant.price}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-start p-6 sm:p-8">
        <div className="space-y-4">
          <h1 className="font-serif text-3xl font-bold tracking-normal text-foreground sm:text-4xl">
            {product.title}
          </h1>

          <ReviewStars rating={product.rating} count={product.reviewCount} />

          <div className="flex items-end gap-4">
            <span className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              {displayPrice}
            </span>
            {product.compareAtPrice && showCompareAtPrice && (
              <span className="pb-1 text-lg text-muted-foreground line-through opacity-60">
                {product.compareAtPrice}
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          {productTrustPoints.map((point) => (
            <div key={point.label} className="flex items-center gap-2">
              <HugeiconsIcon
                icon={point.icon}
                className="size-4 text-muted-foreground"
              />
              <span className="text-xs font-bold tracking-widest text-muted-foreground">
                {point.label}
              </span>
            </div>
          ))}
        </div>

        <ProductActions
          product={product}
          selectedVariantId={selectedVariantId}
          onVariantChange={setSelectedVariantId}
        />

        <p className="mt-4 text-xs font-semibold text-muted-foreground">
          Secure checkout | Fast shipping | Discreet packaging
        </p>
      </div>
    </div>
  );
}
