"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, FileText, Search } from "lucide-react"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSecondary = secondaryCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subjects.some((subject) => subject.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredSenior = seniorSecondaryCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subjects.some((subject) => subject.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredVocational = vocationalCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Courses & Study Materials</h1>
        <p className="mt-2 text-muted-foreground">
          Explore our comprehensive range of courses and access study materials
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses or subjects..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="secondary" className="w-full">
        <TabsList className="mb-6 w-full justify-start sm:w-auto">
          <TabsTrigger value="secondary">Secondary (10th)</TabsTrigger>
          <TabsTrigger value="senior">Senior Secondary (12th)</TabsTrigger>
          <TabsTrigger value="vocational">Vocational</TabsTrigger>
        </TabsList>

        <TabsContent value="secondary" className="mt-0">
          {filteredSecondary.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
              <p className="text-muted-foreground">No courses found matching your search.</p>
              <Button variant="link" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSecondary.map((course, index) => (
                <CourseCard key={index} course={course} level="secondary" />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="senior" className="mt-0">
          {filteredSenior.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
              <p className="text-muted-foreground">No courses found matching your search.</p>
              <Button variant="link" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSenior.map((course, index) => (
                <CourseCard key={index} course={course} level="senior" />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="vocational" className="mt-0">
          {filteredVocational.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
              <p className="text-muted-foreground">No courses found matching your search.</p>
              <Button variant="link" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredVocational.map((course, index) => (
                <VocationalCourseCard key={index} course={course} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Study Materials Section */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Popular Study Materials</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {studyMaterials.map((material, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{material.type}</Badge>
                  <span className="text-sm text-muted-foreground">
                    <Calendar className="mr-1 inline-block h-4 w-4" />
                    {material.date}
                  </span>
                </div>
                <CardTitle className="mt-2 line-clamp-1">{material.title}</CardTitle>
                <CardDescription>{material.subject}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-muted-foreground">{material.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <a href={material.downloadLink} download>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={material.viewLink}>
                    <FileText className="mr-2 h-4 w-4" /> View Online
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

function CourseCard({ course, level }) {
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden bg-slate-100">
        <img src={course.image || "/placeholder.svg"} alt={course.title} className="h-full w-full object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{course.title}</CardTitle>
        <CardDescription className="flex items-center">
          <Calendar className="mr-1 h-4 w-4" /> {course.duration}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-muted-foreground">{course.description}</p>
        <div className="mt-4">
          <h4 className="mb-2 text-sm font-medium">Subjects:</h4>
          <div className="flex flex-wrap gap-2">
            {course.subjects.map((subject, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {subject}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/courses/${level}/${course.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function VocationalCourseCard({ course }) {
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden bg-slate-100">
        <img src={course.image || "/placeholder.svg"} alt={course.title} className="h-full w-full object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{course.title}</CardTitle>
        <div className="flex items-center justify-between">
          <CardDescription className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" /> {course.duration}
          </CardDescription>
          <Badge>{course.level}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-muted-foreground">{course.description}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/courses/vocational/${course.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

// Dummy data
const secondaryCourses = [
  {
    id: "sec-001",
    title: "Secondary (Class 10) - Science Stream",
    description:
      "Complete secondary education with focus on science subjects including Physics, Chemistry, Biology, and Mathematics.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "1-2 Years",
    subjects: ["Hindi", "English", "Mathematics", "Science", "Social Science", "Home Science"],
  },
  {
    id: "sec-002",
    title: "Secondary (Class 10) - Commerce Stream",
    description:
      "Secondary education with focus on commerce subjects including Business Studies, Accountancy, and Economics.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "1-2 Years",
    subjects: ["Hindi", "English", "Mathematics", "Science", "Social Science", "Business Studies"],
  },
  {
    id: "sec-003",
    title: "Secondary (Class 10) - Arts Stream",
    description:
      "Secondary education with focus on arts and humanities including History, Geography, Political Science, and Languages.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "1-2 Years",
    subjects: ["Hindi", "English", "Mathematics", "Science", "Social Science", "Painting"],
  },
  {
    id: "sec-004",
    title: "Secondary (Class 10) - Vocational Stream",
    description: "Secondary education with focus on vocational skills along with academic subjects.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "1-2 Years",
    subjects: ["Hindi", "English", "Mathematics", "Science", "Social Science", "IT Skills"],
  },
]

const seniorSecondaryCourses = [
  {
    id: "sr-001",
    title: "Senior Secondary (Class 12) - Science",
    description: "Complete senior secondary education with focus on Physics, Chemistry, Biology/Mathematics.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "1-2 Years",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Hindi/Regional Language"],
  },
  {
    id: "sr-002",
    title: "Senior Secondary (Class 12) - Commerce",
    description: "Senior secondary education with focus on Accountancy, Business Studies, Economics, and Mathematics.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "1-2 Years",
    subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics", "English", "Hindi/Regional Language"],
  },
  {
    id: "sr-003",
    title: "Senior Secondary (Class 12) - Arts",
    description:
      "Senior secondary education with focus on History, Geography, Political Science, Sociology, and Languages.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "1-2 Years",
    subjects: ["History", "Geography", "Political Science", "Sociology", "English", "Hindi/Regional Language"],
  },
  {
    id: "sr-004",
    title: "Senior Secondary (Class 12) - Humanities",
    description: "Senior secondary education with focus on Psychology, Philosophy, and other humanities subjects.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "1-2 Years",
    subjects: ["Psychology", "Philosophy", "Sociology", "Political Science", "English", "Hindi/Regional Language"],
  },
]

const vocationalCourses = [
  {
    id: "voc-001",
    title: "Certificate in Computer Applications",
    description:
      "Learn essential computer skills including office applications, internet usage, and basic programming.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "6 Months",
    level: "Certificate",
  },
  {
    id: "voc-002",
    title: "Diploma in Web Development",
    description: "Learn to create and maintain websites using HTML, CSS, JavaScript, and popular frameworks.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "1 Year",
    level: "Diploma",
  },
  {
    id: "voc-003",
    title: "Certificate in Early Childhood Care and Education",
    description: "Learn about child development, early education methods, and childcare practices.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "6 Months",
    level: "Certificate",
  },
  {
    id: "voc-004",
    title: "Diploma in Business Management",
    description: "Learn essential business management skills including marketing, finance, and human resources.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "1 Year",
    level: "Diploma",
  },
  {
    id: "voc-005",
    title: "Certificate in Digital Marketing",
    description: "Learn digital marketing strategies, social media marketing, SEO, and online advertising.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "6 Months",
    level: "Certificate",
  },
  {
    id: "voc-006",
    title: "Diploma in Financial Accounting",
    description: "Learn financial accounting principles, taxation, and financial statement preparation.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "1 Year",
    level: "Diploma",
  },
]

const studyMaterials = [
  {
    title: "Mathematics - Algebra and Calculus",
    subject: "Mathematics (Class 12)",
    description: "Comprehensive study material covering algebra, calculus, and trigonometry for Class 12 students.",
    type: "PDF",
    date: "Jan 15, 2025",
    downloadLink: "#",
    viewLink: "#",
  },
  {
    title: "Physics - Mechanics and Thermodynamics",
    subject: "Physics (Class 12)",
    description: "Detailed notes on mechanics, thermodynamics, and related topics with solved examples.",
    type: "PDF",
    date: "Feb 10, 2025",
    downloadLink: "#",
    viewLink: "#",
  },
  {
    title: "English - Grammar and Composition",
    subject: "English (Class 10)",
    description: "Study material covering grammar rules, essay writing, and comprehension for Class 10 students.",
    type: "PDF",
    date: "Mar 5, 2025",
    downloadLink: "#",
    viewLink: "#",
  },
  {
    title: "Chemistry - Organic Chemistry",
    subject: "Chemistry (Class 12)",
    description: "Comprehensive notes on organic chemistry including reactions, mechanisms, and named reactions.",
    type: "PDF",
    date: "Apr 20, 2025",
    downloadLink: "#",
    viewLink: "#",
  },
  {
    title: "Social Science - History and Civics",
    subject: "Social Science (Class 10)",
    description: "Study material covering Indian history, world history, and civics for Class 10 students.",
    type: "PDF",
    date: "May 12, 2025",
    downloadLink: "#",
    viewLink: "#",
  },
  {
    title: "Business Studies - Marketing and Finance",
    subject: "Business Studies (Class 12)",
    description: "Comprehensive notes on marketing principles, financial management, and business organization.",
    type: "PDF",
    date: "Jun 8, 2025",
    downloadLink: "#",
    viewLink: "#",
  },
]
