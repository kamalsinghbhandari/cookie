import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">ODL Blog</h1>
        <p className="mt-2 text-muted-foreground">Articles, tips, and guides for open distance learning students</p>
      </div>

      {/* Featured Post */}
      <div className="mb-12">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="order-2 md:order-1">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <Badge className="bg-nios-600">Featured</Badge>
                  <span className="text-sm text-muted-foreground">
                    <Calendar className="mr-1 inline-block h-4 w-4" />
                    May 1, 2025
                  </span>
                </div>
                <CardTitle className="text-2xl">How to Prepare for NIOS Examinations: A Complete Guide</CardTitle>
                <CardDescription>
                  Comprehensive strategies and tips to help you excel in your NIOS examinations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-muted-foreground">
                  Preparing for NIOS examinations requires a strategic approach. This comprehensive guide covers
                  everything from creating a study schedule to effective revision techniques and exam-day strategies.
                  Follow these expert tips to maximize your performance and achieve excellent results.
                </p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <User className="mr-1 h-4 w-4" />
                  <span>By Dr. Rajesh Kumar</span>
                  <span className="mx-2">•</span>
                  <Clock className="mr-1 h-4 w-4" />
                  <span>10 min read</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/blog/how-to-prepare-for-nios-examinations">
                  <Button className="bg-nios-600 hover:bg-nios-700">
                    Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-video h-full w-full">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Students studying for exams"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="outline">{post.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  <Calendar className="mr-1 inline-block h-4 w-4" />
                  {post.date}
                </span>
              </div>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-muted-foreground">{post.excerpt}</p>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <User className="mr-1 h-4 w-4" />
                <span>By {post.author}</span>
                <span className="mx-2">•</span>
                <Clock className="mr-1 h-4 w-4" />
                <span>{post.readTime} read</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/blog/${post.slug}`}>
                <Button variant="ghost">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-10 flex justify-center">
        <Button variant="outline" size="lg">
          Load More Articles
        </Button>
      </div>

      {/* Categories Section */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Browse by Category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category, index) => (
            <Link key={index} href={`/blog/category/${category.slug}`}>
              <div className="flex flex-col items-center rounded-lg p-4 text-center transition-colors hover:bg-slate-50">
                <div className="mb-2 rounded-full bg-nios-100 p-3 text-nios-600">{category.icon}</div>
                <h3 className="text-sm font-medium">{category.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{category.count} articles</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

// Dummy data
const blogPosts = [
  {
    title: "10 Study Habits of Successful NIOS Students",
    excerpt:
      "Discover the study habits and techniques that top-performing NIOS students use to achieve excellent results in their examinations.",
    image: "/placeholder.svg?height=200&width=300",
    date: "April 28, 2025",
    author: "Priya Sharma",
    readTime: "7 min",
    category: "Study Tips",
    slug: "study-habits-successful-students",
  },
  {
    title: "Understanding the IGNOU Credit Transfer System",
    excerpt:
      "A comprehensive guide to the IGNOU credit transfer system and how you can use it to your advantage when transitioning from other universities.",
    image: "/placeholder.svg?height=200&width=300",
    date: "April 22, 2025",
    author: "Amit Kumar",
    readTime: "5 min",
    category: "IGNOU",
    slug: "understanding-ignou-credit-transfer",
  },
  {
    title: "Career Options After DU SOL: What You Need to Know",
    excerpt:
      "Explore the various career paths and higher education opportunities available to DU SOL graduates in India and abroad.",
    image: "/placeholder.svg?height=200&width=300",
    date: "April 15, 2025",
    author: "Dr. Neha Gupta",
    readTime: "8 min",
    category: "Career Guidance",
    slug: "career-options-after-dusol",
  },
  {
    title: "How to Balance Work and Studies as an ODL Student",
    excerpt:
      "Practical tips and strategies for working professionals who are pursuing their education through distance learning.",
    image: "/placeholder.svg?height=200&width=300",
    date: "April 10, 2025",
    author: "Rajiv Mehta",
    readTime: "6 min",
    category: "Study Tips",
    slug: "balance-work-and-studies",
  },
  {
    title: "NIOS vs. IGNOU vs. DU SOL: Making the Right Choice",
    excerpt:
      "A comparative analysis of the three major distance education institutions to help you decide which option is better suited for your educational needs.",
    image: "/placeholder.svg?height=200&width=300",
    date: "April 5, 2025",
    author: "Sunita Patel",
    readTime: "9 min",
    category: "Education",
    slug: "comparing-distance-education-options",
  },
  {
    title: "Mastering Mathematics: Tips for NIOS Students",
    excerpt:
      "Effective strategies and resources to help NIOS students overcome challenges in mathematics and excel in their exams.",
    image: "/placeholder.svg?height=200&width=300",
    date: "March 30, 2025",
    author: "Prof. Raman Iyer",
    readTime: "7 min",
    category: "Subject Guides",
    slug: "mastering-mathematics",
  },
]

const categories = [
  {
    name: "Study Tips",
    count: 24,
    slug: "study-tips",
    icon: <BookIcon className="h-5 w-5" />,
  },
  {
    name: "NIOS",
    count: 18,
    slug: "nios",
    icon: <FileTextIcon className="h-5 w-5" />,
  },
  {
    name: "IGNOU",
    count: 15,
    slug: "ignou",
    icon: <GraduationCapIcon className="h-5 w-5" />,
  },
  {
    name: "DU SOL",
    count: 12,
    slug: "dusol",
    icon: <SchoolIcon className="h-5 w-5" />,
  },
  {
    name: "Career Guidance",
    count: 20,
    slug: "career-guidance",
    icon: <CompassIcon className="h-5 w-5" />,
  },
  {
    name: "Success Stories",
    count: 9,
    slug: "success-stories",
    icon: <TrophyIcon className="h-5 w-5" />,
  },
]

// Icons for categories
function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}

function FileTextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}

function GraduationCapIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  )
}

function SchoolIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4 6 8-4 8 4" />
      <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
      <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
      <path d="M18 5v17" />
      <path d="M6 5v17" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  )
}

function CompassIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

function TrophyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}
