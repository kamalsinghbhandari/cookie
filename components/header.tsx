"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
import { Menu, X, ChevronDown } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <div className="announcement-bar bg-nios-700 overflow-hidden whitespace-nowrap py-2 text-center text-sm text-white">
        <div className="inline-block">
          NIOS Admissions Open for 2025-26 | IGNOU July 2025 Session Registration Started | DU SOL Admissions Closing
          Soon
        </div>
      </div>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200",
          isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm",
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <span className="text-2xl font-bold text-nios-700">ODL</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-nios-700 hover:bg-nios-50 hover:text-nios-800">
                    NIOS
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href="/nios/admission/form" title="Admission">
                        Apply for NIOS admission online
                      </ListItem>
                      <ListItem href="/nios/courses" title="Courses">
                        Explore available courses
                      </ListItem>
                      <ListItem href="/nios/study-material" title="Study Material">
                        Access study materials and resources
                      </ListItem>
                      <ListItem href="/nios/results" title="Results">
                        Check your examination results
                      </ListItem>
                      <ListItem href="/nios/syllabus" title="Syllabus">
                        View detailed course syllabus
                      </ListItem>
                      <ListItem href="/nios/previous-papers" title="Previous Papers">
                        Download previous year question papers
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-ignou-700 hover:bg-ignou-50 hover:text-ignou-800">
                    IGNOU
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href="/ignou/admission/form" title="Admission">
                        Apply for IGNOU admission online
                      </ListItem>
                      <ListItem href="/ignou/courses" title="Courses">
                        Explore available courses
                      </ListItem>
                      <ListItem href="/ignou/study-material" title="Study Material">
                        Access study materials and resources
                      </ListItem>
                      <ListItem href="/ignou/results" title="Results">
                        Check your examination results
                      </ListItem>
                      <ListItem href="/ignou/syllabus" title="Syllabus">
                        View detailed course syllabus
                      </ListItem>
                      <ListItem href="/ignou/previous-papers" title="Previous Papers">
                        Download previous year question papers
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-dusol-700 hover:bg-dusol-50 hover:text-dusol-800">
                    DU SOL
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href="/dusol/admission/form" title="Admission">
                        Apply for DU SOL admission online
                      </ListItem>
                      <ListItem href="/dusol/courses" title="Courses">
                        Explore available courses
                      </ListItem>
                      <ListItem href="/dusol/study-material" title="Study Material">
                        Access study materials and resources
                      </ListItem>
                      <ListItem href="/dusol/results" title="Results">
                        Check your examination results
                      </ListItem>
                      <ListItem href="/dusol/syllabus" title="Syllabus">
                        View detailed course syllabus
                      </ListItem>
                      <ListItem href="/dusol/previous-papers" title="Previous Papers">
                        Download previous year question papers
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
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden space-x-2 md:flex">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-nios-700 hover:bg-nios-800">Register</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="block md:hidden" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 flex flex-col bg-white p-4 md:hidden">
            <div className="space-y-4">
              <MobileDropdown
                title="NIOS"
                links={[
                  { href: "/nios/admission/form", label: "Admission" },
                  { href: "/nios/courses", label: "Courses" },
                  { href: "/nios/study-material", label: "Study Material" },
                  { href: "/nios/results", label: "Results" },
                  { href: "/nios/syllabus", label: "Syllabus" },
                  { href: "/nios/previous-papers", label: "Previous Papers" },
                ]}
              />

              <MobileDropdown
                title="IGNOU"
                links={[
                  { href: "/ignou/admission/form", label: "Admission" },
                  { href: "/ignou/courses", label: "Courses" },
                  { href: "/ignou/study-material", label: "Study Material" },
                  { href: "/ignou/results", label: "Results" },
                  { href: "/ignou/syllabus", label: "Syllabus" },
                  { href: "/ignou/previous-papers", label: "Previous Papers" },
                ]}
              />

              <MobileDropdown
                title="DU SOL"
                links={[
                  { href: "/dusol/admission/form", label: "Admission" },
                  { href: "/dusol/courses", label: "Courses" },
                  { href: "/dusol/study-material", label: "Study Material" },
                  { href: "/dusol/results", label: "Results" },
                  { href: "/dusol/syllabus", label: "Syllabus" },
                  { href: "/dusol/previous-papers", label: "Previous Papers" },
                ]}
              />

              <Link href="/blog" className="block py-2 text-lg" onClick={closeMobileMenu}>
                Blog
              </Link>
              <Link href="/contact" className="block py-2 text-lg" onClick={closeMobileMenu}>
                Contact
              </Link>
            </div>

            <div className="mt-6 flex flex-col space-y-2">
              <Link href="/login" onClick={closeMobileMenu}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/register" onClick={closeMobileMenu}>
                <Button className="w-full bg-nios-700 hover:bg-nios-800">Register</Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

function MobileDropdown({ title, links }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button className="flex w-full items-center justify-between py-2 text-lg" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <ChevronDown size={20} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="ml-4 space-y-2 border-l border-gray-200 pl-4">
          {links.map((link, index) => (
            <Link key={index} href={link.href} className="block py-1 text-gray-600 hover:text-nios-700">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

const ListItem = ({ className, title, children, ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
