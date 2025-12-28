// Simple demo auth - no external dependencies
// Uses localStorage for client-side, returns mock user for server-side

export interface User {
  id: string
  email: string
  name: string
  imageUrl: string | null
}

export async function getCurrentUser(): Promise<User | null> {
  // For demo purposes, always return a mock user
  // In a real app, you'd check session/cookies here
  return {
    id: "demo-user-123",
    email: "demo@redmoonwalkers.com",
    name: "Demo User",
    imageUrl: null,
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized")
  }
  return user
}
