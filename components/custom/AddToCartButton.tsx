"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store/useCart"
import { type Product } from "@/lib/shopify"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

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
      variant={isInCart ? "outline" : "default"}
      className="w-full font-semibold transition-all active:scale-95"
    >
      {isInCart ? "View cart" : "Add to cart"}
    </Button>
  )
}
