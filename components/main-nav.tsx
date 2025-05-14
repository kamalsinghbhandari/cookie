import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/admission",
      label: "Admission",
    },
    {
      href: "/courses",
      label: "Courses",
    },
    {
      href: "/blog",
      label: "Blog",
    },
  ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">NIOStudent</span>
      </Link>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className="hidden text-sm font-medium transition-colors hover:text-primary md:block"
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
