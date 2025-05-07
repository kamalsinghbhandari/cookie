import Link from "next/link"
import { Instagram, Twitter, Youtube, Send } from "lucide-react"
import NewsletterForm from "./newsletter-form"

export default function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-medium">ODL</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Open Distance Learning provides flexible education opportunities through NIOS, IGNOU, and DU SOL.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/open_distancelearning"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-nios-600"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-nios-600"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-nios-600"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/nios/admission/form" className="text-muted-foreground hover:text-nios-600">
                  NIOS Admission
                </Link>
              </li>
              <li>
                <Link href="/ignou/admission/form" className="text-muted-foreground hover:text-nios-600">
                  IGNOU Admission
                </Link>
              </li>
              <li>
                <Link href="/dusol/admission/form" className="text-muted-foreground hover:text-nios-600">
                  DU SOL Admission
                </Link>
              </li>
              <li>
                <Link href="/study-material" className="text-muted-foreground hover:text-nios-600">
                  Study Materials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-nios-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-nios-600">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Telegram</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://t.me/opendistancelearning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-nios-600"
                >
                  <Send className="mr-2 h-4 w-4" />
                  ODL Channel
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/odldiscussion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-nios-600"
                >
                  <Send className="mr-2 h-4 w-4" />
                  ODL Discussion
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/opendistancelearningbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-nios-600"
                >
                  <Send className="mr-2 h-4 w-4" />
                  @opendistancelearningbot
                </a>
              </li>
            </ul>

            <h3 className="mb-4 mt-6 text-lg font-medium">Contact</h3>
            <address className="not-italic text-sm text-muted-foreground">
              <p>Dwarka Mor, Delhi</p>
              <p>Email: niosdiscussion@gmail.com</p>
            </address>
          </div>

          <div>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <div className="mb-4 flex flex-wrap justify-center gap-4">
            <Link href="/terms-of-use" className="hover:text-nios-600">
              Terms of Use
            </Link>
            <Link href="/privacy-policy" className="hover:text-nios-600">
              Privacy Policy
            </Link>
            <Link href="/refund-policy" className="hover:text-nios-600">
              Refund Policy
            </Link>
            <Link href="/copyright-policy" className="hover:text-nios-600">
              Copyright Policy
            </Link>
          </div>
          <p>&copy; {new Date().getFullYear()} Open Distance Learning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
