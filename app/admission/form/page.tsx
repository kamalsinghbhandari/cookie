"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, FileText, Upload } from "lucide-react"

export default function AdmissionFormPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    course: "",
    session: "",
    personalInfo: {
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      nationality: "Indian",
      category: "",
    },
    academicInfo: {
      lastQualification: "",
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
      residenceProof: null,
      addressProof: null,
      previousMarksheet: null,
      categoryProof: null,
    },
    fees: {
      registrationFee: 250,
      courseFee: 0,
      examFee: 0,
      materialFee: 0,
      totalFee: 250,
    },
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    })
  }

  const handleCourseChange = (value) => {
    let courseFee = 0
    let examFee = 0
    let materialFee = 0

    if (value === "secondary") {
      courseFee = 1500
      examFee = 750
      materialFee = 800
    } else if (value === "senior-secondary") {
      courseFee = 1800
      examFee = 900
      materialFee = 1000
    } else if (value.startsWith("vocational")) {
      courseFee = 2500
      examFee = 1200
      materialFee = 1500
    }

    setFormData({
      ...formData,
      course: value,
      fees: {
        ...formData.fees,
        courseFee,
        examFee,
        materialFee,
        totalFee: 250 + courseFee + examFee + materialFee,
      },
    })
  }

  const validateStep = (currentStep) => {
    const newErrors = {}

    if (currentStep === 1) {
      if (!formData.course) {
        newErrors.course = "Please select a course"
      }
      if (!formData.session) {
        newErrors.session = "Please select a session"
      }
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
      if (!formData.personalInfo.category) {
        newErrors.category = "Category is required"
      }
    } else if (currentStep === 2) {
      if (!formData.academicInfo.lastQualification) {
        newErrors.lastQualification = "Last qualification is required"
      }
      if (formData.course === "senior-secondary" && !formData.academicInfo.board) {
        newErrors.board = "Previous board is required for Senior Secondary admission"
      }
      if (formData.course === "senior-secondary" && !formData.academicInfo.yearOfPassing) {
        newErrors.yearOfPassing = "Year of passing is required for Senior Secondary admission"
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateStep(step)) {
      // In a real application, you would submit the form data to a server here
      console.log("Form submitted:", formData)
      setIsSubmitted(true)
      window.scrollTo(0, 0)
    }
  }

  const getRequiredDocuments = () => {
    if (formData.course === "secondary") {
      return [
        "Candidate's recent passport-size colour photograph",
        "Candidate's signature (preferably in black ink)",
        "Valid identity proof (Aadhaar Card, Passport, Ration card etc.)",
        "Valid proof of Date of Birth",
        "Valid Residence proof",
        "Previous Qualification",
        "Active mobile number",
        "Valid address proof",
        "Social category/Caste certificate (if applicable)",
      ]
    } else if (formData.course === "senior-secondary") {
      return [
        "Candidate's recent passport-size colour photograph",
        "Candidate's signature (preferably in black ink)",
        "Valid identity proof (Aadhaar Card, Passport, Ration card etc.)",
        "Valid proof of Date of Birth",
        "Valid Residence proof",
        "Active mobile number",
        "Valid address proof",
        "Class 10th marksheet",
        "12th failed marksheet (if applicable)",
        "Social category/Caste certificate (if applicable)",
      ]
    }
    return []
  }

  const getProgressPercentage = () => {
    if (isSubmitted) return 100
    if (step === 1) return 25
    if (step === 2) return 50
    if (step === 3) return 75
    if (step === 4) return 90
    return 0
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">NIOS Admission Form</h1>
        <p className="mt-2 text-muted-foreground">Complete the form below to apply for admission to NIOS courses</p>
      </div>

      {!isSubmitted ? (
        <>
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Step {step} of 4:{" "}
                {step === 1
                  ? "Personal Information"
                  : step === 2
                    ? "Academic Information"
                    : step === 3
                      ? "Document Upload"
                      : "Fee Payment"}
              </span>
              <span className="text-sm text-muted-foreground">{getProgressPercentage()}% completed</span>
            </div>
            <Progress value={getProgressPercentage()} className="mt-2" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1
                  ? "Personal Information"
                  : step === 2
                    ? "Academic Information"
                    : step === 3
                      ? "Document Upload"
                      : "Fee Summary"}
              </CardTitle>
              <CardDescription>
                {step === 1
                  ? "Provide your personal details"
                  : step === 2
                    ? "Provide your academic background"
                    : step === 3
                      ? "Upload required documents"
                      : "Review and confirm fee payment"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label htmlFor="course">
                        Select Course <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.course} onValueChange={handleCourseChange}>
                        <SelectTrigger id="course" className={errors.course ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="secondary">Secondary (Class 10)</SelectItem>
                          <SelectItem value="senior-secondary">Senior Secondary (Class 12)</SelectItem>
                          <SelectItem value="vocational-certificate">Vocational Certificate Course</SelectItem>
                          <SelectItem value="vocational-diploma">Vocational Diploma Course</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.course && <p className="text-xs text-red-500">{errors.course}</p>}
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="session">
                        Select Session <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.session}
                        onValueChange={(value) => setFormData({ ...formData, session: value })}
                      >
                        <SelectTrigger id="session" className={errors.session ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select a session" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableSessions().map((session) => (
                            <SelectItem key={session.value} value={session.value} disabled={!session.isOpen}>
                              {session.label} {!session.isOpen && "(Closed)"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="text-xs text-muted-foreground">
                        {formData.session &&
                          getAvailableSessions().find((s) => s.value === formData.session)?.description}
                      </div>
                      {errors.session && <p className="text-xs text-red-500">{errors.session}</p>}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
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
                      <Label>
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
                      <Input
                        id="dob"
                        type="date"
                        value={formData.personalInfo.dob}
                        onChange={(e) => handleInputChange("personalInfo", "dob", e.target.value)}
                        className={errors.dob ? "border-red-500" : ""}
                      />
                      {errors.dob && <p className="text-xs text-red-500">{errors.dob}</p>}
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
                          type="tel"
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
                            {indianStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
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

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nationality">Nationality</Label>
                        <Input
                          id="nationality"
                          value={formData.personalInfo.nationality}
                          onChange={(e) => handleInputChange("personalInfo", "nationality", e.target.value)}
                          readOnly
                        />
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
                            <SelectItem value="sc">SC</SelectItem>
                            <SelectItem value="st">ST</SelectItem>
                            <SelectItem value="obc">OBC</SelectItem>
                            <SelectItem value="ews">EWS</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="lastQualification">
                        Last Qualification <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.academicInfo.lastQualification}
                        onValueChange={(value) => handleInputChange("academicInfo", "lastQualification", value)}
                      >
                        <SelectTrigger
                          id="lastQualification"
                          className={errors.lastQualification ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Select your last qualification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="below-8th">Below 8th</SelectItem>
                          <SelectItem value="8th-pass">8th Pass</SelectItem>
                          <SelectItem value="9th-pass">9th Pass</SelectItem>
                          <SelectItem value="10th-pass">10th Pass</SelectItem>
                          <SelectItem value="11th-pass">11th Pass</SelectItem>
                          <SelectItem value="12th-fail">12th Fail</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.lastQualification && <p className="text-xs text-red-500">{errors.lastQualification}</p>}
                    </div>

                    {(formData.course === "senior-secondary" ||
                      formData.academicInfo.lastQualification === "10th-pass") && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="board">
                            Previous Board <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={formData.academicInfo.board}
                            onValueChange={(value) => handleInputChange("academicInfo", "board", value)}
                          >
                            <SelectTrigger id="board" className={errors.board ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select board" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cbse">CBSE</SelectItem>
                              <SelectItem value="icse">ICSE</SelectItem>
                              <SelectItem value="state-board">State Board</SelectItem>
                              <SelectItem value="nios">NIOS</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.board && <p className="text-xs text-red-500">{errors.board}</p>}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="yearOfPassing">
                              Year of Passing <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={formData.academicInfo.yearOfPassing}
                              onValueChange={(value) => handleInputChange("academicInfo", "yearOfPassing", value)}
                            >
                              <SelectTrigger
                                id="yearOfPassing"
                                className={errors.yearOfPassing ? "border-red-500" : ""}
                              >
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.yearOfPassing && <p className="text-xs text-red-500">{errors.yearOfPassing}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="percentage">Percentage/CGPA</Label>
                            <Input
                              id="percentage"
                              value={formData.academicInfo.percentage}
                              onChange={(e) => handleInputChange("academicInfo", "percentage", e.target.value)}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="space-y-2">
                      <Label>Select Subjects</Label>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {getSubjectsForCourse(formData.course).map((subject) => (
                          <div key={subject.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={subject.value}
                              checked={formData.academicInfo.subjects.includes(subject.value)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  handleInputChange("academicInfo", "subjects", [
                                    ...formData.academicInfo.subjects,
                                    subject.value,
                                  ])
                                } else {
                                  handleInputChange(
                                    "academicInfo",
                                    "subjects",
                                    formData.academicInfo.subjects.filter((s) => s !== subject.value),
                                  )
                                }
                              }}
                            />
                            <Label htmlFor={subject.value}>{subject.label}</Label>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Note: You need to select a minimum of 5 subjects for Secondary and Senior Secondary courses.
                      </p>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Required Documents</AlertTitle>
                      <AlertDescription>
                        <p className="mb-2">
                          Please upload the following documents in JPG, PNG or PDF format. Each file should be less than
                          2MB in size.
                        </p>
                        <ul className="ml-6 list-disc space-y-1">
                          {getRequiredDocuments().map((doc, index) => (
                            <li key={index}>{doc}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="photo">
                          Passport-size Photograph <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center gap-4">
                          <div className="h-24 w-24 overflow-hidden rounded-md border bg-slate-50">
                            {formData.documents.photo ? (
                              <img
                                src={URL.createObjectURL(formData.documents.photo) || "/placeholder.svg"}
                                alt="Uploaded photo"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                No photo
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <Input
                              id="photo"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleInputChange("documents", "photo", e.target.files[0])}
                            />
                            <p className="mt-1 text-xs text-muted-foreground">
                              Upload a recent passport-size photograph (JPG/PNG, max 2MB)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signature">
                          Signature <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-32 overflow-hidden rounded-md border bg-slate-50">
                            {formData.documents.signature ? (
                              <img
                                src={URL.createObjectURL(formData.documents.signature) || "/placeholder.svg"}
                                alt="Uploaded signature"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                No signature
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <Input
                              id="signature"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleInputChange("documents", "signature", e.target.files[0])}
                            />
                            <p className="mt-1 text-xs text-muted-foreground">
                              Upload your signature (JPG/PNG, max 2MB)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="idProof">
                          Identity Proof <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-slate-50">
                            {formData.documents.idProof ? (
                              <FileText className="h-6 w-6 text-blue-500" />
                            ) : (
                              <Upload className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <Input
                              id="idProof"
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => handleInputChange("documents", "idProof", e.target.files[0])}
                            />
                            <p className="mt-1 text-xs text-muted-foreground">
                              Upload Aadhaar Card, Passport, or other valid ID proof (JPG/PNG/PDF, max 2MB)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dobProof">
                          Date of Birth Proof <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-slate-50">
                            {formData.documents.dobProof ? (
                              <FileText className="h-6 w-6 text-blue-500" />
                            ) : (
                              <Upload className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <Input
                              id="dobProof"
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => handleInputChange("documents", "dobProof", e.target.files[0])}
                            />
                            <p className="mt-1 text-xs text-muted-foreground">
                              Upload Birth Certificate, Aadhaar Card, or other valid DOB proof (JPG/PNG/PDF, max 2MB)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="residenceProof">
                          Residence Proof <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-slate-50">
                            {formData.documents.residenceProof ? (
                              <FileText className="h-6 w-6 text-blue-500" />
                            ) : (
                              <Upload className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <Input
                              id="residenceProof"
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => handleInputChange("documents", "residenceProof", e.target.files[0])}
                            />
                            <p className="mt-1 text-xs text-muted-foreground">
                              Upload Aadhaar Card or other valid residence proof (JPG/PNG/PDF, max 2MB)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="addressProof">
                          Address Proof <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-slate-50">
                            {formData.documents.addressProof ? (
                              <FileText className="h-6 w-6 text-blue-500" />
                            ) : (
                              <Upload className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <Input
                              id="addressProof"
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => handleInputChange("documents", "addressProof", e.target.files[0])}
                            />
                            <p className="mt-1 text-xs text-muted-foreground">
                              Upload Aadhaar Card, utility bill, or other valid address proof (JPG/PNG/PDF, max 2MB)
                            </p>
                          </div>
                        </div>
                      </div>

                      {formData.course === "senior-secondary" && (
                        <div className="space-y-2">
                          <Label htmlFor="previousMarksheet">
                            Class 10th Marksheet <span className="text-red-500">*</span>
                          </Label>
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-slate-50">
                              {formData.documents.previousMarksheet ? (
                                <FileText className="h-6 w-6 text-blue-500" />
                              ) : (
                                <Upload className="h-6 w-6 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1">
                              <Input
                                id="previousMarksheet"
                                type="file"
                                accept="image/*,.pdf"
                                onChange={(e) => handleInputChange("documents", "previousMarksheet", e.target.files[0])}
                              />
                              <p className="mt-1 text-xs text-muted-foreground">
                                Upload Class 10th marksheet (JPG/PNG/PDF, max 2MB)
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {formData.personalInfo.category !== "general" && (
                        <div className="space-y-2">
                          <Label htmlFor="categoryProof">
                            Category Certificate <span className="text-red-500">*</span>
                          </Label>
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-slate-50">
                              {formData.documents.categoryProof ? (
                                <FileText className="h-6 w-6 text-blue-500" />
                              ) : (
                                <Upload className="h-6 w-6 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1">
                              <Input
                                id="categoryProof"
                                type="file"
                                accept="image/*,.pdf"
                                onChange={(e) => handleInputChange("documents", "categoryProof", e.target.files[0])}
                              />
                              <p className="mt-1 text-xs text-muted-foreground">
                                Upload valid category certificate (JPG/PNG/PDF, max 2MB)
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-4 text-lg font-medium">Fee Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Registration Fee</span>
                          <span>₹{formData.fees.registrationFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Course Fee</span>
                          <span>₹{formData.fees.courseFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Examination Fee</span>
                          <span>₹{formData.fees.examFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Study Material Fee</span>
                          <span>₹{formData.fees.materialFee}</span>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between font-medium">
                            <span>Total Fee</span>
                            <span>₹{formData.fees.totalFee}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Payment Method</h3>
                      <Tabs defaultValue="online" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="online">Online Payment</TabsTrigger>
                          <TabsTrigger value="challan">Challan</TabsTrigger>
                          <TabsTrigger value="dd">Demand Draft</TabsTrigger>
                        </TabsList>
                        <TabsContent value="online" className="space-y-4 pt-4">
                          <p className="text-sm text-muted-foreground">
                            Pay securely online using Credit Card, Debit Card, Net Banking, UPI, or Wallet.
                          </p>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="cardName">Name on Card</Label>
                              <Input id="cardName" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="expiryDate">Expiry Date</Label>
                              <Input id="expiryDate" placeholder="MM/YY" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" />
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="challan" className="space-y-4 pt-4">
                          <p className="text-sm text-muted-foreground">
                            Generate a challan and pay at any authorized bank branch.
                          </p>
                          <Button variant="outline">Generate Challan</Button>
                        </TabsContent>
                        <TabsContent value="dd" className="space-y-4 pt-4">
                          <p className="text-sm text-muted-foreground">
                            Pay through Demand Draft drawn in favor of "Secretary, NIOS" payable at NOIDA, UP.
                          </p>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="ddNumber">DD Number</Label>
                              <Input id="ddNumber" placeholder="Enter DD Number" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="ddDate">DD Date</Label>
                              <Input id="ddDate" type="date" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="bankName">Bank Name</Label>
                              <Input id="bankName" placeholder="Enter Bank Name" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="branchName">Branch Name</Label>
                              <Input id="branchName" placeholder="Enter Branch Name" />
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the terms and conditions
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          I hereby declare that all the information provided by me is correct and I have read and
                          understood the admission guidelines.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
              )}
              {step < 4 ? (
                <Button onClick={handleNext} className={step === 1 ? "ml-auto" : ""}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>Submit Application</Button>
              )}
            </CardFooter>
          </Card>
        </>
      ) : (
        <Card className="mx-auto max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Application Submitted Successfully!</CardTitle>
            <CardDescription>Your NIOS admission application has been submitted successfully.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="mb-4 text-lg font-medium">Application Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Application ID</span>
                  <span>NIOS{Math.floor(Math.random() * 1000000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Name</span>
                  <span>{`${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Course</span>
                  <span>
                    {formData.course === "secondary"
                      ? "Secondary (Class 10)"
                      : formData.course === "senior-secondary"
                        ? "Senior Secondary (Class 12)"
                        : formData.course === "vocational-certificate"
                          ? "Vocational Certificate Course"
                          : "Vocational Diploma Course"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Session</span>
                  <span>
                    {formData.session === "april"
                      ? "April Session"
                      : formData.session === "october"
                        ? "October Session"
                        : formData.session === "on-demand-jan-mar"
                          ? "On-Demand (January to March)"
                          : "On-Demand (July to September)"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email</span>
                  <span>{formData.personalInfo.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Phone</span>
                  <span>{formData.personalInfo.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total Fee Paid</span>
                  <span>₹{formData.fees.totalFee}</span>
                </div>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>What's Next?</AlertTitle>
              <AlertDescription>
                <p className="mb-2">
                  Your application will be reviewed by the NIOS admissions team. You will receive an email and SMS
                  notification once your application is processed.
                </p>
                <p>
                  Please note your Application ID for future reference. You can check your application status by logging
                  into your NIOS account.
                </p>
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full">Download Acknowledgement</Button>
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
                Return to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

// Helper functions
function getSubjectsForCourse(course) {
  if (course === "secondary") {
    return [
      { value: "hindi", label: "Hindi (201)" },
      { value: "english", label: "English (202)" },
      { value: "sanskrit", label: "Sanskrit (209)" },
      { value: "mathematics", label: "Mathematics (211)" },
      { value: "science", label: "Science (212)" },
      { value: "social-science", label: "Social Science (213)" },
      { value: "economics", label: "Economics (214)" },
      { value: "business-studies", label: "Business Studies (215)" },
      { value: "home-science", label: "Home Science (216)" },
      { value: "psychology", label: "Psychology (222)" },
      { value: "indian-culture-heritage", label: "Indian Culture & Heritage (223)" },
      { value: "painting", label: "Painting (225)" },
    ]
  } else if (course === "senior-secondary") {
    return [
      { value: "hindi", label: "Hindi (301)" },
      { value: "english", label: "English (302)" },
      { value: "sanskrit", label: "Sanskrit (309)" },
      { value: "mathematics", label: "Mathematics (311)" },
      { value: "physics", label: "Physics (312)" },
      { value: "chemistry", label: "Chemistry (313)" },
      { value: "biology", label: "Biology (314)" },
      { value: "history", label: "History (315)" },
      { value: "geography", label: "Geography (316)" },
      { value: "political-science", label: "Political Science (317)" },
      { value: "economics", label: "Economics (318)" },
      { value: "business-studies", label: "Business Studies (319)" },
      { value: "accountancy", label: "Accountancy (320)" },
      { value: "home-science", label: "Home Science (321)" },
      { value: "psychology", label: "Psychology (328)" },
      { value: "computer-science", label: "Computer Science (330)" },
      { value: "sociology", label: "Sociology (331)" },
      { value: "painting", label: "Painting (332)" },
    ]
  } else if (course.startsWith("vocational")) {
    return []
  }
  return []
}

function getAvailableSessions() {
  const today = new Date()
  const month = today.getMonth() + 1 // JavaScript months are 0-indexed
  const day = today.getDate()

  const sessions = [
    {
      value: "april",
      label: "April Session",
      description: "Open from April 1 to September 15",
      isOpen: (month >= 4 && month < 9) || (month === 9 && day <= 15),
    },
    {
      value: "october",
      label: "October Session",
      description: "Open from September 16 to March 15",
      isOpen: month > 9 || month < 3 || (month === 3 && day <= 15) || (month === 9 && day > 15),
    },
    {
      value: "on-demand-jan-mar",
      label: "On-Demand Exam (January to March 31)",
      description: "Available during exam months",
      isOpen: month >= 1 && month <= 3,
    },
    {
      value: "on-demand-jul-sep",
      label: "On-Demand Exam (July to September 15)",
      description: "Available during exam months",
      isOpen: (month >= 7 && month < 9) || (month === 9 && day <= 15),
    },
  ]

  return sessions
}

// Indian states list
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]
