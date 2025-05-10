"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Download,
  ImageIcon,
  DollarSign,
} from "lucide-react"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [stats, setStats] = useState({
    userCount: 0,
    formCount: 0,
    pendingCount: 0,
  })
  const [recentForms, setRecentForms] = useState([])
  const [allForms, setAllForms] = useState([])
  const [formVisibility, setFormVisibility] = useState({
    nios: true,
    ignou: false,
    dusol: false,
  })

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Fetch admin stats
        const statsResponse = await fetch("/api/admin/stats")

        if (!statsResponse.ok) {
          if (statsResponse.status === 401 || statsResponse.status === 403) {
            router.push("/login")
            return
          }
          throw new Error("Failed to fetch admin stats")
        }

        const statsData = await statsResponse.json()

        if (statsData.success) {
          setStats(statsData.stats)
          setRecentForms(statsData.recentForms)
        }

        // Fetch all forms
        const formsResponse = await fetch("/api/admin/forms")
        const formsData = await formsResponse.json()

        if (formsData.success) {
          setAllForms(formsData.forms)
        }

        // Fetch form visibility
        const visibilityResponse = await fetch("/api/forms/visibility")
        const visibilityData = await visibilityResponse.json()

        if (visibilityData.success) {
          const visibilityMap = {}
          visibilityData.formVisibility.forEach((item) => {
            visibilityMap[item.form_type] = item.visible
          })
          setFormVisibility(visibilityMap)
        }
      } catch (error) {
        console.error("Error fetching admin data:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load admin data. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAdminData()
  }, [router, toast])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleUpdateFormStatus = async (formId, status) => {
    try {
      const response = await fetch("/api/admin/forms/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formId, status }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Status Updated",
          description: "Form status has been updated successfully.",
        })

        // Update the forms in state
        setAllForms((prevForms) => prevForms.map((form) => (form.id === formId ? { ...form, status } : form)))

        setRecentForms((prevForms) => prevForms.map((form) => (form.id === formId ? { ...form, status } : form)))
      } else {
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: data.message || "Failed to update form status.",
        })
      }
    } catch (error) {
      console.error("Error updating form status:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update form status. Please try again.",
      })
    }
  }

  const handleToggleFormVisibility = async (formType, visible) => {
    try {
      const response = await fetch("/api/admin/visibility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formType, visible }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Visibility Updated",
          description: `${formType.toUpperCase()} form is now ${visible ? "visible" : "hidden"}.`,
        })

        // Update the visibility in state
        setFormVisibility((prev) => ({
          ...prev,
          [formType]: visible,
        }))
      } else {
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: data.message || "Failed to update form visibility.",
        })
      }
    } catch (error) {
      console.error("Error updating form visibility:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update form visibility. Please try again.",
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
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.userCount}</div>
                  <p className="text-xs text-green-500">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.formCount}</div>
                  <p className="text-xs text-green-500">+8% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pending Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingCount}</div>
                  <p className="text-xs text-yellow-500">Requires attention</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold">Recent Applications</h2>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Institution</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentForms.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center">
                            No applications found
                          </TableCell>
                        </TableRow>
                      ) : (
                        recentForms.map((form) => (
                          <TableRow key={form.id}>
                            <TableCell>{form.name}</TableCell>
                            <TableCell>{form.form_type.toUpperCase()}</TableCell>
                            <TableCell>{new Date(form.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <span
                                className={`rounded-full px-2 py-1 text-xs ${
                                  form.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : form.status === "rejected"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Select
                                  defaultValue={form.status}
                                  onValueChange={(value) => handleUpdateFormStatus(form.id, value)}
                                >
                                  <SelectTrigger className="h-8 w-[100px]">
                                    <SelectValue placeholder="Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="approved">Approve</SelectItem>
                                    <SelectItem value="rejected">Reject</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold">Form Visibility</h2>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">NIOS Forms</h3>
                        <p className="text-sm text-muted-foreground">Control visibility of NIOS admission forms</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            formVisibility.nios ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {formVisibility.nios ? "Visible" : "Hidden"}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleFormVisibility("nios", !formVisibility.nios)}
                        >
                          {formVisibility.nios ? "Hide" : "Show"}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">IGNOU Forms</h3>
                        <p className="text-sm text-muted-foreground">Control visibility of IGNOU admission forms</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            formVisibility.ignou ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {formVisibility.ignou ? "Visible" : "Hidden"}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleFormVisibility("ignou", !formVisibility.ignou)}
                        >
                          {formVisibility.ignou ? "Hide" : "Show"}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">DU SOL Forms</h3>
                        <p className="text-sm text-muted-foreground">Control visibility of DU SOL admission forms</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            formVisibility.dusol ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {formVisibility.dusol ? "Visible" : "Hidden"}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleFormVisibility("dusol", !formVisibility.dusol)}
                        >
                          {formVisibility.dusol ? "Hide" : "Show"}
                        </Button>
                      </div>
                    </div>
                  </div>
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
                          <TableHead>Email</TableHead>
                          <TableHead>Institution</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allForms.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center">
                              No applications found
                            </TableCell>
                          </TableRow>
                        ) : (
                          allForms.map((form) => (
                            <TableRow key={form.id}>
                              <TableCell>{form.name}</TableCell>
                              <TableCell>{form.email}</TableCell>
                              <TableCell>{form.form_type.toUpperCase()}</TableCell>
                              <TableCell>{new Date(form.created_at).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <span
                                  className={`rounded-full px-2 py-1 text-xs ${
                                    form.status === "approved"
                                      ? "bg-green-100 text-green-800"
                                      : form.status === "rejected"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  <Select
                                    defaultValue={form.status}
                                    onValueChange={(value) => handleUpdateFormStatus(form.id, value)}
                                  >
                                    <SelectTrigger className="h-8 w-[100px]">
                                      <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="approved">Approve</SelectItem>
                                      <SelectItem value="rejected">Reject</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Similar content for other tabs */}
              <TabsContent value="nios" className="mt-6">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allForms.filter((form) => form.form_type === "nios").length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center">
                              No NIOS applications found
                            </TableCell>
                          </TableRow>
                        ) : (
                          allForms
                            .filter((form) => form.form_type === "nios")
                            .map((form) => (
                              <TableRow key={form.id}>
                                <TableCell>{form.name}</TableCell>
                                <TableCell>{form.email}</TableCell>
                                <TableCell>{new Date(form.created_at).toLocaleDateString()}</TableCell>
                                <TableCell>
                                  <span
                                    className={`rounded-full px-2 py-1 text-xs ${
                                      form.status === "approved"
                                        ? "bg-green-100 text-green-800"
                                        : form.status === "rejected"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button variant="outline" size="sm">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                    <Select
                                      defaultValue={form.status}
                                      onValueChange={(value) => handleUpdateFormStatus(form.id, value)}
                                    >
                                      <SelectTrigger className="h-8 w-[100px]">
                                        <SelectValue placeholder="Status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="approved">Approve</SelectItem>
                                        <SelectItem value="rejected">Reject</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Content for other tabs would go here */}
      </div>
    </div>
  )
}
