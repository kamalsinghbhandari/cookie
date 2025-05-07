import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <h1 className="mb-4 text-6xl font-bold text-nios-600">404</h1>
      <h2 className="mb-6 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div className="mb-12 flex flex-wrap justify-center gap-4">
        <Link href="/">
          <Button className="bg-nios-600 hover:bg-nios-700">Return to Home</Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline">Contact Support</Button>
        </Link>
      </div>

      <div className="w-full max-w-2xl rounded-lg border p-6">
        <h3 className="mb-4 text-xl font-medium">Popular Pages</h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Link href="/nios/admission/form" className="rounded-md border p-3 text-sm hover:bg-slate-50">
            NIOS Admission
          </Link>
          <Link href="/ignou/admission/form" className="rounded-md border p-3 text-sm hover:bg-slate-50">
            IGNOU Admission
          </Link>
          <Link href="/dusol/admission/form" className="rounded-md border p-3 text-sm hover:bg-slate-50">
            DU SOL Admission
          </Link>
          <Link href="/study-material" className="rounded-md border p-3 text-sm hover:bg-slate-50">
            Study Materials
          </Link>
          <Link href="/blog" className="rounded-md border p-3 text-sm hover:bg-slate-50">
            Blog
          </Link>
          <Link href="/faqs" className="rounded-md border p-3 text-sm hover:bg-slate-50">
            FAQs
          </Link>
        </div>
      </div>
    </div>
  )
}
