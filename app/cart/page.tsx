"use client"

import { useCart } from "@/lib/store/useCart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Delete02Icon, 
  Add01Icon, 
  Remove01Icon, 
  ShoppingCart02Icon,
  ArrowRight01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex size-24 items-center justify-center rounded-full bg-muted">
          <HugeiconsIcon icon={ShoppingCart02Icon} strokeWidth={1.5} className="size-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Your cart is empty</h1>
          <p className="text-muted-foreground font-medium">Looks like you haven't added anything to your cart yet.</p>
        </div>
        <Link href="/shop">
          <Button size="lg" className="rounded-full px-8 py-6 font-bold">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-10 text-4xl font-bold tracking-tight">Shopping Cart</h1>

      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8">
          <div className="space-y-8">
            {items.map((item) => (
              <div key={item.id} className="group relative flex gap-6 sm:gap-10">
                {/* Product Image */}
                <div className="relative aspect-square size-24 shrink-0 overflow-hidden rounded-2xl border border-border/40 bg-muted/30 sm:size-40">
                  <Link href={`/product/${item.handle}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-4 mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>
                </div>

                {/* Product Controls */}
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div className="flex justify-between gap-4">
                    <div className="space-y-1">
                      <Link href={`/product/${item.handle}`}>
                        <h3 className="text-lg font-bold tracking-tight hover:text-primary transition-colors sm:text-xl">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-sm font-medium text-muted-foreground">{item.category}</p>
                    </div>
                    <p className="text-lg font-bold tracking-tight">{item.price}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1 rounded-xl border border-border/50 p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-lg"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <HugeiconsIcon icon={Remove01Icon} strokeWidth={2.5} className="size-4" />
                      </Button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-lg"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <HugeiconsIcon icon={Add01Icon} strokeWidth={2.5} className="size-4" />
                      </Button>
                    </div>

                    {/* Remove Action */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} className="mr-2 size-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 rounded-[2rem] border border-border/40 bg-zinc-50/50 p-8 dark:bg-zinc-900/50">
            <h2 className="mb-6 text-xl font-bold tracking-tight">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-muted-foreground">Items ({totalItems()})</span>
                <span>{totalPrice()}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-primary">Calculated at checkout</span>
              </div>
              <Separator className="bg-border/40" />
              <div className="flex justify-between pt-2">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">{totalPrice()}</span>
              </div>
              <Link href="/checkout" className="w-full">
                <Button size="lg" className="mt-4 w-full rounded-2xl py-7 text-base font-bold shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">
                  Checkout
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2.5} className="ml-2 size-4" />
                </Button>
              </Link>
              <p className="mt-4 text-center text-xs font-medium text-muted-foreground">
                Taxes and shipping calculated at checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
