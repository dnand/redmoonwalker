import Link from "next/link"
import { Package, BookOpen, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Redmoon Walkers</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Premium patterns, materials, and step-by-step guides for the modern
              shoemaking community.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop/patterns" className="text-muted-foreground hover:text-foreground transition-colors">
                  Patterns
                </Link>
              </li>
              <li>
                <Link href="/shop/materials" className="text-muted-foreground hover:text-foreground transition-colors">
                  Materials
                </Link>
              </li>
              <li>
                <Link href="/shop/guides" className="text-muted-foreground hover:text-foreground transition-colors">
                  Guides
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/library" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Library
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-muted-foreground hover:text-foreground transition-colors">
                  Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Redmoon Walkers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

