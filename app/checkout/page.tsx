"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Ticket01Icon,
  ShoppingBag01Icon,
  CheckmarkCircle02Icon
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/lib/store/useCart"
import { cn } from "@/lib/utils"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const [showDifferentShipping, setShowDifferentShipping] = React.useState(false)
  const [showCoupon, setShowCoupon] = React.useState(false)
  const [couponCode, setCouponCode] = React.useState("")
  const [isProcessing, setIsProcessing] = React.useState(false)

  // Redirect if cart is empty
  React.useEffect(() => {
    if (items.length === 0 && !isProcessing) {
      router.push("/shop")
    }
  }, [items, router, isProcessing])

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order processing
    setTimeout(() => {
      clearCart()
      router.push("/checkout/success") // Assuming a success page exists or will be created
    }, 2000)
  }

  if (items.length === 0) return null

  return (
    <main className="min-h-screen bg-[#FBFBFD] pb-24 pt-12 text-[#1d1d1f]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Simple Header */}
        <div className="mb-12 flex items-center justify-between border-b pb-8">
          <Link href="/cart" className="group flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary">
            <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2.5} className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to cart
          </Link>
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={ShoppingBag01Icon} className="size-5" />
            <h1 className="text-xl font-bold tracking-tight">Checkout</h1>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr,400px]">

          <div className="space-y-12">

            {/* Coupon Section */}
            <div className="rounded-[2.5rem] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/[0.03]">
              <button
                type="button"
                onClick={() => setShowCoupon(!showCoupon)}
                className="flex items-center gap-3 text-lg font-bold"
              >
                <HugeiconsIcon icon={Ticket01Icon} className="size-6 text-primary" />
                Have a coupon?
                <span className="text-sm font-medium text-primary hover:underline ml-auto">Click here to enter your code</span>
              </button>

              {showCoupon && (
                <div className="mt-6 flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Input
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="h-12 bg-zinc-50 border-zinc-200"
                  />
                  <Button variant="outline" className="h-12 px-8 rounded-3xl font-bold">Apply</Button>
                </div>
              )}
            </div>

            {/* Billing Details */}
            <section className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tight">Billing details</h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="billing_first_name">First name *</Label>
                  <Input id="billing_first_name" required className="h-14 bg-white shadow-xs border-black/[0.08]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing_last_name">Last name *</Label>
                  <Input id="billing_last_name" required className="h-14 bg-white shadow-xs border-black/[0.08]" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="billing_country">Country / Region *</Label>
                <Input id="billing_country" defaultValue="United States (US)" required className="h-14 bg-white shadow-xs border-black/[0.08]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="billing_address">Street address *</Label>
                <Input id="billing_address" placeholder="House number and street name" required className="h-14 bg-white shadow-xs border-black/[0.08]" />
                <Input id="billing_address_2" placeholder="Apartment, suite, unit, etc. (optional)" className="h-14 bg-white shadow-xs border-black/[0.08] mt-2" />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="billing_city">Town / City *</Label>
                  <Input id="billing_city" required className="h-14 bg-white shadow-xs border-black/[0.08]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing_state">State *</Label>
                  <Input id="billing_state" required className="h-14 bg-white shadow-xs border-black/[0.08]" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="billing_zip">ZIP Code *</Label>
                  <Input id="billing_zip" required className="h-14 bg-white shadow-xs border-black/[0.08]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing_phone">Phone (optional)</Label>
                  <Input id="billing_phone" type="tel" className="h-14 bg-white shadow-xs border-black/[0.08]" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="billing_email">Email address *</Label>
                <Input id="billing_email" type="email" required className="h-14 bg-white shadow-xs border-black/[0.08]" />
              </div>
            </section>

            {/* Different Address Toggle */}
            <div className="flex items-center gap-3 pt-4">
              <input
                type="checkbox"
                id="different_shipping"
                checked={showDifferentShipping}
                onChange={() => setShowDifferentShipping(!showDifferentShipping)}
                className="size-5 accent-primary cursor-pointer rounded-lg"
              />
              <label htmlFor="different_shipping" className="text-xl font-bold cursor-pointer select-none">
                Ship to a different address?
              </label>
            </div>

            {showDifferentShipping && (
              <section className="space-y-8 pt-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="shipping_first_name">First name *</Label>
                    <Input id="shipping_first_name" required={showDifferentShipping} className="h-14 bg-white shadow-xs border-black/[0.08]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shipping_last_name">Last name *</Label>
                    <Input id="shipping_last_name" required={showDifferentShipping} className="h-14 bg-white shadow-xs border-black/[0.08]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shipping_country">Country / Region *</Label>
                  <Input id="shipping_country" defaultValue="United States (US)" required={showDifferentShipping} className="h-14 bg-white shadow-xs border-black/[0.08]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shipping_address">Street address *</Label>
                  <Input id="shipping_address" placeholder="House number and street name" required={showDifferentShipping} className="h-14 bg-white shadow-xs border-black/[0.08]" />
                  <Input id="shipping_address_2" placeholder="Apartment, suite, unit, etc. (optional)" className="h-14 bg-white shadow-xs border-black/[0.08] mt-2" />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="shipping_city">Town / City *</Label>
                    <Input id="shipping_city" required={showDifferentShipping} className="h-14 bg-white shadow-xs border-black/[0.08]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shipping_state">State *</Label>
                    <Input id="shipping_state" required={showDifferentShipping} className="h-14 bg-white shadow-xs border-black/[0.08]" />
                  </div>
                </div>

                <div className="space-y-2 max-w-[50%]">
                  <Label htmlFor="shipping_zip">ZIP Code *</Label>
                  <Input id="shipping_zip" required={showDifferentShipping} className="h-14 bg-white shadow-xs border-black/[0.08]" />
                </div>
              </section>
            )}

            {/* Order Notes */}
            <div className="space-y-4">
              <Label htmlFor="order_notes" className="text-xl">Order notes (optional)</Label>
              <textarea
                id="order_notes"
                placeholder="Notes about your order, e.g. special notes for delivery."
                className="w-full min-h-[150px] rounded-3xl border border-black/[0.08] bg-white p-6 shadow-xs outline-none focus:ring-3 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium resize-none"
              />
            </div>
          </div>

          {/* Sticky Side Summary */}
          <aside className="lg:sticky lg:top-32 h-fit space-y-8">
            <div className="rounded-[2.5rem] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-black/[0.05]">
              <h3 className="text-2xl font-bold mb-8">Your Order</h3>

              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-muted/30 border border-black/[0.03]">
                      <Image src={item.image} alt={item.title} fill className="object-contain p-1" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center min-w-0">
                      <p className="text-sm font-bold line-clamp-1">{item.title}</p>
                      <p className="text-xs font-semibold text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="flex items-center text-sm font-bold">{item.price}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4 border-t pt-8">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{totalPrice()}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary font-bold">Free</span>
                </div>
                <div className="flex justify-between pt-4 text-xl font-extrabold border-t">
                  <span>Total</span>
                  <span className="text-2xl tracking-tighter">{totalPrice()}</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-10 h-14 rounded-full text-base font-bold shadow-xl shadow-primary/20 hover:scale-[1.02]"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing...
                  </div>
                ) : (
                  "Place Order"
                )}
              </Button>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground justify-center uppercase tracking-widest">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-3.5 text-primary" />
                  Secure 256-bit SSL encrypted checkout
                </div>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  )
}
