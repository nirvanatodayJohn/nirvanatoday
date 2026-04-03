"use client"

import { useCart } from "@/lib/store/useCart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { 
  Delete02Icon, 
  Add01Icon, 
  Remove01Icon, 
  ShoppingCart02Icon,
  ArrowRight01Icon,
  ShoppingCart01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function CartSheet() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const totalItemCount = totalItems();

  if (!isHydrated) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="relative h-10 w-10 shrink-0 rounded-full">
            <HugeiconsIcon icon={ShoppingCart01Icon} strokeWidth={1.8} />
            {totalItemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in duration-300">
                {totalItemCount}
              </span>
            )}
          </Button>
        }
      />
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border/40 p-6">
          <SheetTitle className="flex items-center gap-3 text-2xl font-bold tracking-tight">
            <HugeiconsIcon icon={ShoppingCart02Icon} strokeWidth={2} className="size-6" />
            Your Cart
            {totalItemCount > 0 && (
              <span className="ml-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-bold text-muted-foreground">
                {totalItemCount}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="rounded-full bg-muted/50 p-6">
                <HugeiconsIcon icon={ShoppingCart02Icon} strokeWidth={1.5} className="size-10 text-muted-foreground/50" />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">Add some items to get started!</p>
              </div>
              <Button 
                variant="outline" 
                className="mt-2 rounded-full px-8 font-bold"
                onClick={() => setOpen(false)}
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              {items.map((item) => (
                <div key={item.id} className="group flex gap-4 pr-1">
                  <div className="relative aspect-square size-24 shrink-0 overflow-hidden rounded-2xl border border-border/40 bg-zinc-50/50 dark:bg-zinc-900/50">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-3 mix-blend-multiply dark:mix-blend-normal"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between py-0.5">
                    <div className="flex justify-between gap-3">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold tracking-tight line-clamp-1">{item.title}</h4>
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">{item.category}</p>
                      </div>
                      <p className="text-sm font-bold tracking-tight">{item.price}</p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-0.5 rounded-lg border border-border/50 p-0.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 rounded-sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <HugeiconsIcon icon={Remove01Icon} strokeWidth={2.5} className="size-3" />
                        </Button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 rounded-sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <HugeiconsIcon icon={Add01Icon} strokeWidth={2.5} className="size-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="mt-auto flex flex-col gap-4 border-t border-border/40 bg-zinc-50/80 p-6 backdrop-blur-md dark:bg-zinc-950/80">
            <div className="space-y-1.5 w-full">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{totalPrice()}</span>
              </div>
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span className="text-primary">{totalPrice()}</span>
              </div>
            </div>
            <Button className="w-full rounded-2xl py-6 text-base font-bold shadow-xl shadow-primary/10 transition-all hover:scale-[1.02] active:scale-95">
              Checkout
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2.5} className="ml-2 size-4" />
            </Button>
            <p className="w-full text-center text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">
              Tax and shipping calculated at checkout
            </p>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
