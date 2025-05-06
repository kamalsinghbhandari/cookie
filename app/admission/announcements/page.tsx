import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Calendar, Clock, FileText } from "lucide-react"

export default function AnnouncementsPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admission Announcements</h1>
        <p className="mt-2 text-muted-foreground">
          Stay updated with the latest admission information, important dates, and notices
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 w-full justify-start sm:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="admissions">Admissions</TabsTrigger>
          <TabsTrigger value="exams">Examinations</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {announcements.map((announcement, index) => (
              <AnnouncementCard key={index} announcement={announcement} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="admissions" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {announcements
              .filter((a) => a.category === "admissions")
              .map((announcement, index) => (
                <AnnouncementCard key={index} announcement={announcement} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="exams" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {announcements
              .filter((a) => a.category === "exams")
              .map((announcement, index) => (
                <AnnouncementCard key={index} announcement={announcement} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {announcements
              .filter((a) => a.category === "results")
              .map((announcement, index) => (
                <AnnouncementCard key={index} announcement={announcement} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Important Dates Section */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Important Dates</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left font-medium">Event</th>
                <th className="py-3 text-left font-medium">Start Date</th>
                <th className="py-3 text-left font-medium">End Date</th>
                <th className="py-3 text-left font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {importantDates.map((date, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4">{date.event}</td>
                  <td className="py-4">{date.startDate}</td>
                  <td className="py-4">{date.endDate}</td>
                  <td className="py-4">
                    <Link href={date.link}>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Eligibility Criteria</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Secondary Course (Class 10)</CardTitle>
              <CardDescription>Eligibility requirements for Class 10 admission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Age:</strong> Minimum 14 years as on 31st July of the year of admission
              </p>
              <p>
                <strong>Educational Qualification:</strong> No specific qualification required
              </p>
              <p>
                <strong>Documents Required:</strong> Proof of age, residence proof, and other specified documents
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/admission/form">
                <Button>Apply Now</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Senior Secondary Course (Class 12)</CardTitle>
              <CardDescription>Eligibility requirements for Class 12 admission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Age:</strong> Minimum 15 years as on 31st July of the year of admission
              </p>
              <p>
                <strong>Educational Qualification:</strong> Passed Class 10 or equivalent from a recognized board
              </p>
              <p>
                <strong>Documents Required:</strong> Class 10 marksheet, proof of age, residence proof, and other
                specified documents
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/admission/form">
                <Button>Apply Now</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}

function AnnouncementCard({ announcement }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant={announcement.type === "urgent" ? "destructive" : "default"}>
            {announcement.type === "urgent" ? "Urgent" : "New"}
          </Badge>
          <span className="text-sm text-muted-foreground">{announcement.date}</span>
        </div>
        <CardTitle className="mt-2 line-clamp-2">{announcement.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-muted-foreground">{announcement.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="mr-1 h-3 w-3" /> {announcement.date}
          </div>
          {announcement.deadline && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" /> Deadline: {announcement.deadline}
            </div>
          )}
          {announcement.document && (
            <div className="flex items-center text-xs text-muted-foreground">
              <FileText className="mr-1 h-3 w-3" /> {announcement.document}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={announcement.link}>
          <Button variant="ghost" size="sm">
            Read More <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

// Dummy data
const announcements = [
  {
    title: "Admission for Academic Session 2025-26 Now Open",
    description:
      "Applications are now being accepted for the 2025-26 academic session for both Secondary (10th) and Senior Secondary (12th) courses. Apply before the deadline to secure your admission.",
    date: "May 1, 2025",
    deadline: "December 31, 2025",
    type: "new",
    category: "admissions",
    document: "Admission Brochure",
    link: "/admission/announcements/2025-admissions",
  },
  {
    title: "Revised Examination Schedule for October 2025",
    description:
      "The examination schedule for October 2025 has been revised due to upcoming festivals. Please check the updated dates and make necessary arrangements.",
    date: "April 28, 2025",
    type: "urgent",
    category: "exams",
    document: "Exam Schedule",
    link: "/admission/announcements/revised-exam-schedule",
  },
  {
    title: "New Study Centers Opened in 5 States",
    description:
      "NIOS has opened new study centers in Maharashtra, Karnataka, Tamil Nadu, West Bengal, and Assam to better serve students in these regions.",
    date: "April 15, 2025",
    type: "new",
    category: "admissions",
    link: "/admission/announcements/new-study-centers",
  },
  {
    title: "Results for April 2025 Examinations Declared",
    description:
      "The results for the April 2025 examinations have been declared. Students can check their results by logging into the NIOS portal using their enrollment number.",
    date: "April 10, 2025",
    type: "new",
    category: "results",
    document: "Result Notification",
    link: "/admission/announcements/april-2025-results",
  },
  {
    title: "Special Admission Drive for Dropout Students",
    description:
      "NIOS is launching a special admission drive for students who have dropped out of formal education. Special fee concessions are available for eligible candidates.",
    date: "April 5, 2025",
    deadline: "June 30, 2025",
    type: "new",
    category: "admissions",
    link: "/admission/announcements/special-admission-drive",
  },
  {
    title: "On-Demand Examination Registration Open",
    description:
      "Registration for On-Demand Examinations is now open. Students can choose their preferred date and center for taking the examination.",
    date: "April 1, 2025",
    deadline: "Ongoing",
    type: "new",
    category: "exams",
    link: "/admission/announcements/on-demand-exams",
  },
  {
    title: "Practical Examination Schedule for Science Subjects",
    description:
      "The schedule for practical examinations for Physics, Chemistry, and Biology has been released. Students must attend the practical exams at their assigned study centers.",
    date: "March 25, 2025",
    type: "urgent",
    category: "exams",
    document: "Practical Exam Schedule",
    link: "/admission/announcements/practical-exam-schedule",
  },
  {
    title: "Verification of Documents for October 2024 Admissions",
    description:
      "Students who took admission in October 2024 session are required to submit their original documents for verification at their respective study centers.",
    date: "March 20, 2025",
    deadline: "April 30, 2025",
    type: "urgent",
    category: "admissions",
    link: "/admission/announcements/document-verification",
  },
  {
    title: "Improvement Examination Registration Open",
    description:
      "Students who wish to improve their marks can now register for improvement examinations. A maximum of two attempts are allowed for improvement.",
    date: "March 15, 2025",
    deadline: "April 15, 2025",
    type: "new",
    category: "exams",
    link: "/admission/announcements/improvement-exams",
  },
]

const importantDates = [
  {
    event: "Admission for Academic Session 2025-26",
    startDate: "May 1, 2025",
    endDate: "December 31, 2025",
    link: "/admission/announcements/2025-admissions",
  },
  {
    event: "October 2025 Examination Registration",
    startDate: "July 1, 2025",
    endDate: "August 15, 2025",
    link: "/admission/announcements/october-2025-exams",
  },
  {
    event: "October 2025 Examinations",
    startDate: "October 5, 2025",
    endDate: "October 30, 2025",
    link: "/admission/announcements/october-2025-exam-schedule",
  },
  {
    event: "April 2026 Examination Registration",
    startDate: "January 1, 2026",
    endDate: "February 15, 2026",
    link: "/admission/announcements/april-2026-exams",
  },
  {
    event: "April 2026 Examinations",
    startDate: "April 5, 2026",
    endDate: "April 30, 2026",
    link: "/admission/announcements/april-2026-exam-schedule",
  },
]
