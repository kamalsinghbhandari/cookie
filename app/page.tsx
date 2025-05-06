import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BookOpen, Calendar, FileText, GraduationCap, School, Users, Clock } from "lucide-react"
import TestimonialSlider from "@/components/testimonial-slider"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-600 to-teal-800 py-16 md:py-24">
        <div className="container relative z-10 flex flex-col items-center text-center text-white">
          <h1 className="mb-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Open the Door to Quality Education with Open Distance Learning
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-teal-100">
            Flexible learning opportunities through NIOS, IGNOU, and DU SOL. Study at your own pace with nationally
            recognized qualifications.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link href="#institutions">
              <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
                Explore Institutions
              </Button>
            </Link>
            <Link href="/nios/courses">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-teal-700">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10"></div>
      </section>

      {/* Institutions Section */}
      <section id="institutions" className="py-12 md:py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Choose Your Institution</h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              Explore different open and distance learning institutions to find the one that best suits your educational
              needs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* NIOS Card */}
            <Card className="overflow-hidden">
              <div className="h-3 w-full bg-teal-600"></div>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                  <BookOpen className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <CardTitle>NIOS</CardTitle>
                  <CardDescription>National Institute of Open Schooling</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-teal-600" />
                    <span>
                      <strong>April Session:</strong> April 1 to September 15
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-teal-600" />
                    <span>
                      <strong>October Session:</strong> September 16 to March 15
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-teal-600" />
                    <span>
                      <strong>Course Duration:</strong> 1 Year
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  NIOS provides flexible, learner-centric quality education for secondary and senior secondary levels,
                  as well as vocational courses.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href="/nios/courses">
                  <Button variant="outline">View Courses</Button>
                </Link>
                <Link href="/nios/admission/form">
                  <Button className="bg-teal-600 hover:bg-teal-700">Apply Now</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* IGNOU Card */}
            <Card className="overflow-hidden">
              <div className="h-3 w-full bg-purple-600"></div>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <GraduationCap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle>IGNOU</CardTitle>
                  <CardDescription>Indira Gandhi National Open University</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-purple-600" />
                    <span>
                      <strong>January Session:</strong> November 1 to January 31
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-purple-600" />
                    <span>
                      <strong>July Session:</strong> May 1 to July 31
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-purple-600" />
                    <span>
                      <strong>Course Duration:</strong> 1-4 Years
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  IGNOU offers undergraduate, postgraduate, diploma, and certificate programs through distance and
                  online learning modes.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href="/ignou/courses">
                  <Button variant="outline">View Courses</Button>
                </Link>
                <Link href="/ignou/admission/form">
                  <Button className="bg-purple-600 hover:bg-purple-700">Apply Now</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* DU SOL Card */}
            <Card className="overflow-hidden">
              <div className="h-3 w-full bg-orange-600"></div>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <School className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <CardTitle>DU SOL</CardTitle>
                  <CardDescription>Delhi University School of Open Learning</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-orange-600" />
                    <span>
                      <strong>Admissions:</strong> June to August (Typically)
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-orange-600" />
                    <span>
                      <strong>Late Admissions:</strong> With late fee (if available)
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-orange-600" />
                    <span>
                      <strong>Course Duration:</strong> 3 Years (UG)
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  DU SOL offers undergraduate courses in Arts, Commerce, and other disciplines through the distance
                  education mode.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href="/dusol/courses">
                  <Button variant="outline">View Courses</Button>
                </Link>
                <Link href="/dusol/admission/form">
                  <Button className="bg-orange-600 hover:bg-orange-700">Apply Now</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Latest Announcements</h2>
              <p className="text-muted-foreground">Stay updated with important information</p>
            </div>
            <Link href="/nios/admission/announcements">
              <Button variant="outline" className="hidden sm:flex">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {announcements.map((announcement, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={announcement.type === "urgent" ? "destructive" : "default"}
                      className={
                        announcement.institution === "NIOS"
                          ? "bg-teal-600"
                          : announcement.institution === "IGNOU"
                            ? "bg-purple-600"
                            : "bg-orange-600"
                      }
                    >
                      {announcement.institution}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{announcement.date}</span>
                  </div>
                  <CardTitle className="mt-2 line-clamp-2">{announcement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-muted-foreground">{announcement.description}</p>
                </CardContent>
                <CardFooter>
                  <Link href={announcement.link}>
                    <Button variant="ghost" size="sm">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex justify-center sm:hidden">
            <Link href="/nios/admission/announcements">
              <Button variant="outline">
                View All Announcements <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Featured Courses</h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              Explore our comprehensive range of courses designed to help you achieve your educational goals
            </p>
          </div>

          <Tabs defaultValue="nios" className="w-full">
            <div className="flex justify-center">
              <TabsList className="mb-8">
                <TabsTrigger value="nios" className="text-teal-600">
                  NIOS
                </TabsTrigger>
                <TabsTrigger value="ignou" className="text-purple-600">
                  IGNOU
                </TabsTrigger>
                <TabsTrigger value="dusol" className="text-orange-600">
                  DU SOL
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="nios" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {niosCourses.map((course, index) => (
                  <CourseCard key={index} course={course} institution="nios" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ignou" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {ignouCourses.map((course, index) => (
                  <CourseCard key={index} course={course} institution="ignou" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="dusol" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {dusolCourses.map((course, index) => (
                  <CourseCard key={index} course={course} institution="dusol" />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-10 flex justify-center">
            <Link href="/nios/courses">
              <Button>
                View All Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose ODL Section */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Why Choose Open Distance Learning?</h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              Discover the advantages of studying through open and distance learning institutions
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-teal-600" />}
              title="Flexible Learning"
              description="Study at your own pace and schedule with our flexible learning approach"
            />
            <FeatureCard
              icon={<GraduationCap className="h-10 w-10 text-teal-600" />}
              title="Recognized Certification"
              description="Certificates are recognized by universities, employers, and institutions across India"
            />
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-teal-600" />}
              title="Comprehensive Study Material"
              description="Access quality self-learning materials designed by education experts"
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-teal-600" />}
              title="Inclusive Education"
              description="Education for all regardless of age, background, or previous academic performance"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Student Testimonials</h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              Hear from our students about their experience with open distance learning
            </p>
          </div>

          <TestimonialSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-600 py-12 text-white md:py-16">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="md:max-w-xl">
              <h2 className="text-2xl font-bold sm:text-3xl">Ready to Start Your Educational Journey?</h2>
              <p className="mt-2 text-teal-100">
                Enroll today and take the first step towards achieving your academic goals with open distance learning.
              </p>
            </div>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <Link href="/nios/admission/form">
                <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
                  Apply Now
                </Button>
              </Link>
              <Link href="/nios/courses">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-teal-700">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CourseCard({ course, institution }) {
  const getColorClass = (inst) => {
    switch (inst) {
      case "nios":
        return "bg-teal-600 hover:bg-teal-700"
      case "ignou":
        return "bg-purple-600 hover:bg-purple-700"
      case "dusol":
        return "bg-orange-600 hover:bg-orange-700"
      default:
        return "bg-teal-600 hover:bg-teal-700"
    }
  }

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
      </CardContent>
      <CardFooter>
        <Link href={`/${institution}/courses/${course.id}`} className="w-full">
          <Button className={`w-full ${getColorClass(institution)}`}>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center rounded-lg p-6 text-center transition-all hover:bg-white hover:shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

// Dummy data
const announcements = [
  {
    title: "NIOS Admission for Academic Session 2025-26 Now Open",
    description:
      "Applications are now being accepted for the 2025-26 academic session. Last date to apply is September 15, 2025.",
    date: "May 1, 2025",
    type: "new",
    institution: "NIOS",
    link: "/nios/admission/announcements/2025-admissions",
  },
  {
    title: "IGNOU July 2025 Admission Cycle Begins",
    description: "IGNOU has started the admission process for the July 2025 session. Apply before July 31, 2025.",
    date: "May 5, 2025",
    type: "new",
    institution: "IGNOU",
    link: "/ignou/admission/announcements/july-2025-admissions",
  },
  {
    title: "DU SOL Undergraduate Admissions 2025",
    description:
      "Delhi University School of Open Learning has announced admissions for undergraduate programs for 2025.",
    date: "June 1, 2025",
    type: "new",
    institution: "DU SOL",
    link: "/dusol/admission/announcements/ug-admissions-2025",
  },
  {
    title: "Revised Examination Schedule for NIOS October 2025",
    description: "The examination schedule for October 2025 has been revised. Please check the updated dates.",
    date: "April 28, 2025",
    type: "urgent",
    institution: "NIOS",
    link: "/nios/admission/announcements/revised-exam-schedule",
  },
  {
    title: "IGNOU Term-End Examination Results Declared",
    description: "Results for the December 2024 Term-End Examinations have been declared. Check your results now.",
    date: "February 15, 2025",
    type: "new",
    institution: "IGNOU",
    link: "/ignou/admission/announcements/december-2024-results",
  },
  {
    title: "DU SOL Examination Form Submission Date Extended",
    description: "The last date for examination form submission has been extended to July 15, 2025.",
    date: "July 1, 2025",
    type: "urgent",
    institution: "DU SOL",
    link: "/dusol/admission/announcements/exam-form-extension",
  },
]

const niosCourses = [
  {
    id: "sec-001",
    title: "Secondary (Class 10) - Science Stream",
    description:
      "Complete secondary education with focus on science subjects including Physics, Chemistry, Biology, and Mathematics.",
    image: "/23234fs.png",
    duration: "1 Year",
  },
  {
    id: "sec-002",
    title: "Secondary (Class 10) - Commerce Stream",
    description:
      "Secondary education with focus on commerce subjects including Business Studies, Accountancy, and Economics.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "1 Year",
  },
  {
    id: "sr-001",
    title: "Senior Secondary (Class 12) - Science",
    description: "Complete senior secondary education with focus on Physics, Chemistry, Biology/Mathematics.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "1 Year",
  },
]

const ignouCourses = [
  {
    id: "ignou-001",
    title: "Bachelor of Arts (BA)",
    description:
      "Undergraduate program in Arts with various specializations including History, Political Science, and Sociology.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "3 Years",
  },
  {
    id: "ignou-002",
    title: "Bachelor of Commerce (BCom)",
    description: "Undergraduate program in Commerce covering accounting, finance, business law, and economics.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "3 Years",
  },
  {
    id: "ignou-003",
    title: "Master of Business Administration (MBA)",
    description: "Postgraduate program in Business Administration with various specializations.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "2 Years",
  },
]

const dusolCourses = [
  {
    id: "dusol-001",
    title: "B.A. Programme",
    description: "Undergraduate program in Arts covering a wide range of subjects in humanities and social sciences.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "3 Years",
  },
  {
    id: "dusol-002",
    title: "B.Com Programme",
    description: "Undergraduate program in Commerce covering accounting, finance, business law, and economics.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "3 Years",
  },
  {
    id: "dusol-003",
    title: "B.Com (Hons)",
    description: "Specialized undergraduate program in Commerce with advanced courses.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "3 Years",
  },
]
