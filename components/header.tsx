"use client"

import React from "react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Menu, X, BookOpen, GraduationCap, School } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">ODL</span>
          <span className="hidden text-sm text-muted-foreground md:inline-block">Open Distance Learning</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>NIOS</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-teal-500 to-teal-700 p-6 no-underline outline-none focus:shadow-md"
                          href="/nios/admission/form"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">Apply Now</div>
                          <p className="text-sm leading-tight text-white/90">
                            Start your NIOS admission process for the upcoming academic session
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/nios/admission/announcements" title="Announcements">
                      Latest admission dates and important notices
                    </ListItem>
                    <ListItem href="/nios/courses" title="Courses">
                      Explore NIOS courses and study materials
                    </ListItem>
                    <ListItem href="/nios/faq" title="FAQ">
                      Frequently asked questions about NIOS
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>IGNOU</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-500 to-purple-700 p-6 no-underline outline-none focus:shadow-md"
                          href="/ignou/admission/form"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">Apply Now</div>
                          <p className="text-sm leading-tight text-white/90">
                            Start your IGNOU admission process for the upcoming academic session
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/ignou/admission/announcements" title="Announcements">
                      Latest admission dates and important notices
                    </ListItem>
                    <ListItem href="/ignou/courses" title="Courses">
                      Explore IGNOU courses and study materials
                    </ListItem>
                    <ListItem href="/ignou/faq" title="FAQ">
                      Frequently asked questions about IGNOU
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>DU SOL</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-orange-500 to-orange-700 p-6 no-underline outline-none focus:shadow-md"
                          href="/dusol/admission/form"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">Apply Now</div>
                          <p className="text-sm leading-tight text-white/90">
                            Start your DU SOL admission process for the upcoming academic session
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/dusol/admission/announcements" title="Announcements">
                      Latest admission dates and important notices
                    </ListItem>
                    <ListItem href="/dusol/courses" title="Courses">
                      Explore DU SOL courses and study materials
                    </ListItem>
                    <ListItem href="/dusol/faq" title="FAQ">
                      Frequently asked questions about DU SOL
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Blog</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/store" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Store</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="outline" className="hidden md:inline-flex">
              Login
            </Button>
          </Link>
          <Link href="/nios/admission/form">
            <Button className="hidden md:inline-flex">Apply Now</Button>
          </Link>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container pb-4 md:hidden">
          <nav className="flex flex-col space-y-3">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Home
              </Button>
            </Link>
            <div className="rounded-md bg-muted p-2">
              <div className="flex items-center px-2 py-1">
                <BookOpen className="mr-2 h-4 w-4 text-teal-600" />
                <span className="font-medium text-teal-600">NIOS</span>
              </div>
              <Link href="/nios/admission/announcements" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Admission Announcements
                </Button>
              </Link>
              <Link href="/nios/admission/form" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Admission Form
                </Button>
              </Link>
              <Link href="/nios/courses" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Courses
                </Button>
              </Link>
            </div>
            <div className="rounded-md bg-muted p-2">
              <div className="flex items-center px-2 py-1">
                <GraduationCap className="mr-2 h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-600">IGNOU</span>
              </div>
              <Link href="/ignou/admission/announcements" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Admission Announcements
                </Button>
              </Link>
              <Link href="/ignou/admission/form" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Admission Form
                </Button>
              </Link>
              <Link href="/ignou/courses" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Courses
                </Button>
              </Link>
            </div>
            <div className="rounded-md bg-muted p-2">
              <div className="flex items-center px-2 py-1">
                <School className="mr-2 h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-600">DU SOL</span>
              </div>
              <Link href="/dusol/admission/announcements" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Admission Announcements
                </Button>
              </Link>
              <Link href="/dusol/admission/form" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Admission Form
                </Button>
              </Link>
              <Link href="/dusol/courses" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Courses
                </Button>
              </Link>
            </div>
            <Link href="/blog" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Blog
              </Button>
            </Link>
            <Link href="/store" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Store
              </Button>
            </Link>
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
            <Link href="/nios/admission/form" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full">Apply Now</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
