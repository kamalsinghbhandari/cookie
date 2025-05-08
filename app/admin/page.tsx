"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import {
  Users,
  FileText,
  BookOpen,
  Settings,
  Bell,
  BarChart3,
  LogOut,
  PlusCircle,
  Pencil,
  Trash2,
  Download,
  ImageIcon,
  DollarSign,
} from "lucide-react"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const router = useRouter()
  const { toast } = useToast()

  // In a real implementation, this would check if the user is authenticated
  useEffect(() => {
    // Simulate authentication check
    const checkAuth = async () => {
      // This would be a real auth check in production
      setIsAuthenticated(false) // Set to false initially to show login screen
    }

    checkAuth()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real implementation, this would validate credentials against a database
    const email = e.target.email.value
    const password = e.target.password.value

    // In a real implementation, this would use a secure authentication method
    // with hashed passwords and proper JWT token handling
    if (email === "niosdiscussion@gmail.com" && password === "L22JUPVJJJ") {
      setIsAuthenticated(true)
      // Set a secure JWT token in localStorage or cookies (in a real implementation)
      // localStorage.setItem('adminToken', 'secure-jwt-token-would-go-here')
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard.",
      })
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password.",
      })
    }

    setIsLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    router.push("/admin")
  }

  if (!isAuthenticated) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="admin@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 p-4 text-white">
        <div className="mb-8">
          <h1 className="text-xl font-bold">ODL Admin</h1>
          <p className="text-sm text-slate-400">Manage your website</p>
        </div>

        <nav className="space-y-1">
          <Button
            variant={activeTab === "dashboard" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("dashboard")}
          >
            <BarChart3 className="mr-2 h-4 w-4" /> Dashboard
          </Button>
          <Button
            variant={activeTab === "admissions" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("admissions")}
          >
            <FileText className="mr-2 h-4 w-4" /> Admissions
          </Button>
          <Button
            variant={activeTab === "materials" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("materials")}
          >
            <BookOpen className="mr-2 h-4 w-4" /> Study Materials
          </Button>
          <Button
            variant={activeTab === "users" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("users")}
          >
            <Users className="mr-2 h-4 w-4" /> Users
          </Button>
          <Button
            variant={activeTab === "content" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("content")}
          >
            <Settings className="mr-2 h-4 w-4" /> Content
          </Button>
          <Button
            variant={activeTab === "banners" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("banners")}
          >
            <ImageIcon className="mr-2 h-4 w-4" /> Banner Management
          </Button>
          <Button
            variant={activeTab === "pricing" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("pricing")}
          >
            <DollarSign className="mr-2 h-4 w-4" /> Pricing Control
          </Button>
          <Button
            variant={activeTab === "analytics" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart3 className="mr-2 h-4 w-4" /> Analytics
          </Button>
          <Button
            variant={activeTab === "notifications" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("notifications")}
          >
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-8">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Admissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">152</div>
                  <p className="text-xs text-green-500">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Study Material Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹24,500</div>
                  <p className="text-xs text-green-500">+8% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Registered Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">328</div>
                  <p className="text-xs text-green-500">+15% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold">Recent Admissions</h2>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Institution</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Rahul Sharma</TableCell>
                        <TableCell>NIOS</TableCell>
                        <TableCell>Secondary (Class 10)</TableCell>
                        <TableCell>May 5, 2025</TableCell>
                        <TableCell>
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Completed</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Priya Singh</TableCell>
                        <TableCell>IGNOU</TableCell>
                        <TableCell>Bachelor of Arts</TableCell>
                        <TableCell>May 4, 2025</TableCell>
                        <TableCell>
                          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">Pending</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Amit Kumar</TableCell>
                        <TableCell>DU SOL</TableCell>
                        <TableCell>B.Com</TableCell>
                        <TableCell>May 3, 2025</TableCell>
                        <TableCell>
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Completed</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Neha Gupta</TableCell>
                        <TableCell>NIOS</TableCell>
                        <TableCell>Senior Secondary (Class 12)</TableCell>
                        <TableCell>May 2, 2025</TableCell>
                        <TableCell>
                          <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">Rejected</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Rajiv Mehta</TableCell>
                        <TableCell>IGNOU</TableCell>
                        <TableCell>MBA</TableCell>
                        <TableCell>May 1, 2025</TableCell>
                        <TableCell>
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Completed</span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "admissions" && (
          <div>
            <h1 className="mb-6 text-2xl font-bold">Admission Applications</h1>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="nios">NIOS</TabsTrigger>
                <TabsTrigger value="ignou">IGNOU</TabsTrigger>
                <TabsTrigger value="dusol">DU SOL</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Institution</TableHead>
                          <TableHead>Course</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Sample data - would be fetched from database in real implementation */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                          <TableRow key={i}>
                            <TableCell>Applicant {i}</TableCell>
                            <TableCell>{i % 3 === 0 ? "NIOS" : i % 3 === 1 ? "IGNOU" : "DU SOL"}</TableCell>
                            <TableCell>
                              {i % 3 === 0 ? "Secondary" : i % 3 === 1 ? "Bachelor of Arts" : "B.Com"}
                            </TableCell>
                            <TableCell>May {i}, 2025</TableCell>
                            <TableCell>
                              <span
                                className={`rounded-full px-2 py-1 text-xs ${
                                  i % 4 === 0
                                    ? "bg-green-100 text-green-800"
                                    : i % 4 === 1
                                      ? "bg-yellow-100 text-yellow-800"
                                      : i % 4 === 2
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                              >
                                {i % 4 === 0
                                  ? "Completed"
                                  : i % 4 === 1
                                    ? "Pending"
                                    : i % 4 === 2
                                      ? "Processing"
                                      : "Rejected"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Similar content for other tabs */}
              <TabsContent value="nios" className="mt-6">
                {/* NIOS specific admissions */}
              </TabsContent>

              <TabsContent value="ignou" className="mt-6">
                {/* IGNOU specific admissions */}
              </TabsContent>

              <TabsContent value="dusol" className="mt-6">
                {/* DU SOL specific admissions */}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeTab === "materials" && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Study Materials</h1>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Material
              </Button>
            </div>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="nios">NIOS</TabsTrigger>
                <TabsTrigger value="ignou">IGNOU</TabsTrigger>
                <TabsTrigger value="dusol">DU SOL</TabsTrigger>
                <TabsTrigger value="pyq">PYQs</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Institution</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Sample data - would be fetched from database in real implementation */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                          <TableRow key={i}>
                            <TableCell>Study Material {i}</TableCell>
                            <TableCell>{i % 3 === 0 ? "NIOS" : i % 3 === 1 ? "IGNOU" : "DU SOL"}</TableCell>
                            <TableCell>
                              {i % 4 === 0
                                ? "Science"
                                : i % 4 === 1
                                  ? "Mathematics"
                                  : i % 4 === 2
                                    ? "English"
                                    : "Social Science"}
                            </TableCell>
                            <TableCell>{i % 3 === 0 ? "Notes" : i % 3 === 1 ? "Guide" : "PYQ"}</TableCell>
                            <TableCell>₹{i % 3 === 0 ? "10" : i % 3 === 1 ? "100" : "0"}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Similar content for other tabs */}
            </Tabs>
          </div>
        )}

        {activeTab === "content" && (
          <div>
            <h1 className="mb-6 text-2xl font-bold">Content Management</h1>

            <Tabs defaultValue="homepage">
              <TabsList>
                <TabsTrigger value="homepage">Homepage</TabsTrigger>
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
                <TabsTrigger value="blog">Blog</TabsTrigger>
                <TabsTrigger value="faqs">FAQs</TabsTrigger>
              </TabsList>

              <TabsContent value="homepage" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Homepage Content</CardTitle>
                    <CardDescription>Update the content displayed on the homepage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="hero-title">Hero Title</Label>
                        <Input id="hero-title" defaultValue="Open the Door to Quality Education with ODL" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                        <Textarea
                          id="hero-subtitle"
                          defaultValue="Flexible learning opportunities through NIOS, IGNOU, and DU SOL. Study at your own pace with nationally recognized qualifications."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="featured-title">Featured Section Title</Label>
                        <Input id="featured-title" defaultValue="Featured Courses" />
                      </div>
                      <Button>Save Changes</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="announcements" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Announcement Bar</CardTitle>
                    <CardDescription>Update the announcement displayed at the top of the website</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="announcement-text">Announcement Text</Label>
                        <Input
                          id="announcement-text"
                          defaultValue="NIOS Admissions Open for 2025-26 | IGNOU July 2025 Session Registration Started | DU SOL Admissions Closing Soon"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="announcement-link">Link (Optional)</Label>
                        <Input id="announcement-link" placeholder="https://example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="announcement-color">Background Color</Label>
                        <Select defaultValue="blue">
                          <SelectTrigger id="announcement-color">
                            <SelectValue placeholder="Select color" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="green">Green</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                            <SelectItem value="yellow">Yellow</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button>Save Changes</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Similar content for other tabs */}
            </Tabs>
          </div>
        )}

        {activeTab === "banners" && (
          <div>
            <h1 className="mb-6 text-2xl font-bold">Banner Management</h1>

            <Card>
              <CardHeader>
                <CardTitle>Homepage Banners</CardTitle>
                <CardDescription>Manage banners displayed on the homepage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Current Banners</h3>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add New Banner
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Card key={i} className="overflow-hidden">
                        <div className="aspect-[21/9] bg-muted relative">
                          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                            Banner Image {i}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">Banner {i}</h4>
                              <p className="text-sm text-muted-foreground">Active until: May 31, 2025</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "pricing" && (
          <div>
            <h1 className="mb-6 text-2xl font-bold">Pricing Control</h1>

            <Card>
              <CardHeader>
                <CardTitle>Service Fees</CardTitle>
                <CardDescription>Manage service fees for different institutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">NIOS Service Fee</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">₹200</span>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4 mr-2" /> Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">IGNOU Service Fee</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">₹1000</span>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4 mr-2" /> Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">DU SOL Service Fee</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">₹1000</span>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4 mr-2" /> Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Course Pricing</h3>
                    <Tabs defaultValue="nios">
                      <TabsList>
                        <TabsTrigger value="nios">NIOS</TabsTrigger>
                        <TabsTrigger value="ignou">IGNOU</TabsTrigger>
                        <TabsTrigger value="dusol">DU SOL</TabsTrigger>
                      </TabsList>

                      <TabsContent value="nios" className="mt-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Course</TableHead>
                              <TableHead>Base Fee</TableHead>
                              <TableHead>Our Fee</TableHead>
                              <TableHead>Total</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Secondary (Class 10)</TableCell>
                              <TableCell>₹1,800</TableCell>
                              <TableCell>₹200</TableCell>
                              <TableCell>₹2,000</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Senior Secondary (Class 12)</TableCell>
                              <TableCell>₹2,000</TableCell>
                              <TableCell>₹200</TableCell>
                              <TableCell>₹2,200</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TabsContent>

                      <TabsContent value="ignou" className="mt-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Course</TableHead>
                              <TableHead>Base Fee</TableHead>
                              <TableHead>Our Fee</TableHead>
                              <TableHead>Total</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>BAG (Bachelor of Arts)</TableCell>
                              <TableCell>₹5,400</TableCell>
                              <TableCell>₹1,000</TableCell>
                              <TableCell>₹6,400</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>BCA (Bachelor of Computer Applications)</TableCell>
                              <TableCell>₹13,400</TableCell>
                              <TableCell>₹1,000</TableCell>
                              <TableCell>₹14,400</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TabsContent>

                      <TabsContent value="dusol" className="mt-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Course</TableHead>
                              <TableHead>Base Fee</TableHead>
                              <TableHead>Our Fee</TableHead>
                              <TableHead>Total</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>B.A. Programme</TableCell>
                              <TableCell>₹5,140</TableCell>
                              <TableCell>₹1,000</TableCell>
                              <TableCell>₹6,140</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>B.Com (Hons.)</TableCell>
                              <TableCell>₹6,840</TableCell>
                              <TableCell>₹1,000</TableCell>
                              <TableCell>₹7,840</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "analytics" && (
          <div>
            <h1 className="mb-6 text-2xl font-bold">Analytics</h1>

            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Website Visitors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,543</div>
                  <p className="text-xs text-green-500">+18% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Form Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">187</div>
                  <p className="text-xs text-green-500">+24% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7.35%</div>
                  <p className="text-xs text-green-500">+2.1% from last month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Website traffic over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Traffic chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Courses</CardTitle>
                  <CardDescription>Most viewed courses in the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Institution</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Conversion</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>B.Com</TableCell>
                        <TableCell>DU SOL</TableCell>
                        <TableCell>1,245</TableCell>
                        <TableCell>8.2%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>BCA</TableCell>
                        <TableCell>IGNOU</TableCell>
                        <TableCell>987</TableCell>
                        <TableCell>7.5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Class 12</TableCell>
                        <TableCell>NIOS</TableCell>
                        <TableCell>854</TableCell>
                        <TableCell>9.3%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors are coming from</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Source</TableHead>
                        <TableHead>Visitors</TableHead>
                        <TableHead>Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Google</TableCell>
                        <TableCell>1,542</TableCell>
                        <TableCell>60.6%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Direct</TableCell>
                        <TableCell>487</TableCell>
                        <TableCell>19.2%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Social Media</TableCell>
                        <TableCell>324</TableCell>
                        <TableCell>12.7%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Referrals</TableCell>
                        <TableCell>190</TableCell>
                        <TableCell>7.5%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Similar content for other tabs */}
      </div>
    </div>
  )
}
