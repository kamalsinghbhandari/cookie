"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle2, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

// Helper functions for IGNOU programs
const getIgnouPrograms = (programType) => {
  switch (programType) {
    case "bachelor":
      return [
        { code: "BAG", name: "Bachelor of Arts", fee: 7200 },
        { code: "BCOM", name: "Bachelor of Commerce", fee: 7800 },
        { code: "BSC", name: "Bachelor of Science", fee: 8400 },
        { code: "BCA", name: "Bachelor of Computer Applications", fee: 12000 },
      ]
    case "master":
      return [
        { code: "MAH", name: "Master of Arts (History)", fee: 8400 },
        { code: "MCOM", name: "Master of Commerce", fee: 8400 },
        { code: "MCA", name: "Master of Computer Applications", fee: 14400 },
        { code: "MBA", name: "Master of Business Administration", fee: 18000 },
      ]
    case "diploma":
      return [
        { code: "PGDCA", name: "PG Diploma in Computer Applications", fee: 9600 },
        { code: "PGDHRM", name: "PG Diploma in Human Resource Management", fee: 9600 },
        { code: "PGDMM", name: "PG Diploma in Marketing Management", fee: 9600 },
      ]
    case "certificate":
      return [
        { code: "CIT", name: "Certificate in Information Technology", fee: 4800 },
        { code: "CFN", name: "Certificate in Food and Nutrition", fee: 4200 },
        { code: "CTS", name: "Certificate in Tourism Studies", fee: 4200 },
      ]
    case "phd":
      return [
        { code: "PHDMGMT", name: "PhD in Management", fee: 36000 },
        { code: "PHDCS", name: "PhD in Computer Science", fee: 36000 },
        { code: "PHDEDU", name: "PhD in Education", fee: 36000 },
      ]
    default:
      return []
  }
}

const getIgnouProgramName = (programCode) => {
  for (const type of ["bachelor", "master", "diploma", "certificate", "phd"]) {
    const program = getIgnouPrograms(type).find((p) => p.code === programCode)
    if (program) return program.name
  }
  return ""
}

const getIgnouProgramFee = (programCode) => {
  for (const type of ["bachelor", "master", "diploma", "certificate", "phd"]) {
    const program = getIgnouPrograms(type).find((p) => p.code === programCode)
    if (program) return program.fee
  }
  return 0
}

const getIgnouProgramDuration = (programCode) => {
  if (programCode.startsWith("B")) return "3 Years"
  if (programCode.startsWith("M")) return "2 Years"
  if (programCode.startsWith("PGD")) return "1 Year"
  if (programCode.startsWith("C")) return "6 Months"
  if (programCode.startsWith("PHD")) return "3-5 Years"
  return ""
}

const getIgnouProgramEligibility = (programCode) => {
  if (programCode.startsWith("B")) return "10+2 or Equivalent"
  if (programCode.startsWith("M")) return "Bachelor's Degree"
  if (programCode.startsWith("PGD")) return "Bachelor's Degree"
  if (programCode.startsWith("C")) return "10+2 or Equivalent"
  if (programCode.startsWith("PHD")) return "Master's Degree with 55% marks"
  return ""
}

