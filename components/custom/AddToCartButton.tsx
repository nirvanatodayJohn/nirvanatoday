"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store/useCart"
import { type Product } from "@/lib/shopify"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ShoppingCartIcon, Tick01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

type ProductVariant = Product["variants"][number]

export default function AddToCartButton({
  product,
  selectedVariant,
}: {
  product: Product
  selectedVariant?: ProductVariant
}) {
  const router = useRouter()
  const addItem = useCart((state) => state.addItem)
  const cartItemId = selectedVariant?.id || product.id
  const selectedVariantTitle =
    selectedVariant?.title && selectedVariant.title.toLowerCase() !== "default title"
      ? selectedVariant.title
      : ""
  const cartItemTitle = selectedVariantTitle
    ? `${product.title} - ${selectedVariantTitle}`
    : product.title
  const cartItemPrice = selectedVariant?.price || product.price
  const cartItemImage = selectedVariant?.image || product.image
  const isInCart = useCart((state) => state.items.some((item) => item.id === cartItemId))

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInCart) {
      router.push("/cart")
      return
    }

    addItem({
      id: cartItemId,
      handle: product.handle,
      title: cartItemTitle,
      price: cartItemPrice,
      image: cartItemImage,
      category: product.category,
    })
    toast.success(`${cartItemTitle} added to cart`)
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
