import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/admission">Admission</Link>
            </Button>
            <Button asChild variant="default" size="sm">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
