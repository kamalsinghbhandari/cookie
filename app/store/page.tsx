"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ShoppingCart, Star } from "lucide-react"

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState([])

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id)
    if (existingItem) {
      setCartItems(cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">NIOS Study Materials Store</h1>
        <p className="mt-2 text-muted-foreground">Purchase printed study materials, guides, and test papers</p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link href="/store/cart">
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

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 w-full justify-start sm:w-auto">
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="guides">Study Guides</TabsTrigger>
          <TabsTrigger value="papers">Test Papers</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {filteredProducts.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
              <p className="text-muted-foreground">No products found matching your search.</p>
              <Button variant="link" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="books" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts
              .filter((product) => product.category === "Books")
              .map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="guides" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts
              .filter((product) => product.category === "Study Guides")
              .map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="papers" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts
              .filter((product) => product.category === "Test Papers")
              .map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Featured Products */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Featured Products</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products
            .filter((product) => product.featured)
            .map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
        </div>
      </section>
    </div>
  )
}

function ProductCard({ product, addToCart }) {
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {product.discount > 0 && <Badge className="absolute right-2 top-2 bg-red-500">{product.discount}% OFF</Badge>}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline">{product.category}</Badge>
          <div className="flex items-center">
            <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs">{product.rating}</span>
          </div>
        </div>
        <CardTitle className="line-clamp-1 text-base">{product.title}</CardTitle>
        <CardDescription className="line-clamp-1">{product.subject}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="line-clamp-2 text-xs text-muted-foreground">{product.description}</p>
        <div className="mt-2 flex items-center">
          <span className="text-lg font-bold">₹{product.price}</span>
          {product.originalPrice && (
            <span className="ml-2 text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
          <Link href={`/store/product/${product.id}`} className="flex-1">
            <Button size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

// Dummy data
const products = [
  {
    id: "prod-001",
    title: "NIOS Secondary Science Textbook",
    description: "Comprehensive textbook covering the complete Science syllabus for Class 10 NIOS students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 350,
    originalPrice: 450,
    discount: 22,
    category: "Books",
    subject: "Science (Class 10)",
    rating: 4.7,
    featured: true,
  },
  {
    id: "prod-002",
    title: "NIOS Senior Secondary Mathematics Textbook",
    description: "Complete Mathematics textbook for Class 12 NIOS students covering algebra, calculus, and statistics.",
    image: "/placeholder.svg?height=200&width=300",
    price: 420,
    originalPrice: 500,
    discount: 16,
    category: "Books",
    subject: "Mathematics (Class 12)",
    rating: 4.8,
    featured: true,
  },
  {
    id: "prod-003",
    title: "English Grammar and Composition Guide",
    description: "A comprehensive guide to English grammar and composition for NIOS students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 280,
    originalPrice: null,
    discount: 0,
    category: "Study Guides",
    subject: "English (Class 10 & 12)",
    rating: 4.5,
    featured: false,
  },
  {
    id: "prod-004",
    title: "NIOS Previous Year Question Papers - Science",
    description: "Collection of previous year question papers for Science with detailed solutions.",
    image: "/placeholder.svg?height=200&width=300",
    price: 180,
    originalPrice: 220,
    discount: 18,
    category: "Test Papers",
    subject: "Science (Class 10)",
    rating: 4.6,
    featured: false,
  },
  {
    id: "prod-005",
    title: "NIOS Previous Year Question Papers - Commerce",
    description: "Collection of previous year question papers for Commerce subjects with detailed solutions.",
    image: "/placeholder.svg?height=200&width=300",
    price: 180,
    originalPrice: 220,
    discount: 18,
    category: "Test Papers",
    subject: "Commerce (Class 12)",
    rating: 4.5,
    featured: false,
  },
  {
    id: "prod-006",
    title: "NIOS Secondary Social Science Textbook",
    description: "Comprehensive textbook covering the complete Social Science syllabus for Class 10 NIOS students.",
    image: "/placeholder.svg?height=200&width=300",
    price: 350,
    originalPrice: 400,
    discount: 12,
    category: "Books",
    subject: "Social Science (Class 10)",
    rating: 4.4,
    featured: false,
  },
  {
    id: "prod-007",
    title: "NIOS Senior Secondary Physics Textbook",
    description: "Complete Physics textbook for Class 12 NIOS students covering mechanics, thermodynamics, and more.",
    image: "/placeholder.svg?height=200&width=300",
    price: 420,
    originalPrice: 480,
    discount: 12,
    category: "Books",
    subject: "Physics (Class 12)",
    rating: 4.7,
    featured: true,
  },
  {
    id: "prod-008",
    title: "NIOS Exam Preparation Guide",
    description:
      "A comprehensive guide to preparing for NIOS examinations with tips, strategies, and practice questions.",
    image: "/placeholder.svg?height=200&width=300",
    price: 250,
    originalPrice: 300,
    discount: 16,
    category: "Study Guides",
    subject: "All Subjects",
    rating: 4.9,
    featured: true,
  },
]
