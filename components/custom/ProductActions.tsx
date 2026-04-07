"use client";

import { useCart } from "@/lib/store/useCart";
import { Button } from "@/components/ui/button";
import { handleCheckoutAction } from "@/app/actions/checkout";
import { useTransition } from "react";
import { type Product } from "@/lib/shopify";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductActionsProps {
  product: Product;
  selectedVariantId: string;
  onVariantChange: (variantId: string) => void;
}

export default function ProductActions({
  product,
  selectedVariantId,
  onVariantChange,
}: ProductActionsProps) {
  const { addItem } = useCart();
  const [isPending, startTransition] = useTransition();
  const normalizedVariants = (product.variants ?? []).filter(
    (variant) => variant.title && variant.title.toLowerCase() !== "default title"
  );
  const selectedVariant =
    normalizedVariants.find((variant) => variant.id === selectedVariantId) ||
    normalizedVariants[0];

  const onAddToCart = () => {
    const variantLabel =
      selectedVariant?.title && selectedVariant.title.toLowerCase() !== "default title"
        ? ` - ${selectedVariant.title}`
        : "";
    const cartItem = {
      id: selectedVariantId,
      handle: product.handle,
      title: `${product.title}${variantLabel}`,
      price: selectedVariant?.price || product.price,
      image: selectedVariant?.image || product.image,
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
      {normalizedVariants.length > 1 && (
        <div className="space-y-4">
          <label className="text-xs font-bold text-muted-foreground">
            Variant Options
          </label>
          <div className="flex flex-wrap gap-2">
            {normalizedVariants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => onVariantChange(variant.id)}
                className={cn(
                  "px-6 py-1.5 rounded-full border text-sm font-bold transition-all",
                  selectedVariantId === variant.id
                    ? "border-foreground bg-foreground text-background"
                    : "border bg-muted text-muted-foreground"
                )}
              >
                {variant.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          variant="outline"
          className="h-16 flex-1 rounded-2xl text-lg font-bold bg-muted"
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
