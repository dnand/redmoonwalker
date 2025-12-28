// Client-side cart management using localStorage
import { mockProducts } from "./mockData"

export interface CartItem {
  productId: string
  variantId: string | null
  quantity: number
}

export interface CartItemWithProduct extends CartItem {
  product: {
    id: string
    title: string
    slug: string
    coverImageUrl: string | null
    type: string
  }
  variant: {
    id: string
    title: string
    skillLevel: string | null
  } | null
  priceCents: number
  totalCents: number
}

const CART_KEY = "redmoon_cart"

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []
  const cart = localStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) : []
}

export function saveCart(cart: CartItem[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function addToCart(productId: string, variantId: string | null = null, quantity: number = 1): void {
  const cart = getCart()
  
  const existingIndex = cart.findIndex(
    (item) =>
      item.productId === productId &&
      (variantId ? item.variantId === variantId : !item.variantId)
  )

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity
  } else {
    cart.push({ productId, variantId, quantity })
  }

  saveCart(cart)
}

export function removeFromCart(productId: string, variantId: string | null = null): void {
  const cart = getCart()
  const filtered = cart.filter(
    (item) =>
      !(
        item.productId === productId &&
        (variantId ? item.variantId === variantId : !item.variantId)
      )
  )
  saveCart(filtered)
}

export function updateCartQuantity(productId: string, variantId: string | null, quantity: number): void {
  const cart = getCart()
  const index = cart.findIndex(
    (item) =>
      item.productId === productId &&
      (variantId ? item.variantId === variantId : !item.variantId)
  )

  if (index >= 0) {
    if (quantity <= 0) {
      cart.splice(index, 1)
    } else {
      cart[index].quantity = quantity
    }
    saveCart(cart)
  }
}

export function clearCart(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(CART_KEY)
}

export function getCartWithProducts(): { items: CartItemWithProduct[]; totalCents: number } {
  const cart = getCart()
  
  const items: CartItemWithProduct[] = []
  
  for (const item of cart) {
    const product = mockProducts.find((p) => p.id === item.productId)
    if (!product) continue

    const variant = item.variantId
      ? product.variants.find((v) => v.id === item.variantId)
      : null

    const priceCents = product.priceCents

    items.push({
      ...item,
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
        coverImageUrl: product.coverImageUrl,
        type: product.type,
      },
      variant: variant
        ? {
            id: variant.id,
            title: variant.title,
            skillLevel: variant.skillLevel || null,
          }
        : null,
      priceCents,
      totalCents: priceCents * item.quantity,
    })
  }

  const totalCents = items.reduce((sum, item) => sum + item.totalCents, 0)

  return { items, totalCents }
}

export function getCartCount(): number {
  const cart = getCart()
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}

