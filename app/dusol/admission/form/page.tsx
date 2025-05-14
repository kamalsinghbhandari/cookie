import type { Metadata } from "next"
import AdmissionForm from "@/components/forms/admission-form"

export const metadata: Metadata = {
  title: "DU SOL Admission Form | NIOStudent",
  description:
    "Apply for Delhi University School of Open Learning admission through NIOStudent. Fill out the form to start your application process.",
}

export default function DUSOLAdmissionFormPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">DU SOL Admission Form</h1>
      <AdmissionForm university="DU SOL" />
    </div>
  )
}
