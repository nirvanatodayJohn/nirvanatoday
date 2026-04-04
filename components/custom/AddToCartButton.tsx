"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store/useCart"
import { type Product } from "@/lib/shopify"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ShoppingCartIcon, Tick01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function AddToCartButton({ product }: { product: Product }) {
  const router = useRouter()
  const addItem = useCart((state) => state.addItem)
  const isInCart = useCart((state) => state.items.some((item) => item.id === product.id))

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInCart) {
      router.push("/cart")
      return
    }

    addItem({
      id: product.id,
      handle: product.handle,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    })
    toast.success(`${product.title} added to cart`)
  }

  return (
    <Button
      onClick={handleAddToCart}
      variant="outline"
      size="icon"
      className="rounded-full shadow-sm transition-all active:scale-95 shrink-0"
      aria-label={isInCart ? "View cart" : "Add to cart"}
    >
      <HugeiconsIcon
        icon={isInCart ? Tick01Icon : ShoppingCartIcon}
        strokeWidth={2}
      />
    </Button>
  )
}
