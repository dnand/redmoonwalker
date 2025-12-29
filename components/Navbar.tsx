"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, BookOpen, Search, Heart, Settings } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { getCartCount } from "@/lib/cart"

interface DemoUser {
  id: string
  email: string
  name: string
  imageUrl: string | null
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<DemoUser | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem("demo_user")
    const isAuthenticated = localStorage.getItem("demo_authenticated")
    
    if (isAuthenticated === "true" && storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setUser(user)
      } catch {
        // Invalid JSON, user not logged in
        setUser(null)
      }
    }

    // Get cart count from localStorage
    setCartCount(getCartCount())
  }, [pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSearch(false)
      setSearchQuery("")
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem("demo_authenticated")
    localStorage.removeItem("demo_user")
    setUser(null)
    router.push("/")
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/build", label: "Build" },
    { href: "/shop/guides", label: "Guides" },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary transition-all">
              Redmoon Walkers
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all px-3 py-2 rounded-md ${
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Search Bar (Desktop) */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring w-64"
                />
              </div>
            </form>

            {user ? (
              <>
                <Link href="/library">
                  <Button variant="ghost" size="icon">
                    <BookOpen className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {cartCount > 9 ? "9+" : cartCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Link href="/account">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button variant="ghost" size="icon" title="Admin">
                    <Settings className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile Search Bar */}
          {showSearch && (
            <div className="md:hidden w-full mt-2 pb-2">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring w-full"
                    autoFocus
                  />
                </div>
                <Button type="submit" size="sm">Search</Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
