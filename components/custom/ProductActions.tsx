"use client";

import { useCart } from "@/lib/store/useCart";
import { Button } from "@/components/ui/button";
import { handleCheckoutAction } from "@/app/actions/checkout";
import { useTransition, useState } from "react";
import { type Product } from "@/lib/shopify";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { addItem } = useCart();
  const [isPending, startTransition] = useTransition();

  // If we have variants, default to the first one
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants?.[0]?.id || product.id
  );

  const selectedVariant = product.variants?.find((v) => v.id === selectedVariantId) || product.variants?.[0];

  const onAddToCart = () => {
    // If we have a selected variant, use its information
    const cartItem = {
      id: selectedVariantId,
      handle: product.handle,
      title: selectedVariant ? `${product.title} - ${selectedVariant.title}` : product.title,
      price: selectedVariant?.price || product.price,
      image: product.image,
      category: product.category,
    };

    addItem(cartItem);
    toast.success(`Added ${cartItem.title} to cart`);
  };

  const onBuyNow = () => {
    startTransition(async () => {
      try {
        const result = await handleCheckoutAction([
          {
            id: selectedVariantId,
            quantity: 1,
          },
        ]);

        if (result?.webUrl) {
          window.location.href = result.webUrl;
        } else {
          console.error("Checkout creation failed:", result?.errors);
        }
      } catch (error) {
        console.error("Error creating checkout:", error);
      }
    });
  };

  return (
    <div className="mt-8 space-y-8">
      {/* Variant Selector */}
      {product.variants && product.variants.length > 1 && (
        <div className="space-y-4">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            Select Variety
          </label>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariantId(variant.id)}
                className={cn(
                  "px-6 py-3 rounded-xl border text-sm font-bold transition-all",
                  selectedVariantId === variant.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border/40 bg-muted/30 text-muted-foreground hover:border-border"
                )}
              >
                {variant.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Synchronized Price Display (Hidden if same as main, or used for emphasis) */}
      {selectedVariant && selectedVariant.price !== product.price && (
          <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Selected Price:</span>
              <span className="text-xl font-bold">{selectedVariant.price}</span>
          </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          variant="outline"
          className="h-16 flex-1 rounded-2xl text-lg font-bold transition-all hover:bg-muted"
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>
        <Button
          className="h-16 flex-1 rounded-2xl text-lg font-bold"
          onClick={onBuyNow}
          disabled={isPending}
        >
          {isPending ? "Processing..." : "Buy Now"}
        </Button>
      </div>
    </div>
  );
}
