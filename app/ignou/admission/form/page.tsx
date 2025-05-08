"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

// Program data
const programData = {
  UG: [
    { id: "ba", name: "Bachelor of Arts (BA)" },
    { id: "bcom", name: "Bachelor of Commerce (B.Com)" },
    { id: "bsc", name: "Bachelor of Science (B.Sc)" },
    { id: "bca", name: "Bachelor of Computer Applications (BCA)" },
    { id: "bba", name: "Bachelor of Business Administration (BBA)" },
  ],
  PG: [
    { id: "ma", name: "Master of Arts (MA)" },
    { id: "mcom", name: "Master of Commerce (M.Com)" },
    { id: "msc", name: "Master of Science (M.Sc)" },
    { id: "mca", name: "Master of Computer Applications (MCA)" },
    { id: "mba", name: "Master of Business Administration (MBA)" },
  ],
  Diploma: [
    { id: "dce", name: "Diploma in Creative Writing in English" },
    { id: "dcg", name: "Diploma in Counselling and Guidance" },
    { id: "dts", name: "Diploma in Tourism Studies" },
    { id: "dnhe", name: "Diploma in Nutrition and Health Education" },
  ],
  Certificate: [
    { id: "cte", name: "Certificate in Teaching of English" },
    { id: "cfn", name: "Certificate in Food and Nutrition" },
    { id: "cit", name: "Certificate in Information Technology" },
    { id: "ccp", name: "Certificate in Consumer Protection" },
  ],
}

