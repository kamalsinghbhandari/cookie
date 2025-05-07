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

    if (email === "niosdiscussion@gmail.com" && password === "admin123") {
      setIsAuthenticated(true)
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

        {/* Similar content for other tabs */}
      </div>
    </div>
  )
}
