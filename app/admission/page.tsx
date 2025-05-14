import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getFormVisibility } from "../actions/form-actions"

export const metadata: Metadata = {
  title: "Admission Forms | NIOStudent",
  description: "Apply for admission to various open distance learning universities through NIOStudent.",
}

export default async function AdmissionPage() {
  const { success, data } = await getFormVisibility()

  const universities = [
    {
      name: "NIOS",
      fullName: "National Institute of Open Schooling",
      description: "Apply for 10th, 12th, and vocational courses through NIOS.",
      link: "/nios/admission/form",
      isVisible: true, // Default to true
    },
    {
      name: "IGNOU",
      fullName: "Indira Gandhi National Open University",
      description: "Apply for undergraduate and postgraduate programs through IGNOU.",
      link: "/ignou/admission/form",
      isVisible: true, // Default to true
    },
    {
      name: "DU SOL",
      fullName: "Delhi University School of Open Learning",
      description: "Apply for undergraduate courses through Delhi University's School of Open Learning.",
      link: "/dusol/admission/form",
      isVisible: true, // Default to true
    },
  ]

  // Update visibility based on database data if available
  if (success && data) {
    data.forEach((item: { university: string; is_visible: boolean }) => {
      const uni = universities.find((u) => u.name === item.university)
      if (uni) {
        uni.isVisible = item.is_visible
      }
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">Admission Forms</h1>
      <p className="text-gray-600 mb-8">Apply for admission to various open distance learning universities</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map((uni) => (
          <Card key={uni.name} className={uni.isVisible ? "" : "opacity-70"}>
            <CardHeader>
              <CardTitle>{uni.fullName}</CardTitle>
              <CardDescription>{uni.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className={`text-sm ${uni.isVisible ? "text-green-600" : "text-red-600"} font-medium`}>
                {uni.isVisible ? "Admissions Open" : "Admissions Closed"}
              </p>
            </CardContent>
            <CardFooter>
              {uni.isVisible ? (
                <Button asChild className="w-full">
                  <Link href={uni.link}>Apply Now</Link>
                </Button>
              ) : (
                <Button disabled className="w-full">
                  Currently Closed
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