export default function IGNOUAdmissionForm() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("program")
  const [formData, setFormData] = useState({
    programType: "",
    program: "",
    session: "July 2025",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    category: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    qualification: "",
    board: "",
    passingYear: "",
    percentage: "",
    documents: {
      photo: null,
      signature: null,
      idProof: null,
      marksheet: null,
      additional: null,
    },
    comments: "",
    agreeTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Available programs based on selected program type
  const [availablePrograms, setAvailablePrograms] = useState<{ id: string; name: string }[]>([])

  // Handle program type change
  const handleProgramTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      programType: value,
      program: "", // Reset program when program type changes
    }))

    setAvailablePrograms(programData[value as keyof typeof programData] || [])
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle file upload
  const handleFileUpload = (name: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [name]: file,
      },
    }))

    // Clear error for this field if it exists
    if (errors[`documents.${name}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[`documents.${name}`]
        return newErrors
      })
    }
  }

  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      agreeTerms: checked,
    }))

    // Clear error for this field if it exists
    if (errors.agreeTerms) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.agreeTerms
        return newErrors
      })
    }
  }

  // Handle comments change
  const handleCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      comments: e.target.value,
    }))
  }

  // Validate form data for the current tab
  const validateTab = (tab: string): boolean => {
    const newErrors: Record<string, string> = {}

    if (tab === "program") {
      if (!formData.programType) newErrors.programType = "Program type is required"
      if (!formData.program) newErrors.program = "Program is required"
    } else if (tab === "personal") {
      if (!formData.firstName) newErrors.firstName = "First name is required"
      if (!formData.lastName) newErrors.lastName = "Last name is required"
      if (!formData.email) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
      if (!formData.phone) newErrors.phone = "Phone number is required"
      else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits"
      if (!formData.gender) newErrors.gender = "Gender is required"
      if (!formData.dob) newErrors.dob = "Date of birth is required"
      if (!formData.category) newErrors.category = "Category is required"
      if (!formData.address) newErrors.address = "Address is required"
      if (!formData.city) newErrors.city = "City is required"
      if (!formData.state) newErrors.state = "State is required"
      if (!formData.pincode) newErrors.pincode = "PIN code is required"
      else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "PIN code must be 6 digits"
    } else if (tab === "education") {
      if (!formData.qualification) newErrors.qualification = "Qualification is required"
      if (!formData.board) newErrors.board = "Board/University is required"
      if (!formData.passingYear) newErrors.passingYear = "Passing year is required"
      if (!formData.percentage) newErrors.percentage = "Percentage is required"
    } else if (tab === "documents") {
      if (!formData.documents.photo) newErrors["documents.photo"] = "Photo is required"
      if (!formData.documents.signature) newErrors["documents.signature"] = "Signature is required"
      if (!formData.documents.idProof) newErrors["documents.idProof"] = "ID proof is required"
      if (!formData.documents.marksheet) newErrors["documents.marksheet"] = "Marksheet is required"

      // Validate file sizes (max 200KB)
      Object.entries(formData.documents).forEach(([key, file]) => {
        if (file && file.size > 200 * 1024) {
          newErrors[`documents.${key}`] = `${key.charAt(0).toUpperCase() + key.slice(1)} must be less than 200KB`
        }
      })
    } else if (tab === "summary") {
      if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle next button click
  const handleNext = () => {
    const isValid = validateTab(activeTab)
    if (!isValid) return

    if (activeTab === "program") setActiveTab("personal")
    else if (activeTab === "personal") setActiveTab("education")
    else if (activeTab === "education") setActiveTab("documents")
    else if (activeTab === "documents") setActiveTab("summary")
  }

  // Handle back button click
  const handleBack = () => {
    if (activeTab === "personal") setActiveTab("program")
    else if (activeTab === "education") setActiveTab("personal")
    else if (activeTab === "documents") setActiveTab("education")
    else if (activeTab === "summary") setActiveTab("documents")
  }

  // Handle form submission
  const handleSubmit = async () => {
    const isValid = validateTab("summary")
    if (!isValid) return

    setIsSubmitting(true)

    try {
      // In a real application, you would submit the form data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsSubmitted(true)

      // Redirect to success page or show success message
      // router.push('/ignou/admission/success');
    } catch (error) {
      console.error("Error submitting form:", error)
      // Handle error
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate fees
  const calculateFees = () => {
    let baseFee = 0

    // Set base fee based on program type
    if (formData.programType === "UG") baseFee = 2800
    else if (formData.programType === "PG") baseFee = 3500
    else if (formData.programType === "Diploma") baseFee = 2000
    else if (formData.programType === "Certificate") baseFee = 1500

    // Add registration fee
    const registrationFee = 200

    // Add examination fee
    const examinationFee = 150 * 5 // Assuming 5 subjects

    // Add late fee if applicable (not implemented in this example)
    const lateFee = 0

    // Calculate total fee
    const totalFee = baseFee + registrationFee + examinationFee + lateFee

    return {
      baseFee,
      registrationFee,
      examinationFee,
      lateFee,
      totalFee,
    }
  }

  // If form is submitted, show success message
  if (isSubmitted) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Application Submitted Successfully!</CardTitle>
            <CardDescription className="text-center">
              Thank you for applying to IGNOU through our platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Your application has been received</h3>
              <p className="text-green-700 mb-4">
                Your application for {formData.program} ({formData.session}) has been submitted successfully.
              </p>
              <p className="text-sm text-green-600">
                Application Reference: IGNOU
                {Math.floor(Math.random() * 1000000)
                  .toString()
                  .padStart(6, "0")}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Next Steps:</h4>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>You will receive a confirmation email shortly.</li>
                <li>Our team will verify your documents and application details.</li>
                <li>Once verified, you will receive payment instructions.</li>
                <li>After payment, your enrollment will be confirmed.</li>
              </ol>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button onClick={() => router.push("/")}>Return to Home</Button>
            <Button variant="outline" onClick={() => window.print()}>
              Print Receipt
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">IGNOU Admission Form</CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to apply for admission to IGNOU programs.
          </CardDescription>
        </CardHeader>

        <Alert className="mx-6 mb-4">
          <Info className="h-4 w-4" />
          <AlertTitle>Current Session Information</AlertTitle>
          <AlertDescription>
            Applications are now open for the July 2025 session. Last date to apply without late fee is June 30, 2025.
          </AlertDescription>
        </Alert>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="program">Program</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="program" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="programType">
                    Program Type <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.programType} onValueChange={(value) => handleProgramTypeChange(value)}>
                    <SelectTrigger id="programType">
                      <SelectValue placeholder="Select Program Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UG">Undergraduate (UG)</SelectItem>
                      <SelectItem value="PG">Postgraduate (PG)</SelectItem>
                      <SelectItem value="Diploma">Diploma</SelectItem>
                      <SelectItem value="Certificate">Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.programType && <p className="text-red-500 text-sm mt-1">{errors.programType}</p>}
                </div>

                <div>
                  <Label htmlFor="program">
                    Program <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.program}
                    onValueChange={(value) => handleSelectChange("program", value)}
                    disabled={!formData.programType}
                  >
                    <SelectTrigger id="program">
                      <SelectValue
                        placeholder={formData.programType ? "Select Program" : "Select Program Type first"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePrograms.map((program) => (
                        <SelectItem key={program.id} value={program.name}>
                          {program.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.program && <p className="text-red-500 text-sm mt-1">{errors.program}</p>}
                </div>

                <div>
                  <Label htmlFor="session">
                    Session <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.session} onValueChange={(value) => handleSelectChange("session", value)}>
                    <SelectTrigger id="session">
                      <SelectValue placeholder="Select Session" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="July 2025">July 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="personal" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <Label htmlFor="lastName">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="gender">
                    Gender <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                </div>

                <div>
                  <Label htmlFor="dob">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleInputChange} />
                  {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                </div>

                <div>
                  <Label htmlFor="category">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="obc">OBC</SelectItem>
                      <SelectItem value="sc">SC</SelectItem>
                      <SelectItem value="st">ST</SelectItem>
                      <SelectItem value="ews">EWS</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="address">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleInputChange} />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div>
                  <Label htmlFor="city">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleInputChange} />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                <div>
                  <Label htmlFor="state">
                    State <span className="text-red-500">*</span>
                  </Label>
                  <Input id="state" name="state" value={formData.state} onChange={handleInputChange} />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>

                <div>
                  <Label htmlFor="pincode">
                    PIN Code <span className="text-red-500">*</span>
                  </Label>
                  <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} />
                  {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="qualification">
                    Highest Qualification <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.qualification}
                    onValueChange={(value) => handleSelectChange("qualification", value)}
                  >
                    <SelectTrigger id="qualification">
                      <SelectValue placeholder="Select Qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10th">10th</SelectItem>
                      <SelectItem value="12th">12th</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="postgraduate">Post Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>}
                </div>

                <div>
                  <Label htmlFor="board">
                    Board/University <span className="text-red-500">*</span>
                  </Label>
                  <Input id="board" name="board" value={formData.board} onChange={handleInputChange} />
                  {errors.board && <p className="text-red-500 text-sm mt-1">{errors.board}</p>}
                </div>

                <div>
                  <Label htmlFor="passingYear">
                    Passing Year <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="passingYear"
                    name="passingYear"
                    value={formData.passingYear}
                    onChange={handleInputChange}
                  />
                  {errors.passingYear && <p className="text-red-500 text-sm mt-1">{errors.passingYear}</p>}
                </div>

                <div>
                  <Label htmlFor="percentage">
                    Percentage/CGPA <span className="text-red-500">*</span>
                  </Label>
                  <Input id="percentage" name="percentage" value={formData.percentage} onChange={handleInputChange} />
                  {errors.percentage && <p className="text-red-500 text-sm mt-1">{errors.percentage}</p>}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="photo">
                    Passport Size Photo <span className="text-red-500">*</span> (JPG, max 200KB)
                  </Label>
                  <Input
                    id="photo"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("photo", e.target.files?.[0] || null)}
                  />
                  {errors["documents.photo"] && (
                    <p className="text-red-500 text-sm mt-1">{errors["documents.photo"]}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="signature">
                    Signature <span className="text-red-500">*</span> (JPG, max 200KB)
                  </Label>
                  <Input
                    id="signature"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("signature", e.target.files?.[0] || null)}
                  />
                  {errors["documents.signature"] && (
                    <p className="text-red-500 text-sm mt-1">{errors["documents.signature"]}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="idProof">
                    ID Proof <span className="text-red-500">*</span> (PDF/JPG, max 200KB)
                  </Label>
                  <Input
                    id="idProof"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileUpload("idProof", e.target.files?.[0] || null)}
                  />
                  {errors["documents.idProof"] && (
                    <p className="text-red-500 text-sm mt-1">{errors["documents.idProof"]}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="marksheet">
                    Last Qualification Marksheet <span className="text-red-500">*</span> (PDF/JPG, max 200KB)
                  </Label>
                  <Input
                    id="marksheet"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileUpload("marksheet", e.target.files?.[0] || null)}
                  />
                  {errors["documents.marksheet"] && (
                    <p className="text-red-500 text-sm mt-1">{errors["documents.marksheet"]}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="additional">Additional Document (Optional) (PDF/JPG, max 200KB)</Label>
                  <Input
                    id="additional"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileUpload("additional", e.target.files?.[0] || null)}
                  />
                  {errors["documents.additional"] && (
                    <p className="text-red-500 text-sm mt-1">{errors["documents.additional"]}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="comments">Additional Comments (Optional)</Label>
                  <textarea
                    id="comments"
                    className="w-full p-2 border rounded-md"
                    rows={4}
                    value={formData.comments}
                    onChange={handleCommentsChange}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Program Details</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="text-sm text-gray-500">Program Type:</div>
                    <div>{formData.programType}</div>
                    <div className="text-sm text-gray-500">Program:</div>
                    <div>{formData.program}</div>
                    <div className="text-sm text-gray-500">Session:</div>
                    <div>{formData.session}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Personal Details</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="text-sm text-gray-500">Name:</div>
                    <div>
                      {formData.firstName} {formData.lastName}
                    </div>
                    <div className="text-sm text-gray-500">Email:</div>
                    <div>{formData.email}</div>
                    <div className="text-sm text-gray-500">Phone:</div>
                    <div>{formData.phone}</div>
                    <div className="text-sm text-gray-500">Gender:</div>
                    <div>{formData.gender}</div>
                    <div className="text-sm text-gray-500">Date of Birth:</div>
                    <div>{formData.dob}</div>
                    <div className="text-sm text-gray-500">Category:</div>
                    <div>{formData.category}</div>
                    <div className="text-sm text-gray-500">Address:</div>
                    <div>
                      {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Educational Details</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="text-sm text-gray-500">Qualification:</div>
                    <div>{formData.qualification}</div>
                    <div className="text-sm text-gray-500">Board/University:</div>
                    <div>{formData.board}</div>
                    <div className="text-sm text-gray-500">Passing Year:</div>
                    <div>{formData.passingYear}</div>
                    <div className="text-sm text-gray-500">Percentage/CGPA:</div>
                    <div>{formData.percentage}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Fee Details</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {(() => {
                      const fees = calculateFees()
                      return (
                        <>
                          <div className="text-sm text-gray-500">Program Fee:</div>
                          <div>₹{fees.baseFee}</div>
                          <div className="text-sm text-gray-500">Registration Fee:</div>
                          <div>₹{fees.registrationFee}</div>
                          <div className="text-sm text-gray-500">Examination Fee:</div>
                          <div>₹{fees.examinationFee}</div>
                          <div className="text-sm text-gray-500">Late Fee:</div>
                          <div>₹{fees.lateFee}</div>
                          <div className="text-sm font-medium text-gray-500">Total Fee:</div>
                          <div className="font-medium">₹{fees.totalFee}</div>
                        </>
                      )
                    })()}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="agreeTerms" checked={formData.agreeTerms} onCheckedChange={handleCheckboxChange} />
                    <label
                      htmlFor="agreeTerms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms and conditions and confirm that the information provided is correct.
                    </label>
                  </div>
                  {errors.agreeTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={activeTab === "program"}>
            Back
          </Button>

          {activeTab === "summary" ? (
            <Button onClick={handleSubmit} disabled={isSubmitting || !formData.agreeTerms}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
