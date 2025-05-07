import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FileText } from "lucide-react"

// Sample data for Secondary syllabus
const secondarySyllabus = {
  academic: [
    {
      name: "Hindi",
      code: "201",
      units: ["Prose", "Poetry", "Grammar", "Writing Skills"],
      theoryMarks: 80,
      practicalMarks: 20,
      practicals: "Reading and Writing Assessment",
    },
    {
      name: "English",
      code: "202",
      units: ["Prose", "Poetry", "Grammar", "Writing Skills"],
      theoryMarks: 80,
      practicalMarks: 20,
      practicals: "Reading and Writing Assessment",
    },
    {
      name: "Mathematics",
      code: "211",
      units: ["Number Systems", "Algebra", "Geometry", "Mensuration", "Statistics"],
      theoryMarks: 80,
      practicalMarks: 20,
      practicals: "Mathematical Activities and Projects",
    },
    {
      name: "Science",
      code: "212",
      units: ["Matter", "Organization in Living World", "Motion, Force and Work", "Natural Resources"],
      theoryMarks: 80,
      practicalMarks: 20,
      practicals: "Laboratory Experiments and Activities",
    },
    {
      name: "Social Science",
      code: "213",
      units: ["India and the Contemporary World", "Contemporary India", "Democratic Politics", "Economics"],
      theoryMarks: 80,
      practicalMarks: 20,
      practicals: "Project Work and Map Work",
    },
  ],
  vocational: [
    {
      name: "Home Science",
      code: "216",
      units: ["Family Resource Management", "Food and Nutrition", "Human Development", "Textiles"],
      theoryMarks: 60,
      practicalMarks: 40,
      practicals: "Cooking, Stitching, and Home Management Activities",
    },
    {
      name: "Data Entry Operations",
      code: "229",
      units: ["Computer Fundamentals", "Operating System", "MS Office", "Internet Basics"],
      theoryMarks: 40,
      practicalMarks: 60,
      practicals: "Practical Computer Operations and Software Usage",
    },
    {
      name: "Painting",
      code: "225",
      units: ["Theory of Colors", "Still Life", "Natural Landscapes", "Object Drawing"],
      theoryMarks: 30,
      practicalMarks: 70,
      practicals: "Practical Painting and Drawing Assignments",
    },
  ],
}

