"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { FileText, User, LogOut } from "lucide-react"
import { logout } from "@/app/actions/user-actions"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [applications, setApplications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Fetch current user
        const userResponse = await fetch("/api/user")

        if (!userResponse.ok) {
          if (userResponse.status === 401) {
            router.push("/login")
            return
          }
          throw new Error("Failed to fetch user data")
        }

        const userData = await userResponse.json()
        setUser(userData.user)

        // Fetch user applications
        const applicationsResponse = await fetch("/api/user/applications")

        if (applicationsResponse.ok) {
          const applicationsData = await applicationsResponse.json()
          setApplications(applicationsData.applications || [])
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load user data. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [router, toast])

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to logout. Please try again.",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name || "Student"}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.filter((app) => app.status === "pending").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.filter((app) => app.status === "approved").length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="mt-8">
        <TabsList>
          <TabsTrigger value="applications">
            <FileText className="mr-2 h-4 w-4" /> My Applications
          </TabsTrigger>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" /> Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
              <CardDescription>View and track all your admission applications</CardDescription>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">You haven't submitted any applications yet.</p>
                  <Button className="mt-4" onClick={() => router.push("/admission")}>
                    Apply Now
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Institution</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.form_type.toUpperCase()}</TableCell>
                        <TableCell>{new Date(app.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span
                            className={`rounded-full px-2 py-1 text-xs ${
                              app.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : app.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => router.push(`/application/${app.id}`)}>
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-1 font-medium">Full Name</h3>
                <p className="text-muted-foreground">{user?.name}</p>
              </div>
              <div>
                <h3 className="mb-1 font-medium">Email</h3>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
              <div>
                <h3 className="mb-1 font-medium">Preferred Institution</h3>
                <p className="text-muted-foreground">{user?.institution?.toUpperCase() || "Not specified"}</p>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
