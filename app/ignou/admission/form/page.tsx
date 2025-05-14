import type { Metadata } from "next"
import AdmissionForm from "@/components/forms/admission-form"

export const metadata: Metadata = {
  title: "IGNOU Admission Form | NIOStudent",
  description: "Apply for IGNOU admission through NIOStudent. Fill out the form to start your application process.",
}

export default function IGNOUAdmissionFormPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">IGNOU Admission Form</h1>
      <AdmissionForm university="IGNOU" />
    </div>
  )
}
