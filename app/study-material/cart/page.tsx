"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Trash2, ShoppingCart, ArrowLeft, CreditCard } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // In a real implementation, this would fetch cart items from localStorage or a database
  useEffect(() => {
    // Dummy data for demonstration
    setCartItems([
      {
        id: "nios-001",
        title: "Science Notes - Class 10",
        price: 10,
        quantity: 1,
        institution: "NIOS",
      },
      {
        id: "ignou-001",
        title: "Management Concepts and Practices",
        price: 100,
        quantity: 1,
        institution: "IGNOU",
      },
    ])
  }, [])

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Order placed successfully",
      description: "Your order has been placed. You will receive an email with download links shortly.",
    })

    setCartItems([])
    setIsLoading(false)
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <p className="mt-2 text-muted-foreground">Review your items and proceed to checkout</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <ShoppingCart className="mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">
            Looks like you haven't added any study materials to your cart yet.
          </p>
          <Link href="/study-material">
            <Button>Browse Study Materials</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Shopping Cart ({cartItems.length} items)</CardTitle>
                <CardDescription>Review and modify your selected items</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.institution}</p>
                      <div className="mt-1 flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-6 w-6 rounded-md border text-center"
                        >
                          -
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-6 w-6 rounded-md border text-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">₹{item.price * item.quantity}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-1 text-xs text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Link
                  href="/study-material"
                  className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Continue Shopping
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{calculateSubtotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{Math.round(calculateSubtotal() * 0.18)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{calculateSubtotal() + Math.round(calculateSubtotal() * 0.18)}</span>
                </div>

                <div className="mt-6 space-y-2">
                  <h3 className="text-sm font-medium">Payment Method</h3>
                  <div className="rounded-md border p-3">
                    <div className="flex items-center">
                      <input type="radio" id="card" name="payment" className="h-4 w-4" checked readOnly />
                      <label htmlFor="card" className="ml-2 flex items-center text-sm">
                        <CreditCard className="mr-2 h-4 w-4" /> Credit/Debit Card
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleCheckout} disabled={isLoading}>
                  {isLoading ? "Processing..." : "Proceed to Checkout"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