// Sample data for Senior Secondary syllabus
const seniorSyllabus = {
  science: [
    {
      name: "Physics",
      code: "312",
      units: ["Mechanics", "Electromagnetism", "Optics", "Modern Physics"],
      theoryMarks: 70,
      practicalMarks: 30,
      practicals: "Laboratory Experiments and Activities",
    },
    {
      name: "Chemistry",
      code: "313",
      units: ["Physical Chemistry", "Organic Chemistry", "Inorganic Chemistry", "Chemistry in Everyday Life"],
      theoryMarks: 70,
      practicalMarks: 30,
      practicals: "Laboratory Experiments and Activities",
    },
    {
      name: "Biology",
      code: "314",
      units: ["Cell Biology", "Plant Physiology", "Human Physiology", "Genetics and Evolution"],
      theoryMarks: 70,
      practicalMarks: 30,
      practicals: "Laboratory Experiments and Activities",
    },
    {
      name: "Mathematics",
      code: "311",
      units: ["Relations and Functions", "Algebra", "Calculus", "Vectors and 3D Geometry", "Probability"],
      theoryMarks: 80,
      practicalMarks: 20,
      practicals: "Mathematical Activities and Projects",
    },
  ],
  commerce: [
    {
      name: "Accountancy",
      code: "320",
      units: [
        "Accounting for Not-for-Profit Organizations",
        "Accounting for Partnership",
        "Accounting for Companies",
        "Financial Statement Analysis",
      ],
      theoryMarks: 80,
      practicalMarks: 20,
      practicals: "Practical Accounting Problems",
    },
    {
      name: "Business Studies",
      code: "319",
      units: ["Nature and Significance of Management", "Business Finance", "Marketing", "Consumer Protection"],
      theoryMarks: 100,
      practicalMarks: null,
      practicals: null,
    },
    {
      name: "Economics",
      code: "318",
      units: ["Microeconomics", "Macroeconomics", "Indian Economic Development", "Statistics for Economics"],
      theoryMarks: 100,
      practicalMarks: null,
      practicals: null,
    },
  ],
  arts: [
    {
      name: "History",
      code: "315",
      units: ["Ancient India", "Medieval India", "Modern India", "World History"],
      theoryMarks: 100,
      practicalMarks: null,
      practicals: null,
    },
    {
      name: "Geography",
      code: "316",
      units: ["Physical Geography", "Human Geography", "India - Physical Environment", "India - People and Economy"],
      theoryMarks: 80,
      practicalMarks: 20,
      practicals: "Map Work and Field Surveys",
    },
    {
      name: "Political Science",
      code: "317",
      units: ["Indian Constitution", "Politics in India", "International Relations", "Contemporary World Politics"],
      theoryMarks: 100,
      practicalMarks: null,
      practicals: null,
    },
    {
      name: "Psychology",
      code: "328",
      units: ["Foundations of Psychology", "Human Development", "Social Psychology", "Psychological Disorders"],
      theoryMarks: 80,
      practicalMarks: 20,
      practicals: "Psychological Experiments and Projects",
    },
  ],
  languages: [
    {
      name: "Hindi",
      code: "301",
      units: ["Prose", "Poetry", "Grammar", "Writing Skills", "Literature"],
      theoryMarks: 100,
      practicalMarks: null,
      practicals: null,
    },
    {
      name: "English",
      code: "302",
      units: ["Reading Comprehension", "Writing Skills", "Literature", "Grammar"],
      theoryMarks: 100,
      practicalMarks: null,
      practicals: null,
    },
    {
      name: "Sanskrit",
      code: "309",
      units: ["Prose", "Poetry", "Grammar", "Translation", "Literature"],
      theoryMarks: 100,
      practicalMarks: null,
      practicals: null,
    },
  ],
}

// Sample data for Vocational courses
const vocationalCourses = [
  {
    name: "Computer Applications",
    code: "336",
    units: ["Computer Fundamentals", "Programming in C++", "Database Management", "Web Development"],
    theoryMarks: 60,
    practicalMarks: 40,
    practicals: "Programming and Web Development Projects",
  },
  {
    name: "Travel & Tourism",
    code: "337",
    units: ["Tourism Concepts", "Tourism Products", "Customer Service", "Travel Agency Operations"],
    theoryMarks: 70,
    practicalMarks: 30,
    practicals: "Field Visits and Case Studies",
  },
  {
    name: "Library & Information Science",
    code: "339",
    units: ["Library Organization", "Reference Services", "Information Sources", "ICT Applications"],
    theoryMarks: 80,
    practicalMarks: 20,
    practicals: "Library Management Activities",
  },
  {
    name: "Mass Communication",
    code: "335",
    units: ["Introduction to Mass Communication", "Print Media", "Electronic Media", "New Media"],
    theoryMarks: 70,
    practicalMarks: 30,
    practicals: "Media Production Projects",
  },
]

