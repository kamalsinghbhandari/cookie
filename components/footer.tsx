import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

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
              <Link href="#" className="text-slate-300 hover:text-white">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-slate-300 hover:text-white">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-slate-300 hover:text-white">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-slate-300 hover:text-white">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
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
              <li>
                <Link href="/store" className="hover:text-white hover:underline">
                  Store
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Resources</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="#" className="hover:text-white hover:underline">
                  Study Materials
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white hover:underline">
                  Previous Year Papers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white hover:underline">
                  Syllabus
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white hover:underline">
                  Results
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white hover:underline">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 shrink-0" />
                <span>Dwarka Mor, Delhi</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                <span>1800-180-9393</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                <a href="mailto:niosdiscussion@gmail.com" className="hover:text-white hover:underline">
                  niosdiscussion@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Open Distance Learning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
