import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-[#FBFBFD] flex items-center justify-center py-24">
      <div className="mx-auto max-w-md px-4 text-center">
        <div className="mb-8 flex justify-center">
          <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center animate-bounce duration-1000">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-12 text-primary" strokeWidth={2} />
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Order Confirmed!</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Your order has been placed successfully. We've sent a confirmation email with your order details.
        </p>

        <div className="space-y-4">
          <Link href="/shop" className="w-full block">
            <Button size="lg" className="w-full rounded-full h-14 text-base font-bold">
              Continue Shopping
              <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-5" strokeWidth={2.5} />
            </Button>
          </Link>
          <Link href="/" className="w-full block">
            <Button variant="ghost" className="w-full rounded-full h-14 text-base font-bold text-muted-foreground">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
