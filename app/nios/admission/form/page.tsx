"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, FileText, Upload, Info, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/components/ui/use-toast"

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
      extraDocument1: null,
      extraDocument2: null,
    },
    fees: {
      registrationFee: 200, // Admin charges (not shown to user)
      processingFee: 70,
      courseFee: 0,
      examFee: 0,
      materialFee: 0,
      totalFee: 270, // 200 + 70
      lateFee: 0,
      totalSubjects: 0,
      serviceFee: 200, // Service margin
    },
    comments: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [date, setDate] = useState()
  const { toast } = useToast()

  useEffect(() => {
    // Calculate late fee based on current date and selected session
    if (formData.session) {
      const lateFee = calculateLateFee(formData.session)
      setFormData((prev) => ({
        ...prev,
        fees: {
          ...prev.fees,
          lateFee,
          totalFee:
            prev.fees.registrationFee + prev.fees.processingFee + prev.fees.courseFee + lateFee + prev.fees.serviceFee,
        },
      }))
    }
  }, [formData.session])

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

  const calculateLateFee = (session) => {
    const today = new Date()
    const month = today.getMonth() + 1 // JavaScript months are 0-indexed
    const day = today.getDate()

    let lateFee = 0

    if (session === "april") {
      // April session late fees
      if (month === 8 && day >= 1 && day <= 15) {
        lateFee = 260
      } else if ((month === 8 && day >= 16) || (month === 8 && day <= 31)) {
        lateFee = 520
      } else if (month === 9 && day >= 1 && day <= 15) {
        lateFee = 910
      }
    } else if (session === "october") {
      // October session late fees
      if (month === 2 && day >= 1 && day <= 15) {
        lateFee = 260
      } else if ((month === 2 && day >= 16 && day <= 28) || (month === 2 && day === 29)) {
        lateFee = 520
      } else if (month === 3 && day >= 1 && day <= 15) {
        lateFee = 910
      }
    }

    return lateFee
  }

  const calculateFees = (subjects, category) => {
    let courseFee = 0
    const baseSubjects = Math.min(subjects.length, 5)
    const additionalSubjects = Math.max(0, subjects.length - 5)

    // Base fee for up to 5 subjects
    if (baseSubjects > 0) {
      if (category === "female") {
        courseFee = 1890
      } else if (category === "sc" || category === "st" || category === "pwd") {
        courseFee = 1560
      } else {
        courseFee = 2340
      }
    }

    // Additional fee for subjects beyond 5
    courseFee += additionalSubjects * 940

    // TOC fee per subject
    const tocFee = subjects.length * 230

    return {
      courseFee,
      tocFee,
      totalSubjects: subjects.length,
    }
  }

  const handleSubjectChange = (checked, subjectValue) => {
    let updatedSubjects = [...formData.academicInfo.subjects]

    if (checked) {
      if (!updatedSubjects.includes(subjectValue)) {
        updatedSubjects.push(subjectValue)
      }
    } else {
      updatedSubjects = updatedSubjects.filter((s) => s !== subjectValue)
    }

    // Update subjects
    handleInputChange("academicInfo", "subjects", updatedSubjects)

    // Calculate fees based on subjects and category
    const { courseFee, tocFee, totalSubjects } = calculateFees(updatedSubjects, formData.personalInfo.category)

    // Update fees
    setFormData((prev) => ({
      ...prev,
      fees: {
        ...prev.fees,
        courseFee,
        examFee: tocFee,
        totalSubjects,
        totalFee:
          prev.fees.registrationFee +
          prev.fees.processingFee +
          courseFee +
          tocFee +
          prev.fees.lateFee +
          prev.fees.serviceFee,
      },
    }))
  }

  const handleCategoryChange = (value) => {
    // Update category
    handleInputChange("personalInfo", "category", value)

    // Recalculate fees based on new category and current subjects
    const { courseFee, tocFee, totalSubjects } = calculateFees(formData.academicInfo.subjects, value)

    // Update fees
    setFormData((prev) => ({
      ...prev,
      fees: {
        ...prev.fees,
        courseFee,
        examFee: tocFee,
        totalSubjects,
        totalFee:
          prev.fees.registrationFee +
          prev.fees.processingFee +
          courseFee +
          tocFee +
          prev.fees.lateFee +
          prev.fees.serviceFee,
      },
    }))
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
      if (formData.academicInfo.subjects.length === 0) {
        newErrors.subjects = "Please select at least one subject"
      }
      if (formData.academicInfo.subjects.length > 7) {
        newErrors.subjects = "You can select a maximum of 7 subjects"
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
          description: "Your NIOS admission application has been submitted successfully.",
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

  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-nios-700">NIOS Admission Form</h1>
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
                      : "Fee Summary"}
              </span>
              <span className="text-sm text-muted-foreground">{getProgressPercentage()}% completed</span>
            </div>
            <Progress value={getProgressPercentage()} className="mt-2" />
          </div>

          <Card>
            <CardHeader className="bg-nios-50">
              <CardTitle className="text-nios-700">
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
                    ? "Provide your academic background and select subjects"
                    : step === 3
                      ? "Upload required documents"
                      : "Review and confirm fee payment"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form>
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label htmlFor="course">
                        Select Course <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.course}
                        onValueChange={(value) => {
                          setFormData({
                            ...formData,
                            course: value,
                            academicInfo: {
                              ...formData.academicInfo,
                              subjects: [], // Reset subjects when course changes
                            },
                          })
                        }}
                      >
                        <SelectTrigger id="course" className={errors.course ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="secondary">Secondary (Class 10)</SelectItem>
                          <SelectItem value="senior-secondary">Senior Secondary (Class 12)</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.course && <p className="text-xs text-red-500">{errors.course}</p>}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="session">
                          Select Session <span className="text-red-500">*</span>
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                              <p>April Session: Open from April 1 to September 15</p>
                              <p>October Session: Open from September 16 to March 15</p>
                              <p>On-Demand exams are available during specific months</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
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
                      {formData.session && (
                        <div className="rounded-md bg-nios-50 p-3 text-sm">
                          <div className="flex">
                            <Info className="mr-2 h-4 w-4 text-nios-600" />
                            <div>
                              <p className="font-medium text-nios-700">
                                {getAvailableSessions().find((s) => s.value === formData.session)?.description}
                              </p>
                              {formData.session && calculateLateFee(formData.session) > 0 && (
                                <p className="mt-1 text-nios-600">
                                  <strong>Note:</strong> A late fee of ₹{calculateLateFee(formData.session)} will be
                                  applied.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
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
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={`w-full justify-start text-left font-normal ${errors.dob ? "border-red-500" : ""}`}
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
                        <Select value={formData.personalInfo.category} onValueChange={handleCategoryChange}>
                          <SelectTrigger id="category" className={errors.category ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="sc">SC</SelectItem>
                            <SelectItem value="st">ST</SelectItem>
                            <SelectItem value="pwd">PWD</SelectItem>
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
                      <div className="flex items-center justify-between">
                        <Label>
                          Select Subjects <span className="text-red-500">*</span>
                        </Label>
                        <span className="text-sm text-muted-foreground">
                          Selected: {formData.academicInfo.subjects.length}/7 (min 1, max 7)
                        </span>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="mb-4 rounded-md bg-nios-50 p-3 text-sm">
                          <div className="flex">
                            <Info className="mr-2 h-4 w-4 text-nios-600" />
                            <div>
                              <p className="font-medium text-nios-700">Subject Selection Information</p>
                              <ul className="mt-1 list-inside list-disc space-y-1 text-nios-600">
                                <li>You can select a minimum of 1 and a maximum of 7 subjects</li>
                                <li>First 5 subjects: Base fee applies</li>
                                <li>Additional subjects (6th & 7th): ₹940 per subject</li>
                                <li>Transfer of Credit (TOC) fee: ₹230 per subject</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2">
                          {getSubjectsForCourse(formData.course).map((subject) => (
                            <div key={subject.value} className="flex items-center space-x-2">
                              <Checkbox
                                id={subject.value}
                                checked={formData.academicInfo.subjects.includes(subject.value)}
                                onCheckedChange={(checked) => handleSubjectChange(checked, subject.value)}
                                disabled={
                                  !formData.academicInfo.subjects.includes(subject.value) &&
                                  formData.academicInfo.subjects.length >= 7
                                }
                              />
                              <Label
                                htmlFor={subject.value}
                                className={
                                  !formData.academicInfo.subjects.includes(subject.value) &&
                                  formData.academicInfo.subjects.length >= 7
                                    ? "text-muted-foreground"
                                    : ""
                                }
                              >
                                {subject.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      {errors.subjects && <p className="text-xs text-red-500">{errors.subjects}</p>}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <Alert className="bg-nios-50 text-nios-800">
                      <AlertCircle className="h-4 w-4 text-nios-600" />
                      <AlertTitle className="text-nios-700">Required Documents</AlertTitle>
                      <AlertDescription className="text-nios-600">
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
                              <FileText className="h-6 w-6 text-nios-500" />
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
                              <FileText className="h-6 w-6 text-nios-500" />
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

                      {formData.course === "senior-secondary" && (
                        <div className="space-y-2">
                          <Label htmlFor="previousMarksheet">
                            Class 10th Marksheet <span className="text-red-500">*</span>
                          </Label>
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-slate-50">
                              {formData.documents.previousMarksheet ? (
                                <FileText className="h-6 w-6 text-nios-500" />
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

                      {formData.personalInfo.category !== "general" && formData.personalInfo.category !== "female" && (
                        <div className="space-y-2">
                          <Label htmlFor="categoryProof">
                            Category Certificate <span className="text-red-500">*</span>
                          </Label>
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-slate-50">
                              {formData.documents.categoryProof ? (
                                <FileText className="h-6 w-6 text-nios-500" />
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

                      <div className="space-y-2">
                        <Label htmlFor="extraDocument1">Additional Document 1</Label>
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-slate-50">
                            {formData.documents.extraDocument1 ? (
                              <FileText className="h-6 w-6 text-nios-500" />
                            ) : (
                              <Upload className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <Input
                              id="extraDocument1"
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => handleInputChange("documents", "extraDocument1", e.target.files[0])}
                            />
                            <p className="mt-1 text-xs text-muted-foreground">
                              Upload any additional supporting document (JPG/PNG/PDF, max 2MB)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="extraDocument2">Additional Document 2</Label>
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-slate-50">
                            {formData.documents.extraDocument2 ? (
                              <FileText className="h-6 w-6 text-nios-500" />
                            ) : (
                              <Upload className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <Input
                              id="extraDocument2"
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => handleInputChange("documents", "extraDocument2", e.target.files[0])}
                            />
                            <p className="mt-1 text-xs text-muted-foreground">
                              Upload any additional supporting document (JPG/PNG/PDF, max 2MB)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-2 mb-6">
                      <Label htmlFor="comments">Additional Comments or Requirements</Label>
                      <Textarea
                        id="comments"
                        placeholder="Please provide any additional information or special requirements..."
                        rows={4}
                        value={formData.comments || ""}
                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                      />
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="mb-4 text-lg font-medium text-nios-700">Fee Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Processing Fee</span>
                          <span>₹{formData.fees.processingFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Course Fee ({formData.fees.totalSubjects} subjects)</span>
                          <span>₹{formData.fees.courseFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>TOC Fee (₹230 per subject)</span>
                          <span>₹{formData.fees.examFee}</span>
                        </div>
                        {formData.fees.lateFee > 0 && (
                          <div className="flex justify-between text-red-600">
                            <span>Late Fee</span>
                            <span>₹{formData.fees.lateFee}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Service Fee</span>
                          <span>₹{formData.fees.serviceFee}</span>
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
                      <h3 className="text-lg font-medium text-nios-700">Payment Method</h3>
                      <div className="rounded-md border p-4">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="online" id="online" checked />
                            <Label htmlFor="online">Online Payment</Label>
                          </div>
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
                        </div>
                      </div>
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
            <CardFooter className="flex justify-between bg-slate-50">
              {step > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
              )}
              {step < 4 ? (
                <Button onClick={handleNext} className={`bg-nios-600 hover:bg-nios-700 ${step === 1 ? "ml-auto" : ""}`}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-nios-600 hover:bg-nios-700" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </>
      ) : (
        <Card className="mx-auto max-w-2xl">
          <CardHeader className="bg-nios-50 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-nios-100">
              <CheckCircle2 className="h-8 w-8 text-nios-600" />
            </div>
            <CardTitle className="text-2xl text-nios-700">Application Submitted Successfully!</CardTitle>
            <CardDescription>Your NIOS admission application has been submitted successfully.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="rounded-lg border p-4">
              <h3 className="mb-4 text-lg font-medium text-nios-700">Application Details</h3>
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
                        : ""}
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
                  <span className="font-medium">Subjects Selected</span>
                  <span>{formData.fees.totalSubjects}</span>
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

            <Alert className="bg-nios-50">
              <AlertCircle className="h-4 w-4 text-nios-600" />
              <AlertTitle className="text-nios-700">What's Next?</AlertTitle>
              <AlertDescription className="text-nios-600">
                <p className="mb-2">
                  Your application will be reviewed by our admissions team. You will receive an email and SMS
                  notification once your application is processed.
                </p>
                <p>
                  Please note your Application ID for future reference. You can check your application status by logging
                  into your ODL account.
                </p>
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 bg-slate-50">
            <Button className="w-full bg-nios-600 hover:bg-nios-700">Download Acknowledgement</Button>
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
