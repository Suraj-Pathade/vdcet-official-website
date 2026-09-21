import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/[0.06] text-neutral-800 text-sm py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Institutional Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-black tracking-tight">VDCET</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-medium">
                DTE Code: 04141
              </span>
            </div>
            <p className="text-sm font-medium text-neutral-900 leading-snug">
              Vilasrao Deshmukh College of Engineering & Technology
            </p>
            <p className="text-xs text-neutral-500 max-w-md leading-relaxed">
              Sr. No. 121, 262, Mouza Mouda, Bhandara Road, Taluka Mouda, District Nagpur, Maharashtra - 441104.
            </p>
            <p className="text-xs text-neutral-400">
              AICTE Approved | DTE Maharashtra Recognized
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-black uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="text-neutral-600 hover:text-black transition-colors">
                  About VDCET
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-neutral-600 hover:text-black transition-colors">
                  Academic Programs
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-neutral-600 hover:text-black transition-colors">
                  Admissions CAP
                </Link>
              </li>
              <li>
                <Link href="/campus" className="text-neutral-600 hover:text-black transition-colors">
                  Campus Facilities
                </Link>
              </li>
              <li>
                <Link href="/notices" className="text-neutral-600 hover:text-black transition-colors">
                  Notice Board
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Assistance & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-black uppercase tracking-wider">Assistance</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/ai-assistant" className="text-neutral-600 hover:text-black transition-colors font-medium">
                  Ask VDCET AI
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-600 hover:text-black transition-colors">
                  Contact Office
                </Link>
              </li>
              <li>
                <a
                  href="https://cetcell.mahacet.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-black transition-colors"
                >
                  State CET Cell Maharashtra ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-black/[0.04] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>© {new Date().getFullYear()} Vilasrao Deshmukh College of Engineering & Technology, Mouda. All rights reserved.</p>
          <p className="text-neutral-400 text-[11px]">Made by Developer Suraj</p>
        </div>
      </div>
    </footer>
  );
}
