"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Eye, ShoppingCart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function StudyMaterialPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState([])
  const { toast } = useToast()

  const filteredMaterials = (materials, query) => {
    return materials.filter(
      (material) =>
        material.title.toLowerCase().includes(query.toLowerCase()) ||
        material.subject.toLowerCase().includes(query.toLowerCase()) ||
        material.description.toLowerCase().includes(query.toLowerCase()),
    )
  }

  const addToCart = (material) => {
    if (material.price === 0) {
      // If it's free, download directly
      handleDownload(material)
      return
    }

    const existingItem = cartItems.find((item) => item.id === material.id)
    if (existingItem) {
      setCartItems(cartItems.map((item) => (item.id === material.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCartItems([...cartItems, { ...material, quantity: 1 }])
    }

    toast({
      title: "Added to cart",
      description: `${material.title} has been added to your cart.`,
    })
  }

  const handleDownload = (material) => {
    // In a real implementation, this would trigger a download
    toast({
      title: "Download started",
      description: `${material.title} is now downloading.`,
    })

    // Simulate download by opening a new window
    window.open(material.downloadUrl || "#", "_blank")
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Study Materials</h1>
        <p className="mt-2 text-muted-foreground">
          Browse and purchase study materials for NIOS, IGNOU, and DU SOL courses
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search study materials..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link href="/study-material/cart">
          <Button variant="outline" className="relative">
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-0">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </Badge>
            )}
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="nios" className="w-full">
        <TabsList className="mb-6 w-full justify-start sm:w-auto">
          <TabsTrigger value="nios">NIOS</TabsTrigger>
          <TabsTrigger value="ignou">IGNOU</TabsTrigger>
          <TabsTrigger value="dusol">DU SOL</TabsTrigger>
          <TabsTrigger value="pyq">Previous Year Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="nios" className="mt-0">
          {filteredMaterials(niosMaterials, searchQuery).length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
              <p className="text-muted-foreground">No study materials found matching your search.</p>
              <Button variant="link" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredMaterials(niosMaterials, searchQuery).map((material) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  addToCart={addToCart}
                  handleDownload={handleDownload}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="ignou" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredMaterials(ignouMaterials, searchQuery).map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                addToCart={addToCart}
                handleDownload={handleDownload}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dusol" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredMaterials(dusolMaterials, searchQuery).map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                addToCart={addToCart}
                handleDownload={handleDownload}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pyq" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredMaterials(pyqMaterials, searchQuery).map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                addToCart={addToCart}
                handleDownload={handleDownload}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Featured Materials */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Featured Study Materials</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredMaterials.map((material) => (
            <MaterialCard key={material.id} material={material} addToCart={addToCart} handleDownload={handleDownload} />
          ))}
        </div>
      </section>
    </div>
  )
}

function MaterialCard({ material, addToCart, handleDownload }) {
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={material.image || "/placeholder.svg?height=200&width=300"}
          alt={material.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {material.price === 0 && <Badge className="absolute right-2 top-2 bg-green-500">Free</Badge>}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline">{material.type}</Badge>
          <Badge
            variant={
              material.institution === "NIOS"
                ? "outline"
                : material.institution === "IGNOU"
                  ? "secondary"
                  : "destructive"
            }
          >
            {material.institution}
          </Badge>
        </div>
        <CardTitle className="line-clamp-1 text-base">{material.title}</CardTitle>
        <CardDescription className="line-clamp-1">{material.subject}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="line-clamp-2 text-xs text-muted-foreground">{material.description}</p>
        <div className="mt-2 flex items-center">
          {material.price > 0 ? (
            <span className="text-lg font-bold">₹{material.price}</span>
          ) : (
            <span className="text-lg font-bold text-green-600">Free</span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          {material.price > 0 ? (
            <Button variant="outline" size="sm" className="flex-1" onClick={() => addToCart(material)}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDownload(material)}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          )}
          <Link href={`/study-material/${material.id}`} className="flex-1">
            <Button size="sm" className="w-full">
              <Eye className="mr-2 h-4 w-4" /> Preview
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

// Dummy data
const niosMaterials = [
  {
    id: "nios-001",
    title: "Science Notes - Class 10",
    description: "Comprehensive notes covering the complete Science syllabus for Class 10 NIOS students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 10,
    type: "Notes",
    subject: "Science",
    institution: "NIOS",
    downloadUrl: "#",
  },
  {
    id: "nios-002",
    title: "Mathematics Notes - Class 10",
    description: "Complete Mathematics notes for Class 10 NIOS students covering algebra, geometry, and statistics.",
    image: "/placeholder.svg?height=200&width=300",
    price: 10,
    type: "Notes",
    subject: "Mathematics",
    institution: "NIOS",
    downloadUrl: "#",
  },
  {
    id: "nios-003",
    title: "English Grammar Guide - Class 10",
    description: "A comprehensive guide to English grammar for NIOS students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 10,
    type: "Guide",
    subject: "English",
    institution: "NIOS",
    downloadUrl: "#",
  },
  {
    id: "nios-004",
    title: "Social Science Notes - Class 10",
    description: "Complete Social Science notes for Class 10 NIOS students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 10,
    type: "Notes",
    subject: "Social Science",
    institution: "NIOS",
    downloadUrl: "#",
  },
  {
    id: "nios-005",
    title: "Physics Notes - Class 12",
    description: "Comprehensive Physics notes for Class 12 NIOS students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 10,
    type: "Notes",
    subject: "Physics",
    institution: "NIOS",
    downloadUrl: "#",
  },
  {
    id: "nios-006",
    title: "Chemistry Notes - Class 12",
    description: "Complete Chemistry notes for Class 12 NIOS students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 10,
    type: "Notes",
    subject: "Chemistry",
    institution: "NIOS",
    downloadUrl: "#",
  },
  {
    id: "nios-007",
    title: "Biology Notes - Class 12",
    description: "Comprehensive Biology notes for Class 12 NIOS students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 10,
    type: "Notes",
    subject: "Biology",
    institution: "NIOS",
    downloadUrl: "#",
  },
  {
    id: "nios-008",
    title: "Accountancy Notes - Class 12",
    description: "Complete Accountancy notes for Class 12 NIOS students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 10,
    type: "Notes",
    subject: "Accountancy",
    institution: "NIOS",
    downloadUrl: "#",
  },
]

const ignouMaterials = [
  {
    id: "ignou-001",
    title: "Management Concepts and Practices",
    description: "Comprehensive notes for Management Concepts and Practices (MS-1) for MBA students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 100,
    type: "Notes",
    subject: "Management",
    institution: "IGNOU",
    downloadUrl: "#",
  },
  {
    id: "ignou-002",
    title: "Marketing Management",
    description: "Complete notes for Marketing Management (MS-6) for MBA students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 100,
    type: "Notes",
    subject: "Marketing",
    institution: "IGNOU",
    downloadUrl: "#",
  },
  {
    id: "ignou-003",
    title: "Financial Management",
    description: "Comprehensive notes for Financial Management (MS-4) for MBA students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 100,
    type: "Notes",
    subject: "Finance",
    institution: "IGNOU",
    downloadUrl: "#",
  },
  {
    id: "ignou-004",
    title: "Human Resource Management",
    description: "Complete notes for Human Resource Management (MS-2) for MBA students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 100,
    type: "Notes",
    subject: "HRM",
    institution: "IGNOU",
    downloadUrl: "#",
  },
  {
    id: "ignou-005",
    title: "Economic Analysis for Business Decisions",
    description: "Comprehensive notes for Economic Analysis for Business Decisions (MS-3) for MBA students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 100,
    type: "Notes",
    subject: "Economics",
    institution: "IGNOU",
    downloadUrl: "#",
  },
  {
    id: "ignou-006",
    title: "Information Systems for Managers",
    description: "Complete notes for Information Systems for Managers (MS-5) for MBA students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 100,
    type: "Notes",
    subject: "Information Systems",
    institution: "IGNOU",
    downloadUrl: "#",
  },
]

const dusolMaterials = [
  {
    id: "dusol-001",
    title: "Financial Accounting",
    description: "Comprehensive notes for Financial Accounting for B.Com students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 100,
    type: "Notes",
    subject: "Accounting",
    institution: "DU SOL",
    downloadUrl: "#",
  },
  {
    id: "dusol-002",
    title: "Business Organization and Management",
    description: "Complete notes for Business Organization and Management for B.Com students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 100,
    type: "Notes",
    subject: "Management",
    institution: "DU SOL",
    downloadUrl: "#",
  },
  {
    id: "dusol-003",
    title: "Business Law",
    description: "Comprehensive notes for Business Law for B.Com students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 100,
    type: "Notes",
    subject: "Law",
    institution: "DU SOL",
    downloadUrl: "#",
  },
  {
    id: "dusol-004",
    title: "Business Mathematics and Statistics",
    description: "Complete notes for Business Mathematics and Statistics for B.Com students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 100,
    type: "Notes",
    subject: "Mathematics",
    institution: "DU SOL",
    downloadUrl: "#",
  },
  {
    id: "dusol-005",
    title: "English Language",
    description: "Comprehensive notes for English Language for B.A. students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 100,
    type: "Notes",
    subject: "English",
    institution: "DU SOL",
    downloadUrl: "#",
  },
  {
    id: "dusol-006",
    title: "Political Science",
    description: "Complete notes for Political Science for B.A. students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 100,
    type: "Notes",
    subject: "Political Science",
    institution: "DU SOL",
    downloadUrl: "#",
  },
]

const pyqMaterials = [
  {
    id: "pyq-001",
    title: "NIOS Class 10 Science PYQs (Last 5 Years)",
    description: "Previous year question papers for NIOS Class 10 Science with solutions.",
    image: "/placeholder.svg?height=200&width=300",
    price: 0,
    type: "PYQ",
    subject: "Science",
    institution: "NIOS",
    downloadUrl: "#",
  },
  {
    id: "pyq-002",
    title: "NIOS Class 10 Mathematics PYQs (Last 5 Years)",
    description: "Previous year question papers for NIOS Class 10 Mathematics with solutions.",
    image: "/placeholder.svg?height=200&width=300",
    price: 0,
    type: "PYQ",
    subject: "Mathematics",
    institution: "NIOS",
    downloadUrl: "#",
  },
  {
    id: "pyq-003",
    title: "IGNOU MBA Marketing Management PYQs",
    description: "Previous year question papers for IGNOU MBA Marketing Management with solutions.",
    image: "/placeholder.svg?height=200&width=300",
    price: 0,
    type: "PYQ",
    subject: "Marketing",
    institution: "IGNOU",
    downloadUrl: "#",
  },
  {
    id: "pyq-004",
    title: "IGNOU MBA Financial Management PYQs",
    description: "Previous year question papers for IGNOU MBA Financial Management with solutions.",
    image: "/placeholder.svg?height=200&width=300",
    price: 0,
    type: "PYQ",
    subject: "Finance",
    institution: "IGNOU",
    downloadUrl: "#",
  },
  {
    id: "pyq-005",
    title: "DU SOL B.Com Financial Accounting PYQs",
    description: "Previous year question papers for DU SOL B.Com Financial Accounting with solutions.",
    image: "/placeholder.svg?height=200&width=300",
    price: 0,
    type: "PYQ",
    subject: "Accounting",
    institution: "DU SOL",
    downloadUrl: "#",
  },
  {
    id: "pyq-006",
    title: "DU SOL B.Com Business Law PYQs",
    description: "Previous year question papers for DU SOL B.Com Business Law with solutions.",
    image: "/placeholder.svg?height=200&width=300",
    price: 0,
    type: "PYQ",
    subject: "Law",
    institution: "DU SOL",
    downloadUrl: "#",
  },
]

const featuredMaterials = [
  {
    id: "featured-001",
    title: "NIOS Class 12 Complete Study Package",
    description:
      "Comprehensive study package for NIOS Class 12 Science stream including notes, guides, and practice questions.",
    image: "/placeholder.svg?height=200&width=300",
    price: 50,
    type: "Package",
    subject: "Science Stream",
    institution: "NIOS",
    downloadUrl: "#",
  },
  {
    id: "featured-002",
    title: "IGNOU MBA Complete Study Material",
    description: "Complete study material for IGNOU MBA covering all core subjects.",
    image: "/placeholder.svg?height=200&width=300",
    price: 500,
    type: "Package",
    subject: "MBA",
    institution: "IGNOU",
    downloadUrl: "#",
  },
  {
    id: "featured-003",
    title: "DU SOL B.Com Study Package",
    description: "Comprehensive study package for DU SOL B.Com including notes, guides, and practice questions.",
    image: "/placeholder.svg?height=200&width=300",
    price: 450,
    type: "Package",
    subject: "B.Com",
    institution: "DU SOL",
    downloadUrl: "#",
  },
  {
    id: "featured-004",
    title: "Complete PYQ Collection (All Boards)",
    description: "Collection of previous year question papers for NIOS, IGNOU, and DU SOL with detailed solutions.",
    image: "/placeholder.svg?height=200&width=300",
    price: 0,
    type: "PYQ",
    subject: "All Subjects",
    institution: "Multiple",
    downloadUrl: "#",
  },
]
