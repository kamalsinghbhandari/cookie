import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">Open Distance Learning</h3>
            <p className="mb-4 text-slate-300">
              Providing flexible and accessible education for all through NIOS, IGNOU, and DU SOL.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com/opendistancelearning" className="text-slate-300 hover:text-white">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com/niosdiscussion" className="text-slate-300 hover:text-white">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://instagram.com/odlearning" className="text-slate-300 hover:text-white">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/" className="hover:text-white hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/nios/admission/announcements" className="hover:text-white hover:underline">
                  NIOS Admissions
                </Link>
              </li>
              <li>
                <Link href="/ignou/admission/announcements" className="hover:text-white hover:underline">
                  IGNOU Admissions
                </Link>
              </li>
              <li>
                <Link href="/dusol/admission/announcements" className="hover:text-white hover:underline">
                  DU SOL Admissions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white hover:underline">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Resources</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/nios/study-material" className="hover:text-white hover:underline">
                  NIOS Study Materials
                </Link>
              </li>
              <li>
                <Link href="/ignou/study-material" className="hover:text-white hover:underline">
                  IGNOU Study Materials
                </Link>
              </li>
              <li>
                <Link href="/dusol/study-material" className="hover:text-white hover:underline">
                  DU SOL Study Materials
                </Link>
              </li>
              <li>
                <Link href="/nios/previous-papers" className="hover:text-white hover:underline">
                  Previous Year Papers
                </Link>
              </li>
              <li>
                <Link href="/nios/syllabus" className="hover:text-white hover:underline">
                  Syllabus
                </Link>
              </li>
              <li>
                <Link href="/nios/results" className="hover:text-white hover:underline">
                  Results
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Connect With Us</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 shrink-0" />
                <span>Dwarka Mor, Delhi</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                <a href="mailto:niosdiscussion@gmail.com" className="hover:text-white hover:underline">
                  niosdiscussion@gmail.com
                </a>
              </li>
              <li>
                <Link href="https://t.me/opendistancelearning" className="hover:text-white hover:underline">
                  Telegram Channel
                </Link>
              </li>
              <li>
                <Link href="https://t.me/odldiscussion" className="hover:text-white hover:underline">
                  Telegram Group
                </Link>
              </li>
              <li>
                <Link href="https://t.me/opendistancelearningbot" className="hover:text-white hover:underline">
                  Telegram Bot
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>© 2025 Open Distance Learning. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4 text-xs">
            <Link href="/privacy-policy" className="hover:text-white hover:underline">
              Privacy Policy
            </Link>
            <Link href="/refund-policy" className="hover:text-white hover:underline">
              Refund Policy
            </Link>
            <Link href="/copyright-policy" className="hover:text-white hover:underline">
              Copyright Policy
            </Link>
            <Link href="/terms-of-use" className="hover:text-white hover:underline">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
