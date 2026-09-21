import React from 'react';
import Link from 'next/link';
import { contentRepo, noticeRepo } from '@/lib/repository';
import { CheckCircle2, FileText, ExternalLink, Calendar, HelpCircle } from 'lucide-react';

export const revalidate = 0;

export default function AdmissionsPage() {
  const dteCode = contentRepo.get('dte_code');
  const eligibility = contentRepo.get('admission_eligibility');
  const documentChecklist = contentRepo.get('document_checklist');
  const admissionNotices = noticeRepo
    .getPublished('Admission')
    .concat(noticeRepo.getPublished('All'))
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Title */}
      <div className="space-y-4 border-b border-black/[0.06] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-xs font-semibold text-neutral-800">
          <span>Maharashtra State CAP Allotment</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900">
          Admissions Guide
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
          First Year & Direct Second Year B.Tech Engineering admissions at VDCET Mouda (DTE Code: {dteCode}) are conducted in accordance with Maharashtra State Entrance Test Cell norms.
        </p>
      </div>

      {/* DTE Allotment Info Card */}
      <div className="bg-black text-white rounded-3xl p-8 sm:p-10 shadow-apple-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
            DTE Institute Code
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white">{dteCode}</h2>
          <p className="text-xs text-neutral-400 max-w-md">
            Use Institute Code <strong className="text-white">04141</strong> during Maharashtra State CET Cell Option Form filling for VDCET Mouda.
          </p>
        </div>
        <a
          href="https://cetcell.mahacet.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-black bg-white hover:bg-neutral-200 transition-colors shadow-sm"
        >
          <span>State CET Cell Portal</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Eligibility Criteria */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Eligibility Criteria</h2>
        <div className="bg-white rounded-2xl p-6 border border-black/[0.06] shadow-apple-sm text-neutral-700 text-sm leading-relaxed whitespace-pre-line">
          {eligibility}
        </div>
      </div>

      {/* Admission Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Admission Process Steps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-neutral-50 rounded-2xl p-6 border border-black/[0.06] space-y-2">
            <span className="text-xs font-mono font-bold text-neutral-400">STEP 01</span>
            <h3 className="font-bold text-base text-neutral-900">MHT-CET / JEE Score</h3>
            <p className="text-xs text-neutral-600">Appear for MHT-CET or JEE Main examination and obtain valid normalized percentile score.</p>
          </div>
          <div className="bg-neutral-50 rounded-2xl p-6 border border-black/[0.06] space-y-2">
            <span className="text-xs font-mono font-bold text-neutral-400">STEP 02</span>
            <h3 className="font-bold text-base text-neutral-900">CAP Option Form</h3>
            <p className="text-xs text-neutral-600">Register on State CET Portal and select VDCET Mouda (Code: 04141) in your choice list.</p>
          </div>
          <div className="bg-neutral-50 rounded-2xl p-6 border border-black/[0.06] space-y-2">
            <span className="text-xs font-mono font-bold text-neutral-400">STEP 03</span>
            <h3 className="font-bold text-base text-neutral-900">Document Verification</h3>
            <p className="text-xs text-neutral-600">Report to VDCET admission office with original documents for confirmation and seat allotment.</p>
          </div>
        </div>
      </div>

      {/* Required Documents */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Essential Documents Checklist</h2>
        <div className="bg-white rounded-2xl p-6 border border-black/[0.06] shadow-apple-sm text-neutral-800 text-sm leading-relaxed whitespace-pre-line">
          {documentChecklist}
        </div>
      </div>

      {/* Active Admission Notices */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Current Admission Notices</h2>
        {admissionNotices.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center border border-black/[0.06] text-neutral-500 text-sm">
            Information will be updated soon.
          </div>
        ) : (
          <div className="space-y-3">
            {admissionNotices.map((n) => (
              <div key={n.id} className="bg-white rounded-xl p-5 border border-black/[0.06] flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                    {n.category}
                  </span>
                  <h3 className="text-sm font-bold text-neutral-900">{n.title}</h3>
                  <p className="text-xs text-neutral-500">{n.date}</p>
                </div>
                <Link href="/notices" className="text-xs font-medium text-black hover:underline flex-shrink-0">
                  View Notice →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Help Trigger */}
      <div className="bg-neutral-100 rounded-2xl p-6 border border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-neutral-700" />
          <span className="text-xs sm:text-sm font-medium text-neutral-800">Have questions regarding admission rules or document verification?</span>
        </div>
        <Link href="/ai-assistant" className="px-4 py-2 rounded-full bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-colors">
          Ask VDCET AI
        </Link>
      </div>
    </div>
  );
}