export default function IgnouAdmissionForm() {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    programType: "",
    program: "",
    session: "January 2024",
    personalInfo: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      dob: "",
      category: "",
      nationality: "Indian",
      maritalStatus: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
    educationalInfo: {
      qualification: "",
      board: "",
      yearOfPassing: "",
      percentage: "",
      subjects: [],
    },
    documents: {
      photo: null,
      signature: null,
      idProof: null,
      dobProof: null,
      educationCertificate: null,
      categoryCertificate: null,
    },
    fees: {
      programFee: 0,
      registrationFee: 200,
      examFee: 0,
      materialFee: 0,
      serviceFee: 1000, // Service margin
      totalFee: 1200, // Initial total with registration and service fee
    },
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    })
  }

  const handleDateChange = (newDate) => {
    setDate(newDate)
    const formattedDate = newDate ? format(newDate, "yyyy-MM-dd") : ""
    handleInputChange("personalInfo", "dob", formattedDate)
  }

  const handleProgramChange = (value) => {
    const programFee = getIgnouProgramFee(value)

    setFormData({
      ...formData,
      program: value,
      fees: {
        ...formData.fees,
        programFee,
        totalFee: programFee + formData.fees.registrationFee + formData.fees.serviceFee,
      },
    })
  }

  const handleSessionChange = (value) => {
    setFormData({
      ...formData,
      session: value,
    })
  }

  const validateStep = (currentStep) => {
    const newErrors = {}

    if (currentStep === 1) {
      if (!formData.programType) {
        newErrors.programType = "Please select a program type"
      }
      if (!formData.program) {
        newErrors.program = "Please select a program"
      }
      if (!formData.session) {
        newErrors.session = "Please select a session"
      }
    } else if (currentStep === 2) {
      if (!formData.personalInfo.firstName) {
        newErrors.firstName = "First name is required"
      }
      if (!formData.personalInfo.lastName) {
        newErrors.lastName = "Last name is required"
      }
      if (!formData.personalInfo.gender) {
        newErrors.gender = "Gender is required"
      }
      if (!formData.personalInfo.dob) {
        newErrors.dob = "Date of birth is required"
      }
      if (!formData.personalInfo.category) {
        newErrors.category = "Category is required"
      }
      if (!formData.personalInfo.maritalStatus) {
        newErrors.maritalStatus = "Marital status is required"
      }
      if (!formData.personalInfo.email) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
        newErrors.email = "Email is invalid"
      }
      if (!formData.personalInfo.phone) {
        newErrors.phone = "Phone number is required"
      } else if (!/^\d{10}$/.test(formData.personalInfo.phone)) {
        newErrors.phone = "Phone number must be 10 digits"
      }
      if (!formData.personalInfo.address) {
        newErrors.address = "Address is required"
      }
      if (!formData.personalInfo.city) {
        newErrors.city = "City is required"
      }
      if (!formData.personalInfo.state) {
        newErrors.state = "State is required"
      }
      if (!formData.personalInfo.pincode) {
        newErrors.pincode = "PIN code is required"
      }
    } else if (currentStep === 3) {
      if (!formData.educationalInfo.qualification) {
        newErrors.qualification = "Qualification is required"
      }
      if (!formData.educationalInfo.board) {
        newErrors.board = "Board/University is required"
      }
      if (!formData.educationalInfo.yearOfPassing) {
        newErrors.yearOfPassing = "Year of passing is required"
      }
      if (!formData.educationalInfo.percentage) {
        newErrors.percentage = "Percentage/CGPA is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateStep(step)) {
      setIsLoading(true)

      try {
        // In a real implementation, this would send the form data to a server
        // and email the details to niosdiscussion@gmail.com

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        console.log("Form submitted:", formData)

        toast({
          title: "Application Submitted",
          description: "Your IGNOU admission application has been submitted successfully.",
        })

        setIsSubmitted(true)
        window.scrollTo(0, 0)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: "There was an error submitting your application. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const getProgressPercentage = () => {
    if (isSubmitted) return 100
    if (step === 1) return 20
    if (step === 2) return 40
    if (step === 3) return 60
    if (step === 4) return 80
    if (step === 5) return 90
    return 0
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-700">IGNOU Admission Form</h1>
        <p className="mt-2 text-muted-foreground">Complete the form below to apply for admission to IGNOU programs</p>
      </div>

      {!isSubmitted ? (
        <>
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Step {step} of 5:{" "}
                {step === 1
                  ? "Program Selection"
                  : step === 2
                    ? "Personal Information"
                    : step === 3
                      ? "Educational Information"
                      : step === 4
                        ? "Document Upload"
                        : "Fee Summary"}
              </span>
              <span className="text-sm text-muted-foreground">{getProgressPercentage()}% completed</span>
            </div>
            <Progress value={getProgressPercentage()} className="mt-2" />
          </div>

          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-700">
                {step === 1
                  ? "Program Selection"
                  : step === 2
                    ? "Personal Information"
                    : step === 3
                      ? "Educational Information"
                      : step === 4
                        ? "Document Upload"
                        : "Fee Summary"}
              </CardTitle>
              <CardDescription>
                {step === 1
                  ? "Select your preferred program"
                  : step === 2
                    ? "Provide your personal details"
                    : step === 3
                      ? "Provide your educational background"
                      : step === 4
                        ? "Upload required documents"
                        : "Review and confirm fee payment"}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form>
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label htmlFor="programType">
                        Program Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.programType}
                        onValueChange={(value) => handleInputChange("", "programType", value)}
                      >
                        <SelectTrigger id="programType" className={errors.programType ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select program type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="certificate">Certificate</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.programType && <p className="text-xs text-red-500">{errors.programType}</p>}
                    </div>

                    {formData.programType && (
                      <div className="space-y-4">
                        <Label htmlFor="program">
                          Select Program <span className="text-red-500">*</span>
                        </Label>
                        <Select value={formData.program} onValueChange={handleProgramChange}>
                          <SelectTrigger id="program" className={errors.program ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select program" />
                          </SelectTrigger>
                          <SelectContent>
                            {getIgnouPrograms(formData.programType).map((program) => (
                              <SelectItem key={program.code} value={program.code}>
                                {program.name} ({program.code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.program && <p className="text-xs text-red-500">{errors.program}</p>}
                      </div>
                    )}

                    <div className="space-y-4">
                      <Label htmlFor="session">
                        Select Session <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.session} onValueChange={handleSessionChange}>
                        <SelectTrigger id="session" className={errors.session ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select session" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="January 2024">January 2024</SelectItem>
                          <SelectItem value="July 2024">July 2024</SelectItem>
                          <SelectItem value="January 2025">January 2025</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.session && <p className="text-xs text-red-500">{errors.session}</p>}
                    </div>

                    {formData.program && (
                      <div className="rounded-md bg-blue-50 p-4">
                        <h3 className="mb-2 font-medium text-blue-700">Program Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Program Code:</span>
                            <span className="font-medium">{formData.program}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Program Name:</span>
                            <span className="font-medium">{getIgnouProgramName(formData.program)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span className="font-medium">{getIgnouProgramDuration(formData.program)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Program Fee:</span>
                            <span className="font-medium">₹{formData.fees.programFee}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Eligibility:</span>
                            <span className="font-medium">{getIgnouProgramEligibility(formData.program)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Session:</span>
                            <span className="font-medium">{formData.session}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.personalInfo.firstName}
                          onChange={(e) => handleInputChange("personalInfo", "firstName", e.target.value)}
                          className={errors.firstName ? "border-red-500" : ""}
                        />
                        {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="middleName">Middle Name</Label>
                        <Input
                          id="middleName"
                          value={formData.personalInfo.middleName}
                          onChange={(e) => handleInputChange("personalInfo", "middleName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.personalInfo.lastName}
                          onChange={(e) => handleInputChange("personalInfo", "lastName", e.target.value)}
                          className={errors.lastName ? "border-red-500" : ""}
                        />
                        {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">
                        Gender <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup
                        value={formData.personalInfo.gender}
                        onValueChange={(value) => handleInputChange("personalInfo", "gender", value)}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                      {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dob">
                        Date of Birth <span className="text-red-500">*</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground",
                              errors.dob && "border-red-500",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      {errors.dob && <p className="text-xs text-red-500">{errors.dob}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.personalInfo.category}
                        onValueChange={(value) => handleInputChange("personalInfo", "category", value)}
                      >
                        <SelectTrigger id="category" className={errors.category ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="obc">OBC</SelectItem>
                          <SelectItem value="sc">SC</SelectItem>
                          <SelectItem value="st">ST</SelectItem>
                          <SelectItem value="ews">EWS</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maritalStatus">
                        Marital Status <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup
                        value={formData.personalInfo.maritalStatus}
                        onValueChange={(value) => handleInputChange("personalInfo", "maritalStatus", value)}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="single" id="single" />
                          <Label htmlFor="single">Single</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="married" id="married" />
                          <Label htmlFor="married">Married</Label>
                        </div>
                      </RadioGroup>
                      {errors.maritalStatus && <p className="text-xs text-red-500">{errors.maritalStatus}</p>}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.personalInfo.email}
                          onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          value={formData.personalInfo.phone}
                          onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
                          className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">
                        Address <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="address"
                        value={formData.personalInfo.address}
                        onChange={(e) => handleInputChange("personalInfo", "address", e.target.value)}
                        className={errors.address ? "border-red-500" : ""}
                      />
                      {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="city">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="city"
                          value={formData.personalInfo.city}
                          onChange={(e) => handleInputChange("personalInfo", "city", e.target.value)}
                          className={errors.city ? "border-red-500" : ""}
                        />
                        {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">
                          State <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.personalInfo.state}
                          onValueChange={(value) => handleInputChange("personalInfo", "state", value)}
                        >
                          <SelectTrigger id="state" className={errors.state ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="delhi">Delhi</SelectItem>
                            <SelectItem value="haryana">Haryana</SelectItem>
                            <SelectItem value="up">Uttar Pradesh</SelectItem>
                            <SelectItem value="rajasthan">Rajasthan</SelectItem>
                            <SelectItem value="punjab">Punjab</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.state && <p className="text-xs text-red-500">{errors.state}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">
                          PIN Code <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="pincode"
                          value={formData.personalInfo.pincode}
                          onChange={(e) => handleInputChange("personalInfo", "pincode", e.target.value)}
                          className={errors.pincode ? "border-red-500" : ""}
                        />
                        {errors.pincode && <p className="text-xs text-red-500">{errors.pincode}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="qualification">
                        Highest Qualification <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.educationalInfo.qualification}
                        onValueChange={(value) => handleInputChange("educationalInfo", "qualification", value)}
                      >
                        <SelectTrigger id="qualification" className={errors.qualification ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select qualification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10th">10th</SelectItem>
                          <SelectItem value="12th">12th</SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.qualification && <p className="text-xs text-red-500">{errors.qualification}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="board">
                        Board/University <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="board"
                        value={formData.educationalInfo.board}
                        onChange={(e) => handleInputChange("educationalInfo", "board", e.target.value)}
                        className={errors.board ? "border-red-500" : ""}
                      />
                      {errors.board && <p className="text-xs text-red-500">{errors.board}</p>}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="yearOfPassing">
                          Year of Passing <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.educationalInfo.yearOfPassing}
                          onValueChange={(value) => handleInputChange("educationalInfo", "yearOfPassing", value)}
                        >
                          <SelectTrigger id="yearOfPassing" className={errors.yearOfPassing ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.yearOfPassing && <p className="text-xs text-red-500">{errors.yearOfPassing}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="percentage">
                          Percentage/CGPA <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="percentage"
                          value={formData.educationalInfo.percentage}
                          onChange={(e) => handleInputChange("educationalInfo", "percentage", e.target.value)}
                          className={errors.percentage ? "border-red-500" : ""}
                        />
                        {errors.percentage && <p className="text-xs text-red-500">{errors.percentage}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Required Documents</h3>
                      <p className="text-sm text-muted-foreground">
                        Please upload the following documents in JPG, PNG, or PDF format. Each file should not exceed
                        2MB.
                      </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="photo">
                          Passport Size Photo <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center justify-center rounded-md border border-dashed p-4">
                          <div className="text-center">
                            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-2 text-xs text-muted-foreground">Drag & drop or click to upload</p>
                            <Input
                              id="photo"
                              type="file"
                              className="hidden"
                              accept="image/jpeg,image/png"
                              onChange={(e) => handleInputChange("documents", "photo", e.target.files[0])}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => document.getElementById("photo").click()}
                            >
                              Select File
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signature">
                          Signature <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center justify-center rounded-md border border-dashed p-4">
                          <div className="text-center">
                            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-2 text-xs text-muted-foreground">Drag & drop or click to upload</p>
                            <Input
                              id="signature"
                              type="file"
                              className="hidden"
                              accept="image/jpeg,image/png"
                              onChange={(e) => handleInputChange("documents", "signature", e.target.files[0])}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => document.getElementById("signature").click()}
                            >
                              Select File
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="idProof">
                          ID Proof (Aadhar/PAN/Voter ID) <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center justify-center rounded-md border border-dashed p-4">
                          <div className="text-center">
                            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-2 text-xs text-muted-foreground">Drag & drop or click to upload</p>
                            <Input
                              id="idProof"
                              type="file"
                              className="hidden"
                              accept="image/jpeg,image/png,application/pdf"
                              onChange={(e) => handleInputChange("documents", "idProof", e.target.files[0])}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => document.getElementById("idProof").click()}
                            >
                              Select File
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dobProof">
                          Date of Birth Proof <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center justify-center rounded-md border border-dashed p-4">
                          <div className="text-center">
                            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-2 text-xs text-muted-foreground">Drag & drop or click to upload</p>
                            <Input
                              id="dobProof"
                              type="file"
                              className="hidden"
                              accept="image/jpeg,image/png,application/pdf"
                              onChange={(e) => handleInputChange("documents", "dobProof", e.target.files[0])}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => document.getElementById("dobProof").click()}
                            >
                              Select File
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="educationCertificate">
                          Educational Certificate <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center justify-center rounded-md border border-dashed p-4">
                          <div className="text-center">
                            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-2 text-xs text-muted-foreground">Drag & drop or click to upload</p>
                            <Input
                              id="educationCertificate"
                              type="file"
                              className="hidden"
                              accept="image/jpeg,image/png,application/pdf"
                              onChange={(e) =>
                                handleInputChange("documents", "educationCertificate", e.target.files[0])
                              }
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => document.getElementById("educationCertificate").click()}
                            >
                              Select File
                            </Button>
                          </div>
                        </div>
                      </div>

                      {formData.personalInfo.category !== "general" && (
                        <div className="space-y-2">
                          <Label htmlFor="categoryCertificate">
                            Category Certificate <span className="text-red-500">*</span>
                          </Label>
                          <div className="flex items-center justify-center rounded-md border border-dashed p-4">
                            <div className="text-center">
                              <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                              <p className="mt-2 text-xs text-muted-foreground">Drag & drop or click to upload</p>
                              <Input
                                id="categoryCertificate"
                                type="file"
                                className="hidden"
                                accept="image/jpeg,image/png,application/pdf"
                                onChange={(e) =>
                                  handleInputChange("documents", "categoryCertificate", e.target.files[0])
                                }
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => document.getElementById("categoryCertificate").click()}
                              >
                                Select File
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Fee Summary</h3>
                      <p className="text-sm text-muted-foreground">
                        Please review the fee details before proceeding to payment.
                      </p>
                    </div>

                    <div className="rounded-md bg-blue-50 p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Program Fee:</span>
                          <span className="font-medium">₹{formData.fees.programFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Registration Fee:</span>
                          <span className="font-medium">₹{formData.fees.registrationFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service Fee:</span>
                          <span className="font-medium">₹{formData.fees.serviceFee}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold">
                          <span>Total Fee:</span>
                          <span>₹{formData.fees.totalFee}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <h4 className="mb-2 font-medium">Payment Methods</h4>
                      <RadioGroup defaultValue="upi" className="space-y-3">
                        <div className="flex items-center space-x-2 rounded-md border p-3">
                          <RadioGroupItem value="upi" id="upi" />
                          <Label htmlFor="upi">UPI</Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border p-3">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card">Credit/Debit Card</Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border p-3">
                          <RadioGroupItem value="netbanking" id="netbanking" />
                          <Label htmlFor="netbanking">Net Banking</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-start space-x-3">
                        <input type="checkbox" id="terms" className="mt-1" />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the terms and conditions and confirm that all the information provided is correct
                          to the best of my knowledge.
                        </Label>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
            )}

            {step < 5 ? (
              <Button type="button" className="ml-auto" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="button" className="ml-auto" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="rounded-lg bg-green-50 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-green-800">Application Submitted Successfully!</h2>
          <p className="mt-2 text-green-700">
            Your IGNOU admission application has been submitted successfully. Your application reference number is{" "}
            <span className="font-bold">IGNOU{Math.floor(Math.random() * 1000000)}</span>.
          </p>
          <p className="mt-4 text-green-700">
            We have sent a confirmation email to your registered email address. Please check your inbox for further
            instructions.
          </p>
          <div className="mt-6">
            <Button onClick={() => (window.location.href = "/")} className="bg-green-600 hover:bg-green-700">
              Return to Home
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
