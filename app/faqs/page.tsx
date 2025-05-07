"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search } from "lucide-react"

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filterFAQs = (faqs, query) => {
    if (!query) return faqs
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query.toLowerCase()) ||
        faq.answer.toLowerCase().includes(query.toLowerCase()),
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="mt-2 text-muted-foreground">
          Find answers to common questions about open distance learning and our institutions
        </p>
      </div>

      <div className="mb-8 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search FAQs..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8 w-full justify-start sm:w-auto">
          <TabsTrigger value="all">All FAQs</TabsTrigger>
          <TabsTrigger value="nios">NIOS</TabsTrigger>
          <TabsTrigger value="ignou">IGNOU</TabsTrigger>
          <TabsTrigger value="dusol">DU SOL</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <Card className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {filterFAQs([...niosFAQs, ...ignouFAQs, ...dusolFAQs, ...generalFAQs], searchQuery).map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm max-w-none">
                      <p>{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </TabsContent>

        <TabsContent value="nios" className="mt-0">
          <Card className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {filterFAQs(niosFAQs, searchQuery).map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm max-w-none">
                      <p>{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </TabsContent>

        <TabsContent value="ignou" className="mt-0">
          <Card className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {filterFAQs(ignouFAQs, searchQuery).map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm max-w-none">
                      <p>{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </TabsContent>

        <TabsContent value="dusol" className="mt-0">
          <Card className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {filterFAQs(dusolFAQs, searchQuery).map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm max-w-none">
                      <p>{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="mt-0">
          <Card className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {filterFAQs(generalFAQs, searchQuery).map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm max-w-none">
                      <p>{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12 rounded-lg bg-slate-50 p-6 text-center">
        <h2 className="mb-2 text-xl font-semibold">Still have questions?</h2>
        <p className="mb-6 text-muted-foreground">
          If you couldn't find the answer to your question, feel free to contact us directly.
        </p>
        <Button asChild>
          <a href="/contact">Contact Us</a>
        </Button>
      </div>
    </div>
  )
}

// FAQ data
const niosFAQs = [
  {
    question: "Who can apply for NIOS?",
    answer:
      "Anyone can apply for NIOS courses without any age restriction. There is no upper age limit for admission. NIOS provides flexible learning opportunities for school dropouts, working professionals, and those who couldn't complete their education through the formal system.",
  },
  {
    question: "What documents are needed for NIOS admission?",
    answer:
      "For NIOS admission, you need identity proof (Aadhaar Card, Passport, etc.), address proof, date of birth certificate, and previous qualification certificates (if applicable). For Senior Secondary (Class 12) admission, you also need to provide your Class 10 marksheet.",
  },
  {
    question: "How much does NIOS admission cost?",
    answer:
      "NIOS admission fees vary based on course and category. For Secondary (Class 10), the fee is approximately ₹1,560 for SC/ST/PWD candidates and ₹2,340 for others. For Senior Secondary (Class 12), it's about ₹1,730 for SC/ST/PWD candidates and ₹2,580 for others. Additional fees apply for practical subjects and TOC.",
  },
  {
    question: "What is the exam pattern for NIOS?",
    answer:
      "NIOS conducts public examinations twice a year in April-May and October-November. The examination consists of theory papers (usually 3 hours duration) and practical examinations for subjects with practical components. NIOS also offers On-Demand Examinations (ODE) where students can choose their exam date.",
  },
  {
    question: "How many subjects can I choose in NIOS?",
    answer:
      "In NIOS, you need to select a minimum of 5 subjects for certification. You can select up to 7 subjects in total. The first 5 subjects are covered under the base fee, while additional subjects (6th and 7th) require extra payment.",
  },
  {
    question: "What is Transfer of Credit (TOC) in NIOS?",
    answer:
      "Transfer of Credit (TOC) allows students to carry forward up to two passed subjects from a recognized board to NIOS. This means you don't have to study those subjects again. A fee of ₹230 per subject applies for TOC.",
  },
  {
    question: "How long is the NIOS course duration?",
    answer:
      "The minimum period to complete NIOS courses is 1 year. However, students have the flexibility to complete their studies within 5 years from the date of registration. This allows you to study at your own pace according to your convenience.",
  },
  {
    question: "Can I get admission in college after NIOS?",
    answer:
      "Yes, NIOS certificates are recognized by all major educational institutions, universities, and employers in India. NIOS is recognized by the Association of Indian Universities (AIU) as equivalent to other recognized boards, allowing you to pursue higher education after completing NIOS courses.",
  },
]

const ignouFAQs = [
  {
    question: "What is the course fee for IGNOU programs?",
    answer:
      "IGNOU course fees vary by program. Bachelor's programs range from ₹7,200 to ₹30,000 depending on the course. Master's programs typically cost between ₹8,400 and ₹45,000. Certificate and Diploma programs range from ₹4,200 to ₹9,600. Additional fees may apply for practical components and study materials.",
  },
  {
    question: "How do I upload documents for IGNOU admission?",
    answer:
      "Documents can be uploaded through the IGNOU admission portal in JPG, JPEG, or PDF format with size less than 500KB each. Required documents include photograph, signature, educational certificates, category certificate (if applicable), and identity proof. Ensure all documents are clear and properly scanned before uploading.",
  },
  {
    question: "What is the eligibility for IGNOU admission?",
    answer:
      "Eligibility varies by program. For Bachelor's programs, 12th pass is required. For Master's programs, a Bachelor's degree is needed. Some professional programs may have additional requirements. IGNOU also offers programs without formal eligibility requirements through its open entry system for certain certificate courses.",
  },
  {
    question: "How long are IGNOU programs valid?",
    answer:
      "IGNOU allows students to complete their programs within a specified maximum time period. For Certificate programs, it's 1-2 years; for Diploma programs, 2-3 years; for Bachelor's programs, 3-6 years; and for Master's programs, 2-5 years. Students can also seek re-admission if they fail to complete within the maximum period.",
  },
  {
    question: "Does IGNOU provide study materials?",
    answer:
      "Yes, IGNOU provides comprehensive self-learning study materials for all its programs. These materials are specially designed for distance learning and are included in the program fee. Study materials are either sent by post or can be accessed digitally through the eGyankosh portal.",
  },
  {
    question: "How are IGNOU examinations conducted?",
    answer:
      "IGNOU conducts Term-End Examinations (TEE) twice a year in June and December. Students can choose when to appear for exams within their program validity period. Some programs also have assignments, projects, or practical components that contribute to the final evaluation.",
  },
  {
    question: "Can I change my IGNOU program after admission?",
    answer:
      "Yes, IGNOU allows program change within 30 days of admission. A program change fee applies. You need to submit an application through the Student Service Centre or Regional Centre. The fee difference between programs will be adjusted accordingly.",
  },
  {
    question: "Are IGNOU degrees recognized internationally?",
    answer:
      "Yes, IGNOU degrees are recognized internationally. IGNOU is recognized by the University Grants Commission (UGC) and is a member of the Association of Commonwealth Universities and the Asian Association of Open Universities, ensuring global recognition of its qualifications.",
  },
]

const dusolFAQs = [
  {
    question: "What are the eligibility criteria for DU SOL?",
    answer:
      "For undergraduate courses, candidates must have passed 12th with minimum required percentage as per DU norms. For B.A. Program, the minimum percentage is 40% in 12th. For B.Com and B.Com (Hons), it's 40% and 45% respectively with Mathematics/Business Mathematics as a subject in 12th. Age restrictions and relaxations follow Delhi University guidelines.",
  },
  {
    question: "How do I pay DU SOL fees?",
    answer:
      "Fees can be paid online through credit card, debit card, or net banking during the admission process. The payment gateway is integrated with the DU SOL admission portal. After successful payment, you'll receive a confirmation receipt which should be saved for future reference.",
  },
  {
    question: "Are DU SOL degrees recognized?",
    answer:
      "Yes, DU SOL degrees are fully recognized by UGC and have the same value as regular Delhi University degrees. Employers and educational institutions treat DU SOL degrees on par with regular DU degrees, making them valuable for both employment and higher education opportunities.",
  },
  {
    question: "How are DU SOL classes conducted?",
    answer:
      "DU SOL follows a blended learning approach. Study materials are provided, and students can access online learning resources through the DU SOL portal. Personal Contact Programs (PCPs) are conducted at designated study centers on weekends. Additionally, e-learning resources including video lectures are available on the DU SOL website.",
  },
  {
    question: "What is the examination pattern for DU SOL?",
    answer:
      "DU SOL follows the same examination pattern as regular DU colleges. Examinations are conducted annually, with internal assessments throughout the year. The examination consists of theory papers, and some courses may have practical components. Results are typically declared within 2-3 months after examinations.",
  },
  {
    question: "Can DU SOL students participate in campus activities?",
    answer:
      "Yes, DU SOL students can participate in various extracurricular activities organized by Delhi University. They can join the Delhi University Students' Union (DUSU) and participate in cultural festivals, sports events, and other university activities. DU SOL also organizes its own events specifically for SOL students.",
  },
  {
    question: "Is migration from DU SOL to regular DU colleges possible?",
    answer:
      "Migration from DU SOL to regular DU colleges is possible but subject to availability of seats and fulfillment of eligibility criteria. Students need to apply for migration during the designated period and meet the cut-off requirements of the college they wish to migrate to.",
  },
  {
    question: "What are the job prospects after completing DU SOL?",
    answer:
      "DU SOL graduates have the same job prospects as regular DU graduates. They can appear for competitive exams, apply for government jobs, pursue higher education, or enter the private sector. Many DU SOL alumni have successful careers in various fields including civil services, banking, corporate sector, and academics.",
  },
]

const generalFAQs = [
  {
    question: "What is Open Distance Learning (ODL)?",
    answer:
      "Open Distance Learning (ODL) is an educational approach that allows students to study remotely without regular face-to-face contact with teachers in a classroom. It provides flexible learning opportunities through various media including printed materials, online resources, and occasional contact sessions. ODL is ideal for those who cannot attend regular classes due to work, family commitments, or geographical constraints.",
  },
  {
    question: "How do I choose between NIOS, IGNOU, and DU SOL?",
    answer:
      "The choice depends on your educational needs: NIOS is ideal for school-level education (10th and 12th) with maximum flexibility. IGNOU offers a wide range of undergraduate, postgraduate, and certificate programs with a national presence. DU SOL provides undergraduate programs with the prestigious Delhi University brand. Consider factors like program availability, flexibility, fee structure, and recognition based on your specific requirements.",
  },
  {
    question: "Are distance education degrees valued by employers?",
    answer:
      "Yes, distance education degrees from recognized institutions like NIOS, IGNOU, and DU SOL are valued by employers. These institutions are approved by regulatory bodies like UGC, AICTE, or MHRD. Many employers focus on skills and knowledge rather than the mode of education. However, for certain specialized fields, employers might prefer regular degrees, so it's advisable to research industry-specific preferences.",
  },
  {
    question: "Can I pursue multiple courses simultaneously?",
    answer:
      "Yes, you can pursue multiple courses simultaneously through distance education, subject to certain restrictions. For example, IGNOU allows students to pursue two academic programs simultaneously, either both in distance mode or one in distance and one in regular mode, provided the class timings don't overlap. Always check the specific rules of the institutions before enrolling in multiple programs.",
  },
  {
    question: "How do I get my study materials?",
    answer:
      "Study materials are typically provided in both physical and digital formats. NIOS and IGNOU send printed study materials by post to the registered address and also provide digital access through their online portals (eGyankosh for IGNOU). DU SOL provides study materials at the time of admission and also offers online resources through its website. Some materials may require additional purchase.",
  },
  {
    question: "What support services are available for distance learners?",
    answer:
      "Distance education institutions offer various support services including academic counseling, library facilities at study centers, online discussion forums, and helpdesks for administrative queries. They also conduct contact programs, practical sessions, and pre-exam preparations. Additionally, many institutions have regional centers and study centers where students can seek face-to-face assistance.",
  },
  {
    question: "Can I transfer credits between different distance education programs?",
    answer:
      "Credit transfer policies vary by institution. IGNOU has a well-established credit transfer system that allows students to transfer credits from other universities or previous IGNOU programs. NIOS offers Transfer of Credit (TOC) for up to two subjects. Always check the specific credit transfer policies of the institution you're applying to, as they may change over time.",
  },
  {
    question: "How can I check the authenticity of a distance education institution?",
    answer:
      "To verify authenticity, check if the institution is recognized by regulatory bodies like UGC, DEB (Distance Education Bureau), AICTE, or MHRD. Visit the official websites of these regulatory bodies to find lists of approved institutions. Be wary of institutions promising degrees in unrealistically short timeframes or charging unusually low fees, as these could be warning signs of unrecognized institutions.",
  },
]
