import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>

        <div className="prose prose-slate max-w-none">
          <p className="lead">Last updated: May 6, 2025</p>

          <p>
            Open Distance Learning ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
            explains how your personal information is collected, used, and disclosed by Open Distance Learning.
          </p>

          <h2>Information We Collect</h2>

          <p>We collect information that you provide directly to us, such as when you:</p>

          <ul>
            <li>Create an account</li>
            <li>Fill out a form</li>
            <li>Submit an application</li>
            <li>Contact customer support</li>
            <li>Otherwise communicate with us</li>
          </ul>

          <p>This information may include:</p>

          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Mailing address</li>
            <li>Date of birth</li>
            <li>Educational background</li>
            <li>Payment information</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h2>How We Use Your Information</h2>

          <p>We use the information we collect to:</p>

          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process applications and enrollments</li>
            <li>Send technical notices, updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Communicate with you about products, services, offers, and events</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            <li>
              Personalize and improve the services and provide content or features that match user profiles or interests
            </li>
          </ul>

          <h2>Sharing of Information</h2>

          <p>We may share your personal information with:</p>

          <ul>
            <li>Educational institutions (NIOS, IGNOU, DU SOL) for processing your applications and enrollments</li>
            <li>Service providers who perform services on our behalf</li>
            <li>Professional advisors, such as lawyers, auditors, and insurers</li>
            <li>Government authorities or law enforcement officials if required by law</li>
          </ul>

          <h2>Your Rights</h2>

          <p>You have the right to:</p>

          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request that your personal information be corrected or updated</li>
            <li>Request that we delete your personal information</li>
            <li>Object to the processing of your personal information</li>
            <li>
              Request a copy of your personal information in a structured, commonly used, and machine-readable format
            </li>
          </ul>

          <h2>Data Security</h2>

          <p>
            We implement appropriate technical and organizational measures to protect your personal information against
            unauthorized or unlawful processing, accidental loss, destruction, or damage.
          </p>

          <h2>Changes to This Privacy Policy</h2>

          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>Contact Us</h2>

          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
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
