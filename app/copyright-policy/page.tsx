import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CopyrightPolicyPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">Copyright Policy</h1>

        <div className="prose prose-slate max-w-none">
          <p className="lead">Last updated: May 6, 2025</p>

          <p>
            This Copyright Policy outlines how Open Distance Learning respects intellectual property rights and handles
            copyright-related matters.
          </p>

          <h2>Copyright Ownership</h2>

          <p>
            All content on the Open Distance Learning website, including but not limited to text, graphics, logos,
            images, audio clips, digital downloads, and data compilations, is the property of Open Distance Learning or
            its content suppliers and is protected by international copyright laws.
          </p>

          <h2>Educational Institution Content</h2>

          <p>
            Information related to NIOS, IGNOU, and DU SOL courses, syllabi, and educational materials is provided for
            informational purposes only. The copyright for official course materials, syllabi, and related content
            belongs to the respective educational institutions (NIOS, IGNOU, and DU SOL).
          </p>

          <h2>Fair Use</h2>

          <p>
            We respect the fair use of copyrighted material for educational and informational purposes. Our use of
            third-party content is intended to fall within fair use provisions under applicable copyright laws.
          </p>

          <h2>User-Generated Content</h2>

          <p>
            By submitting content to our website (such as comments, forum posts, or blog contributions), you grant Open
            Distance Learning a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to
            use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display
            such content throughout the world in any media.
          </p>

          <p>
            You represent and warrant that you own or otherwise control all of the rights to the content that you post;
            that the content is accurate; that use of the content you supply does not violate this policy and will not
            cause injury to any person or entity; and that you will indemnify Open Distance Learning for all claims
            resulting from content you supply.
          </p>

          <h2>Copyright Infringement Claims</h2>

          <p>
            If you believe that your work has been copied in a way that constitutes copyright infringement, please
            provide our copyright agent with the following information:
          </p>

          <ul>
            <li>
              An electronic or physical signature of the person authorized to act on behalf of the owner of the
              copyright interest
            </li>
            <li>A description of the copyrighted work that you claim has been infringed</li>
            <li>A description of where the material that you claim is infringing is located on the site</li>
            <li>Your address, telephone number, and email address</li>
            <li>
              A statement by you that you have a good faith belief that the disputed use is not authorized by the
              copyright owner, its agent, or the law
            </li>
            <li>
              A statement by you, made under penalty of perjury, that the above information in your notice is accurate
              and that you are the copyright owner or authorized to act on the copyright owner's behalf
            </li>
          </ul>

          <p>
            Our copyright agent for notice of claims of copyright infringement can be reached at{" "}
            <a href="mailto:niosdiscussion@gmail.com">niosdiscussion@gmail.com</a>.
          </p>

          <h2>Changes to This Copyright Policy</h2>

          <p>
            We may update this Copyright Policy from time to time. We will notify you of any changes by posting the new
            Copyright Policy on this page and updating the "Last updated" date.
          </p>

          <h2>Contact Us</h2>

          <p>
            If you have any questions about this Copyright Policy, please contact us at{" "}
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
