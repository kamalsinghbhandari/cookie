import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsOfUsePage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">Terms of Use</h1>

        <div className="prose prose-slate max-w-none">
          <p className="lead">Last updated: May 6, 2025</p>

          <p>
            Welcome to Open Distance Learning. By accessing or using our website, you agree to be bound by these Terms
            of Use.
          </p>

          <h2>Acceptance of Terms</h2>

          <p>
            By accessing or using the Open Distance Learning website, you agree to be bound by these Terms of Use and
            all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
            using or accessing this site.
          </p>

          <h2>Use License</h2>

          <p>
            Permission is granted to temporarily download one copy of the materials on Open Distance Learning's website
            for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of
            title, and under this license you may not:
          </p>

          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on Open Distance Learning's website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>

          <p>
            This license shall automatically terminate if you violate any of these restrictions and may be terminated by
            Open Distance Learning at any time.
          </p>

          <h2>Educational Services</h2>

          <p>
            Open Distance Learning provides information about educational programs offered by NIOS, IGNOU, and DU SOL.
            We facilitate the application process but are not directly affiliated with these institutions. The final
            decision regarding admission rests with the respective educational institutions.
          </p>

          <h2>User Accounts</h2>

          <p>
            When you create an account with us, you must provide accurate, complete, and up-to-date information. You are
            responsible for safeguarding the password that you use to access our services and for any activities or
            actions under your password.
          </p>

          <h2>Payment Terms</h2>

          <p>
            All payments for services are subject to our Refund Policy. By making a payment, you acknowledge that you
            have read and agree to the terms of our Refund Policy.
          </p>

          <h2>Free Items</h2>

          <p>
            Some resources on our website may be offered free of charge. These resources are provided as-is without any
            warranties. We reserve the right to modify or discontinue offering these free resources at any time without
            notice.
          </p>

          <h2>Disclaimer</h2>

          <p>
            The materials on Open Distance Learning's website are provided on an 'as is' basis. Open Distance Learning
            makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
            without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose,
            or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2>Limitations</h2>

          <p>
            In no event shall Open Distance Learning or its suppliers be liable for any damages (including, without
            limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or
            inability to use the materials on Open Distance Learning's website, even if Open Distance Learning or a Open
            Distance Learning authorized representative has been notified orally or in writing of the possibility of
            such damage.
          </p>

          <h2>Governing Law</h2>

          <p>
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its
            conflict of law provisions.
          </p>

          <h2>Changes to Terms</h2>

          <p>
            Open Distance Learning may revise these Terms of Use at any time without notice. By using this website, you
            are agreeing to be bound by the then current version of these Terms of Use.
          </p>

          <h2>Contact Us</h2>

          <p>
            If you have any questions about these Terms of Use, please contact us at{" "}
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
