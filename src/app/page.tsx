import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Cpu,
  BrainCircuit,
  Building2,
  Wrench,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  FileText,
  Calendar,
} from 'lucide-react';
import { noticeRepo, contentRepo } from '@/lib/repository';

export const revalidate = 0; // Always fresh data

export default function HomePage() {
  const notices = noticeRepo.getPublished().slice(0, 3);
  const address = contentRepo.get('address');
  const phone = contentRepo.get('phone');
  const email = contentRepo.get('email');

  const campusFrontLookUrl = 'https://share.google/Ic6NQwQOJ5crY5Qm7';

  const programs = [
    {
      title: 'Computer Engineering',
      desc: 'Software development, computing fundamentals, modern web architectures, and algorithms.',
      icon: Cpu,
      code: 'CSE',
    },
    {
      title: 'Artificial Intelligence & Data Science',
      desc: 'Machine learning, predictive analytics, deep neural networks, and modern data engineering.',
      icon: BrainCircuit,
      code: 'AIDS',
    },
    {
      title: 'Civil Engineering',
      desc: 'Structural design, surveying, sustainable infrastructure engineering, and material science.',
      icon: Building2,
      code: 'CIVIL',
    },
    {
      title: 'Mechanical Engineering',
      desc: 'Thermodynamics, CAD modeling, industrial manufacturing, and mechatronic systems.',
      icon: Wrench,
      code: 'MECH',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-black/[0.06] text-xs font-semibold text-neutral-800 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>DTE Institute Code: 04141</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.15] max-w-4xl mx-auto">
          Vilasrao Deshmukh College of Engineering & Technology
        </h1>

        <p className="text-lg sm:text-2xl text-neutral-500 font-medium mt-4 tracking-tight">
          Mouda, Maharashtra
        </p>

        <p className="text-base sm:text-xl text-neutral-600 font-normal max-w-2xl mx-auto mt-4 leading-relaxed">
          A modern engineering education experience.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            href="/academics"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-black hover:bg-neutral-800 transition-all duration-200 shadow-apple-md"
          >
            <span>Explore VDCET</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/ai-assistant"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 border border-black/[0.08] transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Ask VDCET AI</span>
          </Link>
        </div>

        {/* Clean Campus Photography Banner */}
        <div className="mt-12 sm:mt-16 rounded-3xl overflow-hidden border border-black/[0.08] bg-neutral-950 text-left relative shadow-apple-lg min-h-[300px] flex items-end">
          <img
            src={campusFrontLookUrl}
            alt="VDCET Campus Building Front Look"
            className="absolute inset-0 w-full h-full object-cover opacity-40 hover:opacity-50 transition-opacity duration-500"
          />
          <div className="max-w-2xl relative z-10 p-8 sm:p-12 space-y-3 bg-gradient-to-t from-black via-black/80 to-transparent w-full">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
              Empowering Future Engineers
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              VDCET Campus, Mouda, Nagpur
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Equipping students with analytical foundations, practical laboratory experience, and industry-aligned computing skills.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PROGRAMS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Academic Programs
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base max-w-xl mx-auto">
            Four specialized B.Tech engineering branches approved by DTE Maharashtra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((prog) => {
            const IconComp = prog.icon;
            return (
              <div
                key={prog.title}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.06] shadow-apple-sm hover:shadow-apple-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-black">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-600">
                      {prog.code}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
                    {prog.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {prog.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-500">Degree: B.Tech (4 Years)</span>
                  <Link
                    href="/academics"
                    className="text-xs font-semibold text-black hover:text-neutral-600 inline-flex items-center gap-1"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-50 rounded-3xl p-8 sm:p-12 border border-black/[0.06] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Institutional Profile
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              About VDCET
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Vilasrao Deshmukh College of Engineering & Technology (VDCET) is situated along the Mumbai–Howrah National Highway in Mouda, Bhandara Road, District Nagpur. Approved by AICTE, New Delhi and DTE Maharashtra (Code 04141).
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs font-medium text-neutral-700 bg-white px-3 py-1.5 rounded-lg border border-black/[0.06]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>AICTE Approved</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-neutral-700 bg-white px-3 py-1.5 rounded-lg border border-black/[0.06]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>DTE Code: 04141</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 flex justify-center">
            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black bg-white border border-black/[0.1] hover:bg-neutral-100 transition-colors shadow-apple-sm"
            >
              <span>Read Full History & Vision</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. LATEST NOTICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Latest Notices
            </h2>
            <p className="text-neutral-500 text-sm mt-1">
              Official announcements and circulars for visitors & candidates.
            </p>
          </div>
          <Link
            href="/notices"
            className="text-xs font-semibold text-black hover:text-neutral-600 inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Notices</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {notices.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-black/[0.06] text-neutral-500 text-sm">
            <FileText className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
            <p>Information will be updated soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notices.map((n) => (
              <div
                key={n.id}
                className="bg-white rounded-2xl p-6 border border-black/[0.06] shadow-apple-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                      {n.category}
                    </span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {n.date}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 line-clamp-2">
                    {n.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {n.content}
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-100">
                  <Link
                    href="/notices"
                    className="text-xs font-medium text-black hover:underline"
                  >
                    Read Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. CAMPUS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Campus & Infrastructure
          </h2>
          <p className="text-neutral-500 text-sm max-w-xl mx-auto">
            Clean computer engineering laboratories, workshop environments, and learning spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-neutral-100 rounded-2xl p-6 border border-black/[0.06] space-y-2">
            <h3 className="font-bold text-base text-neutral-900">Computing Labs</h3>
            <p className="text-xs text-neutral-600">High-speed networked computer labs equipped for programming and data science exercises.</p>
          </div>
          <div className="bg-neutral-100 rounded-2xl p-6 border border-black/[0.06] space-y-2">
            <h3 className="font-bold text-base text-neutral-900">Engineering Workshops</h3>
            <p className="text-xs text-neutral-600">Dedicated facilities for civil surveying and mechanical practical workshops.</p>
          </div>
          <div className="bg-neutral-100 rounded-2xl p-6 border border-black/[0.06] space-y-2">
            <h3 className="font-bold text-base text-neutral-900">Central Library</h3>
            <p className="text-xs text-neutral-600">Reference books, technical journals, and quiet reading spaces for students.</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/campus"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-black hover:underline"
          >
            <span>Explore Campus Facilities & Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 6. AI ASSISTANT TEASER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-apple-lg">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-medium backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Knowledge Base AI</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Ask VDCET AI Assistant
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Get instant answers about courses, admissions, eligibility criteria, and campus location. AI answers are grounded in the available official VDCET knowledge base.
            </p>
            <div className="pt-4">
              <Link
                href="/ai-assistant"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black bg-white hover:bg-neutral-200 transition-colors shadow-sm"
              >
                <span>Launch Assistant</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT SUMMARY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.06] shadow-apple-sm grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-neutral-900">Campus Address</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">{address}</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black mb-3">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-neutral-900">Phone Contact</h3>
            <p className="text-xs text-neutral-600">{phone}</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-neutral-900">Official Email</h3>
            <p className="text-xs text-neutral-600">{email}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
