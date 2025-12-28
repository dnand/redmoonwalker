import Stripe from "stripe"

// Create a mock Stripe instance for demo mode
const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_demo_key"

export const stripe = new Stripe(stripeKey, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
})