export default function NIOSSyllabusPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">NIOS Syllabus</h1>
        <p className="mt-2 text-muted-foreground">
          Comprehensive syllabus for NIOS Secondary (10th) and Senior Secondary (12th) courses
        </p>
      </div>

      <Tabs defaultValue="secondary" className="w-full">
        <TabsList className="mb-6 w-full justify-start sm:w-auto">
          <TabsTrigger value="secondary">Secondary (10th)</TabsTrigger>
          <TabsTrigger value="senior">Senior Secondary (12th)</TabsTrigger>
          <TabsTrigger value="vocational">Vocational</TabsTrigger>
        </TabsList>

        <TabsContent value="secondary" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Academic Subjects</CardTitle>
                <CardDescription>Core and optional academic subjects for Secondary level</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {secondarySyllabus.academic.map((subject, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>
                        {subject.name} ({subject.code})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium">Course Structure:</h4>
                            <ul className="ml-6 list-disc space-y-1">
                              {subject.units.map((unit, idx) => (
                                <li key={idx}>{unit}</li>
                              ))}
                            </ul>
                          </div>

                          {subject.practicals && (
                            <div>
                              <h4 className="font-medium">Practical Components:</h4>
                              <p className="text-sm text-muted-foreground">{subject.practicals}</p>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <span className="text-sm">
                              <strong>Theory Marks:</strong> {subject.theoryMarks}
                            </span>
                            {subject.practicalMarks && (
                              <span className="text-sm">
                                <strong>Practical Marks:</strong> {subject.practicalMarks}
                              </span>
                            )}
                          </div>

                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <a href="#" download>
                              <FileText className="mr-2 h-4 w-4" /> Download Detailed Syllabus
                            </a>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vocational Subjects</CardTitle>
                <CardDescription>Skill-based vocational subjects for Secondary level</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {secondarySyllabus.vocational.map((subject, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>
                        {subject.name} ({subject.code})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium">Course Structure:</h4>
                            <ul className="ml-6 list-disc space-y-1">
                              {subject.units.map((unit, idx) => (
                                <li key={idx}>{unit}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium">Practical Components:</h4>
                            <p className="text-sm text-muted-foreground">{subject.practicals}</p>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-sm">
                              <strong>Theory Marks:</strong> {subject.theoryMarks}
                            </span>
                            <span className="text-sm">
                              <strong>Practical Marks:</strong> {subject.practicalMarks}
                            </span>
                          </div>

                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <a href="#" download>
                              <FileText className="mr-2 h-4 w-4" /> Download Detailed Syllabus
                            </a>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="senior" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Science Stream</CardTitle>
                <CardDescription>Science subjects for Senior Secondary level</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {seniorSyllabus.science.map((subject, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>
                        {subject.name} ({subject.code})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium">Course Structure:</h4>
                            <ul className="ml-6 list-disc space-y-1">
                              {subject.units.map((unit, idx) => (
                                <li key={idx}>{unit}</li>
                              ))}
                            </ul>
                          </div>

                          {subject.practicals && (
                            <div>
                              <h4 className="font-medium">Practical Components:</h4>
                              <p className="text-sm text-muted-foreground">{subject.practicals}</p>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <span className="text-sm">
                              <strong>Theory Marks:</strong> {subject.theoryMarks}
                            </span>
                            {subject.practicalMarks && (
                              <span className="text-sm">
                                <strong>Practical Marks:</strong> {subject.practicalMarks}
                              </span>
                            )}
                          </div>

                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <a href="#" download>
                              <FileText className="mr-2 h-4 w-4" /> Download Detailed Syllabus
                            </a>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Commerce Stream</CardTitle>
                <CardDescription>Commerce subjects for Senior Secondary level</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {seniorSyllabus.commerce.map((subject, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>
                        {subject.name} ({subject.code})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium">Course Structure:</h4>
                            <ul className="ml-6 list-disc space-y-1">
                              {subject.units.map((unit, idx) => (
                                <li key={idx}>{unit}</li>
                              ))}
                            </ul>
                          </div>

                          {subject.practicals && (
                            <div>
                              <h4 className="font-medium">Practical Components:</h4>
                              <p className="text-sm text-muted-foreground">{subject.practicals}</p>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <span className="text-sm">
                              <strong>Theory Marks:</strong> {subject.theoryMarks}
                            </span>
                            {subject.practicalMarks && (
                              <span className="text-sm">
                                <strong>Practical Marks:</strong> {subject.practicalMarks}
                              </span>
                            )}
                          </div>

                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <a href="#" download>
                              <FileText className="mr-2 h-4 w-4" /> Download Detailed Syllabus
                            </a>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Arts Stream</CardTitle>
                <CardDescription>Arts and Humanities subjects for Senior Secondary level</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {seniorSyllabus.arts.map((subject, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>
                        {subject.name} ({subject.code})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium">Course Structure:</h4>
                            <ul className="ml-6 list-disc space-y-1">
                              {subject.units.map((unit, idx) => (
                                <li key={idx}>{unit}</li>
                              ))}
                            </ul>
                          </div>

                          {subject.practicals && (
                            <div>
                              <h4 className="font-medium">Practical Components:</h4>
                              <p className="text-sm text-muted-foreground">{subject.practicals}</p>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <span className="text-sm">
                              <strong>Theory Marks:</strong> {subject.theoryMarks}
                            </span>
                            {subject.practicalMarks && (
                              <span className="text-sm">
                                <strong>Practical Marks:</strong> {subject.practicalMarks}
                              </span>
                            )}
                          </div>

                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <a href="#" download>
                              <FileText className="mr-2 h-4 w-4" /> Download Detailed Syllabus
                            </a>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
                <CardDescription>Language subjects for Senior Secondary level</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {seniorSyllabus.languages.map((subject, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>
                        {subject.name} ({subject.code})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium">Course Structure:</h4>
                            <ul className="ml-6 list-disc space-y-1">
                              {subject.units.map((unit, idx) => (
                                <li key={idx}>{unit}</li>
                              ))}
                            </ul>
                          </div>

                          {subject.practicals && (
                            <div>
                              <h4 className="font-medium">Practical Components:</h4>
                              <p className="text-sm text-muted-foreground">{subject.practicals}</p>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <span className="text-sm">
                              <strong>Theory Marks:</strong> {subject.theoryMarks}
                            </span>
                            {subject.practicalMarks && (
                              <span className="text-sm">
                                <strong>Practical Marks:</strong> {subject.practicalMarks}
                              </span>
                            )}
                          </div>

                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <a href="#" download>
                              <FileText className="mr-2 h-4 w-4" /> Download Detailed Syllabus
                            </a>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vocational" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Vocational Courses</CardTitle>
                <CardDescription>Skill-based vocational courses for career development</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {vocationalCourses.map((course, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>
                        {course.name} ({course.code})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium">Course Structure:</h4>
                            <ul className="ml-6 list-disc space-y-1">
                              {course.units.map((unit, idx) => (
                                <li key={idx}>{unit}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium">Practical Components:</h4>
                            <p className="text-sm text-muted-foreground">{course.practicals}</p>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-sm">
                              <strong>Theory Marks:</strong> {course.theoryMarks}
                            </span>
                            <span className="text-sm">
                              <strong>Practical Marks:</strong> {course.practicalMarks}
                            </span>
                          </div>

                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <a href="#" download>
                              <FileText className="mr-2 h-4 w-4" /> Download Detailed Syllabus
                            </a>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benefits of Vocational Courses</CardTitle>
                <CardDescription>Why choose NIOS vocational education</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="mb-2 font-medium">Skill Development</h3>
                  <p className="text-sm text-muted-foreground">
                    Develop practical skills that are directly applicable in the workplace, enhancing your
                    employability.
                  </p>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <h3 className="mb-2 font-medium">Career Opportunities</h3>
                  <p className="text-sm text-muted-foreground">
                    Open doors to various career paths with industry-recognized certifications and practical training.
                  </p>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <h3 className="mb-2 font-medium">Entrepreneurship</h3>
                  <p className="text-sm text-muted-foreground">
                    Gain the knowledge and skills needed to start your own business or freelance career.
                  </p>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <h3 className="mb-2 font-medium">Flexible Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Study at your own pace with NIOS's flexible learning approach, balancing education with other
                    commitments.
                  </p>
                </div>

                <Button className="w-full" asChild>
                  <a href="/nios/admission/form">Apply for Vocational Courses</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-10 rounded-lg bg-muted p-6">
        <h2 className="mb-4 text-2xl font-bold">Need Help Choosing the Right Course?</h2>
        <p className="mb-6">
          Our academic counselors can help you select the best courses based on your interests, career goals, and
          academic background.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <a href="/contact">Contact an Advisor</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/faqs">View FAQs</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
