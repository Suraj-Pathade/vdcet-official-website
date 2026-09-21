import React from 'react';
import { contentRepo } from '@/lib/repository';
import { CheckCircle2, Award, Landmark, MapPin } from 'lucide-react';

export const revalidate = 0;

export default function AboutPage() {
  const affiliationInfo = contentRepo.get('affiliation_info');
  const dteCode = contentRepo.get('dte_code');
  const address = contentRepo.get('address');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Title */}
      <div className="space-y-4 border-b border-black/[0.06] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-xs font-semibold text-neutral-800">
          <span>Institutional Profile</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900">
          About VDCET Mouda
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
          Vilasrao Deshmukh College of Engineering & Technology (VDCET), Mouda is committed to imparting quality technical education in engineering and technology.
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-black/[0.06] shadow-apple-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black mb-3">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-neutral-900">AICTE Approved</h3>
          <p className="text-xs text-neutral-600">Recognized by All India Council for Technical Education, New Delhi.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-black/[0.06] shadow-apple-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black mb-3">
            <Landmark className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-neutral-900">DTE Code {dteCode}</h3>
          <p className="text-xs text-neutral-600">Official Institute Code for Maharashtra State CAP Allotments.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-black/[0.06] shadow-apple-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black mb-3">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-neutral-900">Mouda, Nagpur</h3>
          <p className="text-xs text-neutral-600">Strategic campus location on Mumbai–Howrah National Highway, Bhandara Road.</p>
        </div>
      </div>

      {/* Affiliation & Approval Notice */}
      <div className="bg-neutral-50 rounded-2xl p-8 border border-black/[0.06] space-y-4">
        <h2 className="text-xl font-bold text-neutral-900">Institutional Affiliation & Recognition</h2>
        <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
          {affiliationInfo}
        </p>
      </div>

      {/* Core Objectives */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Core Objectives</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 bg-white p-5 rounded-xl border border-black/[0.06]">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-neutral-700 leading-relaxed">
              Deliver structured engineering curricula with emphasis on core analytical concepts and practical experimentation.
            </p>
          </div>
          <div className="flex items-start gap-3 bg-white p-5 rounded-xl border border-black/[0.06]">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-neutral-700 leading-relaxed">
              Provide modern laboratory facilities for Computer, AI & Data Science, Civil, and Mechanical disciplines.
            </p>
          </div>
        </div>
      </div>

      {/* Campus Location Summary */}
      <div className="pt-6 border-t border-black/[0.06] text-xs text-neutral-500 space-y-1">
        <p className="font-semibold text-neutral-800">Official Location</p>
        <p>{address}</p>
      </div>
    </div>
  );
}
