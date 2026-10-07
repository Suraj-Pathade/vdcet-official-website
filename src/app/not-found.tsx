import Link from 'next/link';
import { ArrowLeft, GraduationCap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/[0.08] shadow-apple-lg max-w-lg w-full space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mx-auto mb-2">
          <GraduationCap className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
            VDCET Mouda Portal
          </span>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Page Not Found</h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            The page you are looking for might have been moved or is unavailable. Please choose from the official sections below:
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-2">
          <Link
            href="/"
            className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
          >
            About VDCET
          </Link>
          <Link
            href="/academics"
            className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
          >
            Academics
          </Link>
          <Link
            href="/admissions"
            className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
          >
            Admissions
          </Link>
          <Link
            href="/campus"
            className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
          >
            Campus
          </Link>
          <Link
            href="/notices"
            className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
          >
            Notices
          </Link>
          <Link
            href="/contact"
            className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/ai-assistant"
            className="p-3 rounded-xl bg-black text-white hover:bg-neutral-800 transition-colors"
          >
            Ask VDCET AI
          </Link>
        </div>

        <div className="pt-4 border-t border-neutral-100">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to VDCET Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
