import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BookOpen, Calendar, GraduationCap, School, Clock } from "lucide-react"
import TestimonialSlider from "@/components/testimonial-slider"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative nios-gradient py-16 md:py-24">
        <div className="container relative z-10 flex flex-col items-center text-center text-white">
          <h1 className="mb-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Open the Door to Quality Education with ODL
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-teal-100">
            Flexible learning opportunities through NIOS, IGNOU, and DU SOL. Study at your own pace with nationally
            recognized qualifications.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link href="#institutions">
              <Button size="lg" className="bg-white text-nios-700 hover:bg-teal-50">
                Explore Institutions
              </Button>
            </Link>
            <Link href="/nios/courses">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-nios-700">
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
            <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="h-3 w-full bg-nios-600"></div>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-nios-100">
                  <BookOpen className="h-6 w-6 text-nios-600" />
                </div>
                <div>
                  <CardTitle>NIOS</CardTitle>
                  <CardDescription>National Institute of Open Schooling</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-nios-600" />
                    <span>
                      <strong>April Session:</strong> April 1 to September 15
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-nios-600" />
                    <span>
                      <strong>October Session:</strong> September 16 to March 15
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-nios-600" />
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
                  <Button className="bg-nios-600 hover:bg-nios-700">Apply Now</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* IGNOU Card */}
            <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="h-3 w-full bg-ignou-600"></div>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ignou-100">
                  <GraduationCap className="h-6 w-6 text-ignou-600" />
                </div>
                <div>
                  <CardTitle>IGNOU</CardTitle>
                  <CardDescription>Indira Gandhi National Open University</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-ignou-600" />
                    <span>
                      <strong>January Session:</strong> November 1 to January 31
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-ignou-600" />
                    <span>
                      <strong>July Session:</strong> May 1 to July 31
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-ignou-600" />
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
                  <Button className="bg-ignou-600 hover:bg-ignou-700">Apply Now</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* DU SOL Card */}
            <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="h-3 w-full bg-dusol-600"></div>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-dusol-100">
                  <School className="h-6 w-6 text-dusol-600" />
                </div>
                <div>
                  <CardTitle>DU SOL</CardTitle>
                  <CardDescription>Delhi University School of Open Learning</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-dusol-600" />
                    <span>
                      <strong>Admissions:</strong> June to August (Typically)
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-dusol-600" />
                    <span>
                      <strong>Late Admissions:</strong> With late fee (if available)
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-dusol-600" />
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
                  <Button className="bg-dusol-600 hover:bg-dusol-700">Apply Now</Button>
                </Link>
              </CardFooter>
            </Card>
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
                <TabsTrigger value="nios" className="text-nios-600">
                  NIOS
                </TabsTrigger>
                <TabsTrigger value="ignou" className="text-ignou-600">
                  IGNOU
                </TabsTrigger>
                <TabsTrigger value="dusol" className="text-dusol-600">
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
            <Link href="/courses">
              <Button>
                View All Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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

      {/* FAQs Preview Section */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              Find answers to common questions about distance education and our institutions
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <Tabs defaultValue="nios" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="nios">NIOS</TabsTrigger>
                <TabsTrigger value="ignou">IGNOU</TabsTrigger>
                <TabsTrigger value="dusol">DU SOL</TabsTrigger>
              </TabsList>
              <TabsContent value="nios" className="mt-6">
                <FaqPreview
                  faqs={[
                    {
                      question: "Who can apply for NIOS?",
                      answer:
                        "Anyone can apply for NIOS courses without any age restriction. There is no upper age limit for admission.",
                    },
                    {
                      question: "What documents are needed for NIOS admission?",
                      answer:
                        "You need identity proof, address proof, date of birth certificate, and previous qualification certificates.",
                    },
                    {
                      question: "How much does NIOS admission cost?",
                      answer:
                        "NIOS admission fees vary based on course and category. Secondary courses start from ₹1,560 for SC/ST/PWD candidates.",
                    },
                  ]}
                />
              </TabsContent>
              <TabsContent value="ignou" className="mt-6">
                <FaqPreview
                  faqs={[
                    {
                      question: "What is the course fee for IGNOU programs?",
                      answer:
                        "IGNOU course fees vary by program. Bachelor's programs range from ₹7,200 to ₹30,000 depending on the course.",
                    },
                    {
                      question: "How do I upload documents for IGNOU admission?",
                      answer:
                        "Documents can be uploaded through the IGNOU admission portal in JPG, JPEG or PDF format with size less than 500KB each.",
                    },
                    {
                      question: "What is the eligibility for IGNOU admission?",
                      answer:
                        "Eligibility varies by program. For Bachelor's programs, 12th pass is required. For Master's, a Bachelor's degree is needed.",
                    },
                  ]}
                />
              </TabsContent>
              <TabsContent value="dusol" className="mt-6">
                <FaqPreview
                  faqs={[
                    {
                      question: "What are the eligibility criteria for DU SOL?",
                      answer:
                        "For undergraduate courses, candidates must have passed 12th with minimum required percentage as per DU norms.",
                    },
                    {
                      question: "How do I pay DU SOL fees?",
                      answer:
                        "Fees can be paid online through credit card, debit card, or net banking during the admission process.",
                    },
                    {
                      question: "Are DU SOL degrees recognized?",
                      answer:
                        "Yes, DU SOL degrees are fully recognized by UGC and have the same value as regular Delhi University degrees.",
                    },
                  ]}
                />
              </TabsContent>
            </Tabs>

            <div className="mt-8 text-center">
              <Link href="/faqs">
                <Button variant="outline">
                  View All FAQs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="nios-gradient py-12 text-white md:py-16">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="md:max-w-xl">
              <h2 className="text-2xl font-bold sm:text-3xl">Ready to Start Your Educational Journey?</h2>
              <p className="mt-2 text-teal-100">
                Enroll today and take the first step towards achieving your academic goals with open distance learning.
              </p>
            </div>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <Link href="/register">
                <Button size="lg" className="bg-white text-nios-700 hover:bg-teal-50">
                  Register Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-nios-700">
                  Contact Us
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
        return "bg-nios-600 hover:bg-nios-700"
      case "ignou":
        return "bg-ignou-600 hover:bg-ignou-700"
      case "dusol":
        return "bg-dusol-600 hover:bg-dusol-700"
      default:
        return "bg-nios-600 hover:bg-nios-700"
    }
  }

  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={course.image || "/placeholder.svg?height=200&width=300"}
          alt={course.title}
          className="h-full w-full object-cover"
        />
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

function FaqPreview({ faqs }) {
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="rounded-lg border p-4 shadow-sm">
          <h3 className="font-medium">{faq.question}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
        </div>
      ))}
    </div>
  )
}

// Dummy data
const niosCourses = [
  {
    id: "sec-001",
    title: "Secondary (Class 10) - Science Stream",
    description:
      "Complete secondary education with focus on science subjects including Physics, Chemistry, Biology, and Mathematics.",
    image: "/placeholder.svg?height=200&width=300",
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
