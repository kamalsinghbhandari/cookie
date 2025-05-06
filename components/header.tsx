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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-nios-600 text-white font-bold">
            ODL
          </div>
          <span className="hidden text-sm font-medium md:inline-block">Open Distance Learning</span>
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
                          className="flex h-full w-full select-none flex-col justify-end rounded-md nios-gradient p-6 no-underline outline-none focus:shadow-md"
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
                    <ListItem href="/nios/syllabus" title="Syllabus">
                      Detailed syllabus for all NIOS courses
                    </ListItem>
                    <ListItem href="/nios/results" title="Results">
                      Check your NIOS examination results
                    </ListItem>
                    <ListItem href="/nios/previous-papers" title="Previous Papers">
                      Download previous year question papers
                    </ListItem>
                    <ListItem href="/nios/study-material" title="Study Material">
                      Access study materials for NIOS courses
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
                          className="flex h-full w-full select-none flex-col justify-end rounded-md ignou-gradient p-6 no-underline outline-none focus:shadow-md"
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
                    <ListItem href="/ignou/syllabus" title="Syllabus">
                      Detailed syllabus for all IGNOU courses
                    </ListItem>
                    <ListItem href="/ignou/results" title="Results">
                      Check your IGNOU examination results
                    </ListItem>
                    <ListItem href="/ignou/previous-papers" title="Previous Papers">
                      Download previous year question papers
                    </ListItem>
                    <ListItem href="/ignou/study-material" title="Study Material">
                      Access study materials for IGNOU courses
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
                          className="flex h-full w-full select-none flex-col justify-end rounded-md dusol-gradient p-6 no-underline outline-none focus:shadow-md"
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
                    <ListItem href="/dusol/syllabus" title="Syllabus">
                      Detailed syllabus for all DU SOL courses
                    </ListItem>
                    <ListItem href="/dusol/results" title="Results">
                      Check your DU SOL examination results
                    </ListItem>
                    <ListItem href="/dusol/previous-papers" title="Previous Papers">
                      Download previous year question papers
                    </ListItem>
                    <ListItem href="/dusol/study-material" title="Study Material">
                      Access study materials for DU SOL courses
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
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">User Name</p>
                    <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings" className="w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login" className="hidden md:block">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register" className="hidden md:block">
                <Button className="bg-nios-600 hover:bg-nios-700">Register</Button>
              </Link>
            </>
          )}

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
                <BookOpen className="mr-2 h-4 w-4 text-nios-600" />
                <span className="font-medium text-nios-600">NIOS</span>
              </div>
              <Link href="/nios/admission/form" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Apply Now
                </Button>
              </Link>
              <Link href="/nios/courses" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Courses
                </Button>
              </Link>
              <Link href="/nios/syllabus" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Syllabus
                </Button>
              </Link>
              <Link href="/nios/results" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Results
                </Button>
              </Link>
            </div>

            <div className="rounded-md bg-muted p-2">
              <div className="flex items-center px-2 py-1">
                <GraduationCap className="mr-2 h-4 w-4 text-ignou-600" />
                <span className="font-medium text-ignou-600">IGNOU</span>
              </div>
              <Link href="/ignou/admission/form" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Apply Now
                </Button>
              </Link>
              <Link href="/ignou/courses" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Courses
                </Button>
              </Link>
              <Link href="/ignou/syllabus" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Syllabus
                </Button>
              </Link>
              <Link href="/ignou/results" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Results
                </Button>
              </Link>
            </div>

            <div className="rounded-md bg-muted p-2">
              <div className="flex items-center px-2 py-1">
                <School className="mr-2 h-4 w-4 text-dusol-600" />
                <span className="font-medium text-dusol-600">DU SOL</span>
              </div>
              <Link href="/dusol/admission/form" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Apply Now
                </Button>
              </Link>
              <Link href="/dusol/courses" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Courses
                </Button>
              </Link>
              <Link href="/dusol/syllabus" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Syllabus
                </Button>
              </Link>
              <Link href="/dusol/results" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Results
                </Button>
              </Link>
            </div>

            <Link href="/blog" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Blog
              </Button>
            </Link>

            {!isLoggedIn && (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-nios-600 hover:bg-nios-700">Register</Button>
                </Link>
              </>
            )}
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
