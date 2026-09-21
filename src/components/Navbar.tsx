'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, GraduationCap } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Academics', href: '/academics' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Campus', href: '/campus' },
    { name: 'Notices', href: '/notices' },
    { name: 'Contact', href: '/contact' },
  ];

  const collegeLogoUrl = 'https://share.google/7oD4ZAFsRCT8u0HVG';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-header border-b border-black/[0.06] py-3 shadow-apple-sm'
          : 'bg-white/70 backdrop-blur-md border-b border-black/[0.04] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {!imgError ? (
              <img
                src={collegeLogoUrl}
                alt="VDCET Logo"
                onError={() => setImgError(true)}
                className="w-10 h-10 object-contain rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-200"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform duration-200">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-semibold text-base sm:text-lg tracking-tight text-neutral-900 group-hover:text-black leading-tight">
                VDCET
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-500 font-normal tracking-normal">
                Mouda, Nagpur
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-black bg-neutral-100 font-semibold'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* AI Assistant CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/ai-assistant"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white bg-black hover:bg-neutral-800 transition-all duration-200 shadow-sm hover:shadow-apple-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Ask VDCET AI</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/ai-assistant"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white bg-black"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>AI</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:text-black hover:bg-neutral-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-header border-b border-black/[0.08] px-4 pt-3 pb-6 mt-3 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-black text-white font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-black'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/ai-assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-base font-semibold text-white bg-black text-center"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ask VDCET AI</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
