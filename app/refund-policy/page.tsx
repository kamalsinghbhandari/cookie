import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RefundPolicyPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">Refund Policy</h1>

        <div className="prose prose-slate max-w-none">
          <p className="lead">Last updated: May 6, 2025</p>

          <p>
            This Refund Policy outlines the terms and conditions regarding refunds for services provided by Open
            Distance Learning.
          </p>

          <h2>No Refund Policy for Consultation and Admission Fees</h2>

          <p>
            <strong>
              Please note that we do not provide refunds for consultation fees and admission fees once the admission
              process has started.
            </strong>
          </p>

          <p>
            When you pay for consultation services or admission processing, our team begins working on your case
            immediately. This involves administrative work, document verification, and coordination with educational
            institutions. Due to the immediate allocation of resources to your application, we are unable to provide
            refunds for these services.
          </p>

          <h2>Study Material Purchases</h2>

          <p>For study material purchases, the following refund conditions apply:</p>

          <ul>
            <li>Digital study materials are non-refundable once access has been granted.</li>
            <li>
              Physical study materials may be eligible for a refund if returned in unused condition within 7 days of
              receipt.
            </li>
            <li>Shipping costs for returned physical materials are the responsibility of the customer.</li>
          </ul>

          <h2>Technical Issues</h2>

          <p>
            If you experience technical issues that prevent you from accessing digital content you have purchased,
            please contact our support team at <a href="mailto:niosdiscussion@gmail.com">niosdiscussion@gmail.com</a>{" "}
            for assistance. We will work to resolve the issue or provide alternative access methods.
          </p>

          <h2>Exceptional Circumstances</h2>

          <p>
            In exceptional circumstances, refund requests may be considered on a case-by-case basis. Such requests must
            be submitted in writing to <a href="mailto:niosdiscussion@gmail.com">niosdiscussion@gmail.com</a> with
            detailed information about the situation.
          </p>

          <h2>Institutional Refund Policies</h2>

          <p>
            Please note that NIOS, IGNOU, and DU SOL each have their own refund policies for fees paid directly to these
            institutions. We recommend consulting the respective institution's official website for their specific
            refund terms.
          </p>

          <h2>Changes to This Refund Policy</h2>

          <p>
            We may update this Refund Policy from time to time. We will notify you of any changes by posting the new
            Refund Policy on this page and updating the "Last updated" date.
          </p>

          <h2>Contact Us</h2>

          <p>
            If you have any questions about this Refund Policy, please contact us at{" "}
            <a href="mailto:niosdiscussion@gmail.com">niosdiscussion@gmail.com</a>.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
